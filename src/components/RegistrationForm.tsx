import { useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertTriangle, Check, Copy, Loader2, MessageCircle, RotateCcw } from 'lucide-react';
import { Button, ButtonAnchor } from './ui/Button';
import { SITE, formatVND, levelFromGrade, priceForLevel, type SchoolLevel } from '../config/site';
import { SUBJECT_OPTIONS, subjectLabel } from '../data/subjects';
import { TIME_SLOTS } from '../data/faq';
import { isValidPhone, normalizePhone, formatPhoneDisplay } from '../lib/phone';
import { createRegistration, MODE_LABELS, TYPE_LABELS, type LearningMode, type RegistrationType } from '../lib/registrations';
import { isSupabaseReady } from '../lib/supabase';
import { cn } from '../lib/cn';

export interface RegistrationDefaults {
  subjects?: string[];
  level?: 1 | 2;
  grade?: number;
}

interface Values {
  parentName: string;
  phone: string;
  studentName: string;
  grade: string;
  school: string;
  subjects: string[];
  mode: LearningMode | '';
  date: string;
  time: string;
  note: string;
  website: string;
}

type Field = Exclude<keyof Values, 'website'>;
type Errors = Partial<Record<Field, string>>;

const FIELD_ORDER: Field[] = ['parentName', 'phone', 'studentName', 'grade', 'subjects', 'date', 'note'];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const formatDateVN = (iso: string) => {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function RegistrationForm({
  type,
  defaults,
  title,
  description,
}: {
  type: RegistrationType;
  defaults?: RegistrationDefaults;
  title?: string;
  description?: string;
}) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const isConsult = type === 'tu_van';
  const needsSchedule = type !== 'tu_van';

  const initialValues = (): Values => ({
    parentName: '',
    phone: '',
    studentName: '',
    grade: defaults?.grade ? String(defaults.grade) : '',
    school: '',
    subjects: defaults?.subjects ?? [],
    mode: '',
    date: '',
    time: '',
    note: '',
    website: '',
  });

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState<{ name: string; phone: string } | null>(null);

  const minDate = useMemo(todayISO, []);

  const level: SchoolLevel | null = values.grade
    ? levelFromGrade(Number(values.grade))
    : defaults?.level
      ? defaults.level === 1
        ? 'tieu_hoc'
        : 'thcs'
      : null;
  const pricing = level ? priceForLevel(level) : null;

  const validateField = (field: Field, v: Values = values): string | undefined => {
    switch (field) {
      case 'parentName': {
        const n = v.parentName.trim();
        if (!n) return 'Vui lòng nhập họ tên phụ huynh';
        if (n.length < 2 || n.length > 80) return 'Họ tên cần từ 2 đến 80 ký tự';
        return;
      }
      case 'phone':
        if (!v.phone.trim()) return 'Vui lòng nhập số điện thoại / Zalo';
        if (!isValidPhone(v.phone)) return 'Số điện thoại chưa đúng (VD: 0911 558 819)';
        return;
      case 'studentName':
        if (isConsult) return;
        if (!v.studentName.trim()) return 'Vui lòng nhập họ tên học sinh';
        if (v.studentName.trim().length > 80) return 'Họ tên tối đa 80 ký tự';
        return;
      case 'grade':
        if (isConsult) return;
        if (!v.grade) return 'Vui lòng chọn lớp';
        return;
      case 'subjects':
        if (v.subjects.length === 0) return 'Vui lòng chọn ít nhất 1 môn';
        return;
      case 'date':
        if (needsSchedule && v.date && v.date < minDate) return 'Không chọn ngày trong quá khứ';
        return;
      case 'note':
        if (v.note.length > 500) return 'Ghi chú tối đa 500 ký tự';
        return;
      case 'school':
        if (v.school.length > 120) return 'Tên trường tối đa 120 ký tự';
        return;
      default:
        return;
    }
  };

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (field !== 'website' && errors[field as Field]) {
      setErrors((e) => ({ ...e, [field]: validateField(field as Field, next) }));
    }
  };

  const onBlur = (field: Field) => setErrors((e) => ({ ...e, [field]: validateField(field) }));

  const toggleSubject = (slug: string) => {
    const next = values.subjects.includes(slug)
      ? values.subjects.filter((s) => s !== slug)
      : [...values.subjects, slug];
    update('subjects', next);
    setErrors((e) => ({ ...e, subjects: next.length ? undefined : e.subjects }));
  };

  const summaryText = () => {
    const lines = [
      `Đăng ký ${TYPE_LABELS[type]} – ${SITE.name}`,
      `Phụ huynh: ${values.parentName.trim()}`,
      `SĐT/Zalo: ${values.phone.trim()}`,
    ];
    if (values.studentName.trim()) lines.push(`Học sinh: ${values.studentName.trim()}`);
    if (values.grade) lines.push(`Lớp: ${values.grade}`);
    if (values.school.trim()) lines.push(`Trường: ${values.school.trim()}`);
    if (values.subjects.length) lines.push(`Môn: ${values.subjects.map(subjectLabel).join(', ')}`);
    if (values.mode) lines.push(`Hình thức: ${MODE_LABELS[values.mode]}`);
    if (values.date) lines.push(`Ngày mong muốn: ${formatDateVN(values.date)}`);
    if (values.time) lines.push(`Khung giờ: ${values.time}`);
    if (values.note.trim()) lines.push(`Ghi chú: ${values.note.trim()}`);
    return lines.join('\n');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const nextErrors: Errors = {};
    for (const f of [...FIELD_ORDER, 'school' as Field]) {
      const err = validateField(f);
      if (err) nextErrors[f] = err;
    }
    setErrors(nextErrors);
    const firstError = FIELD_ORDER.find((f) => nextErrors[f]) ?? (nextErrors.school ? 'school' : undefined);
    if (firstError) {
      const el =
        formRef.current?.querySelector<HTMLElement>(`[data-field="${firstError}"]`) ??
        document.getElementById(id(firstError));
      el?.focus();
      return;
    }

    if (values.website) {
      setSubmitted({ name: values.parentName.trim(), phone: normalizePhone(values.phone) });
      setStatus('success');
      return;
    }

    submittingRef.current = true;
    setStatus('submitting');
    setCopied(false);
    try {
      if (!isSupabaseReady) throw new Error('Supabase chưa được cấu hình');
      const grade = values.grade ? Number(values.grade) : null;
      await createRegistration({
        type,
        parent_name: values.parentName.trim(),
        phone: normalizePhone(values.phone),
        student_name: values.studentName.trim() || null,
        grade,
        school_level: grade ? levelFromGrade(grade) : null,
        school: values.school.trim() || null,
        subjects: values.subjects,
        learning_mode: values.mode || null,
        preferred_date: needsSchedule && values.date ? values.date : null,
        preferred_time: needsSchedule && values.time ? values.time : null,
        note: values.note.trim() || null,
      });
      setSubmitted({ name: values.parentName.trim(), phone: normalizePhone(values.phone) });
      setStatus('success');
    } catch (err) {
      console.warn('[The Learning Lab] Gửi đăng ký thất bại:', err);
      setStatus('error');
    } finally {
      submittingRef.current = false;
    }
  };

  const reset = () => {
    setValues(initialValues());
    setErrors({});
    setSubmitted(null);
    setStatus('idle');
  };

  if (status === 'success' && submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-fade-up rounded-2xl border border-green-200 bg-white p-6 text-center shadow-soft sm:p-10"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50 text-success">
          <Check className="size-8" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-ink">🎉 Đăng ký thành công!</h3>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted">
          Cảm ơn anh/chị <strong className="text-ink">{submitted.name}</strong>. {SITE.name} sẽ liên hệ qua Zalo/SĐT{' '}
          <strong className="text-ink">{formatPhoneDisplay(submitted.phone)}</strong> trong vòng 24 giờ để xác nhận
          lịch.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonAnchor href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" aria-hidden="true" />
            Nhắn Zalo ngay
          </ButtonAnchor>
          <Button variant="secondary" onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Gửi đăng ký khác
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';
  const gradeOptions = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-8"
      aria-describedby={title ? id('desc') : undefined}
    >
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-ink">{title}</h2>
          {description && (
            <p id={id('desc')} className="mt-2 text-muted">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Họ tên phụ huynh" required htmlFor={id('parentName')} error={errors.parentName} errorId={id('parentName-err')}>
          <input
            id={id('parentName')}
            name="parentName"
            autoComplete="name"
            className={cn('input', errors.parentName && 'input-error')}
            value={values.parentName}
            onChange={(e) => update('parentName', e.target.value)}
            onBlur={() => onBlur('parentName')}
            aria-invalid={!!errors.parentName}
            aria-describedby={errors.parentName ? id('parentName-err') : undefined}
            maxLength={80}
            placeholder="VD: Nguyễn Thu Hà"
          />
        </FormField>

        <FormField label="Số điện thoại / Zalo" required htmlFor={id('phone')} error={errors.phone} errorId={id('phone-err')}>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={cn('input', errors.phone && 'input-error')}
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            onBlur={() => onBlur('phone')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? id('phone-err') : undefined}
            maxLength={20}
            placeholder="VD: 0911 558 819"
          />
        </FormField>

        {!isConsult && (
          <FormField label="Họ tên học sinh" required htmlFor={id('studentName')} error={errors.studentName} errorId={id('studentName-err')}>
            <input
              id={id('studentName')}
              name="studentName"
              className={cn('input', errors.studentName && 'input-error')}
              value={values.studentName}
              onChange={(e) => update('studentName', e.target.value)}
              onBlur={() => onBlur('studentName')}
              aria-invalid={!!errors.studentName}
              aria-describedby={errors.studentName ? id('studentName-err') : undefined}
              maxLength={80}
              placeholder="VD: Trần Minh Anh"
            />
          </FormField>
        )}

        <FormField
          label="Lớp"
          required={!isConsult}
          htmlFor={id('grade')}
          error={errors.grade}
          errorId={id('grade-err')}
          hint={
            pricing ? (
              <span className="font-semibold text-brand-700">
                Học phí dự kiến: {formatVND(pricing.price)}/{pricing.unit}
              </span>
            ) : undefined
          }
          hintId={id('grade-hint')}
        >
          <select
            id={id('grade')}
            name="grade"
            className={cn('input appearance-none bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10', errors.grade && 'input-error')}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A1C2E' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            value={values.grade}
            onChange={(e) => update('grade', e.target.value)}
            onBlur={() => onBlur('grade')}
            aria-invalid={!!errors.grade}
            aria-describedby={cn(errors.grade && id('grade-err'), pricing && id('grade-hint')) || undefined}
          >
            <option value="">— Chọn lớp —</option>
            <optgroup label="Tiểu học (Cấp 1)">
              {gradeOptions.slice(0, 5).map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </optgroup>
            <optgroup label="THCS (Cấp 2)">
              {gradeOptions.slice(5).map((g) => (
                <option key={g} value={g}>
                  Lớp {g}
                </option>
              ))}
            </optgroup>
          </select>
        </FormField>

        {!isConsult && (
          <FormField label="Trường đang học" htmlFor={id('school')} error={errors.school} errorId={id('school-err')} className="sm:col-span-2">
            <div className="flex gap-2">
              <input
                id={id('school')}
                name="school"
                className={cn('input', errors.school && 'input-error')}
                value={values.school}
                onChange={(e) => update('school', e.target.value)}
                onBlur={() => onBlur('school')}
                maxLength={120}
                placeholder="VD: Vinschool Times City"
              />
              <button
                type="button"
                onClick={() => update('school', 'Vinschool')}
                className="shrink-0 rounded-xl border border-line bg-alt px-4 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                Vinschool
              </button>
            </div>
          </FormField>
        )}

        <fieldset className="sm:col-span-2" aria-describedby={errors.subjects ? id('subjects-err') : undefined}>
          <legend className="mb-2 text-sm font-semibold text-ink">
            Môn quan tâm <span className="text-danger" aria-hidden="true">*</span>
            <span className="sr-only">(bắt buộc)</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {SUBJECT_OPTIONS.map((s, i) => {
              const checked = values.subjects.includes(s.value);
              return (
                <label
                  key={s.value}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500',
                    checked ? 'border-brand-700 bg-brand-50 text-brand-800' : 'border-line text-ink hover:border-brand-200',
                    errors.subjects && !checked && 'border-danger/60',
                  )}
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-brand-700"
                    checked={checked}
                    onChange={() => toggleSubject(s.value)}
                    data-field={i === 0 ? 'subjects' : undefined}
                    aria-invalid={!!errors.subjects}
                  />
                  {s.label}
                </label>
              );
            })}
          </div>
          {errors.subjects && <ErrorText id={id('subjects-err')}>{errors.subjects}</ErrorText>}
        </fieldset>

        {!isConsult && (
          <fieldset className="sm:col-span-2">
            <legend className="mb-2 text-sm font-semibold text-ink">Hình thức</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(MODE_LABELS) as LearningMode[]).map((m) => (
                <label
                  key={m}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500',
                    values.mode === m ? 'border-brand-700 bg-brand-50 text-brand-800' : 'border-line text-ink hover:border-brand-200',
                  )}
                >
                  <input
                    type="radio"
                    name={id('mode')}
                    className="size-4 accent-brand-700"
                    checked={values.mode === m}
                    onChange={() => update('mode', m)}
                  />
                  {MODE_LABELS[m]}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {needsSchedule && (
          <>
            <FormField label="Ngày mong muốn" htmlFor={id('date')} error={errors.date} errorId={id('date-err')}>
              <input
                id={id('date')}
                name="date"
                type="date"
                min={minDate}
                className={cn('input', errors.date && 'input-error')}
                value={values.date}
                onChange={(e) => update('date', e.target.value)}
                onBlur={() => onBlur('date')}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? id('date-err') : undefined}
              />
            </FormField>
            <FormField label="Khung giờ" htmlFor={id('time')}>
              <select
                id={id('time')}
                name="time"
                className="input"
                value={values.time}
                onChange={(e) => update('time', e.target.value)}
              >
                <option value="">— Chọn khung giờ —</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FormField>
          </>
        )}

        <FormField
          label={isConsult ? 'Câu hỏi của anh/chị' : 'Ghi chú'}
          htmlFor={id('note')}
          error={errors.note}
          errorId={id('note-err')}
          className="sm:col-span-2"
          hint={<span>{values.note.length}/500</span>}
          hintId={id('note-hint')}
        >
          <textarea
            id={id('note')}
            name="note"
            rows={4}
            className={cn('input resize-y', errors.note && 'input-error')}
            value={values.note}
            onChange={(e) => update('note', e.target.value.slice(0, 500))}
            onBlur={() => onBlur('note')}
            maxLength={500}
            aria-invalid={!!errors.note}
            aria-describedby={cn(id('note-hint'), errors.note && id('note-err'))}
            placeholder={isConsult ? 'VD: Con lớp 3 đang yếu môn Toán, nên học mấy buổi/tuần?' : 'VD: Con cần củng cố phần phân số…'}
          />
        </FormField>

        <div className="hidden" aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input
            id={id('website')}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update('website', e.target.value)}
          />
        </div>
      </div>

      <div aria-live="assertive">
        {status === 'error' && (
          <div role="alert" className="animate-fade-up mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-semibold text-danger">
                  Hệ thống đang bận, anh/chị vui lòng nhắn Zalo {SITE.zaloDisplay} để được hỗ trợ ngay.
                </p>
                <p className="mt-1 text-sm text-muted">
                  Thông tin anh/chị đã nhập vẫn được giữ nguyên. Có thể sao chép và dán vào Zalo.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <ButtonAnchor href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" size="sm">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Nhắn Zalo {SITE.zaloDisplay}
                  </ButtonAnchor>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={async () => setCopied(await copyText(summaryText()))}
                  >
                    {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                    {copied ? 'Đã sao chép' : 'Sao chép thông tin'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="text-danger">*</span> Thông tin bắt buộc. Trung tâm cam kết bảo mật thông tin.
        </p>
        <Button type="submit" size="lg" disabled={submitting} aria-busy={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Đang gửi...
            </>
          ) : status === 'error' ? (
            'Thử gửi lại'
          ) : (
            'Gửi đăng ký'
          )}
        </Button>
      </div>
    </form>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-danger">
      {children}
    </p>
  );
}

function FormField({
  label,
  required,
  htmlFor,
  error,
  errorId,
  hint,
  hintId,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  error?: string;
  errorId?: string;
  hint?: ReactNode;
  hintId?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required && (
          <>
            {' '}
            <span className="text-danger" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(bắt buộc)</span>
          </>
        )}
      </label>
      {children}
      {error && errorId ? <ErrorText id={errorId}>{error}</ErrorText> : null}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
