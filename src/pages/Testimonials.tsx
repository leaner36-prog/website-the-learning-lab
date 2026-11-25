import { useMemo, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { TestimonialCard } from '../components/TestimonialCard';
import { CtaBanner } from '../components/CtaBanner';
import { TESTIMONIALS } from '../data/testimonials';
import { SUBJECTS, type SubjectSlug } from '../data/subjects';
import { cn } from '../lib/cn';

type LevelFilter = 'all' | '1' | '2';

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-muted">{label}:</span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
            value === o.value
              ? 'border-brand-700 bg-brand-700 text-white'
              : 'border-line bg-white text-ink hover:border-brand-200 hover:text-brand-700',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function Testimonials() {
  usePageMeta('Cảm nhận học sinh & phụ huynh', 'Cảm nhận của phụ huynh và học sinh về các khóa học tại The Learning Lab.');
  const [subject, setSubject] = useState<SubjectSlug | 'all'>('all');
  const [level, setLevel] = useState<LevelFilter>('all');

  const list = useMemo(
    () =>
      TESTIMONIALS.filter(
        (t) =>
          (subject === 'all' || t.subject === subject) &&
          (level === 'all' || (level === '1' ? t.grade <= 5 : t.grade >= 6)),
      ),
    [subject, level],
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Cảm nhận' }]}
        eyebrow="Cảm nhận"
        title="Phụ huynh & học sinh nói gì"
        description="Những chia sẻ từ các gia đình đã đồng hành cùng The Learning Lab."
      />
      <section className="section bg-alt">
        <div className="container-page">
          <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between">
            <FilterGroup
              label="Môn"
              value={subject}
              onChange={setSubject}
              options={[
                { value: 'all', label: 'Tất cả' },
                ...SUBJECTS.map((s) => ({ value: s.slug, label: s.shortName })),
              ]}
            />
            <FilterGroup<LevelFilter>
              label="Cấp"
              value={level}
              onChange={setLevel}
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: '1', label: 'Cấp 1' },
                { value: '2', label: 'Cấp 2' },
              ]}
            />
          </div>

          <p className="mt-6 text-sm text-muted" aria-live="polite">
            Hiển thị {list.length} cảm nhận
          </p>

          {list.length > 0 ? (
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {list.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">
              Chưa có cảm nhận phù hợp với bộ lọc này.
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
