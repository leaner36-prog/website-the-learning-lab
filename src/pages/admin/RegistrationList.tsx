import { MessageCircle, Phone } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { STATUS_LABELS, TYPE_LABELS, type Registration } from '../../lib/registrations';
import { subjectLabel } from '../../data/subjects';
import { formatPhoneDisplay, zaloLink } from '../../lib/phone';
import { formatDate, formatDateTime, STATUS_TONES, TYPE_TONES } from './format';

function ContactButtons({ phone }: { phone: string }) {
  return (
    <div className="flex gap-1.5">
      <a
        href={`tel:${phone}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-xs font-semibold text-ink hover:border-brand-200 hover:text-brand-700"
        aria-label={`Gọi ${phone}`}
      >
        <Phone className="size-3.5" aria-hidden="true" /> Gọi
      </a>
      <a
        href={zaloLink(phone)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1 text-xs font-semibold text-ink hover:border-brand-200 hover:text-brand-700"
        aria-label={`Nhắn Zalo ${phone}`}
      >
        <MessageCircle className="size-3.5" aria-hidden="true" /> Zalo
      </a>
    </div>
  );
}

const schedule = (r: Registration) => [formatDate(r.preferred_date), r.preferred_time].filter(Boolean).join(' · ') || '—';

export function RegistrationList({ rows, onOpen }: { rows: Registration[]; onOpen: (r: Registration) => void }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white shadow-soft lg:block">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <caption className="sr-only">Danh sách đăng ký</caption>
          <thead className="border-b border-line bg-alt text-xs font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" className="px-4 py-3">Thời gian</th>
              <th scope="col" className="px-4 py-3">Loại</th>
              <th scope="col" className="px-4 py-3">Phụ huynh</th>
              <th scope="col" className="px-4 py-3">Học sinh</th>
              <th scope="col" className="px-4 py-3">Lớp</th>
              <th scope="col" className="px-4 py-3">Môn</th>
              <th scope="col" className="px-4 py-3">Lịch mong muốn</th>
              <th scope="col" className="px-4 py-3">Trạng thái</th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Thao tác</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.id} onClick={() => onOpen(r)} className="cursor-pointer align-top transition-colors hover:bg-brand-50/50">
                <td className="whitespace-nowrap px-4 py-3 text-muted">{formatDateTime(r.created_at)}</td>
                <td className="px-4 py-3">
                  <Badge tone={TYPE_TONES[r.type]}>{TYPE_LABELS[r.type]}</Badge>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{r.parent_name}</p>
                  <p className="mt-0.5 text-muted">{formatPhoneDisplay(r.phone)}</p>
                  <div className="mt-1.5">
                    <ContactButtons phone={r.phone} />
                  </div>
                </td>
                <td className="px-4 py-3 text-ink">{r.student_name || '—'}</td>
                <td className="px-4 py-3 text-ink">{r.grade ?? '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex max-w-[180px] flex-wrap gap-1">
                    {r.subjects.map((s) => (
                      <Badge key={s} tone="neutral">
                        {subjectLabel(s)}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{schedule(r)}</td>
                <td className="px-4 py-3">
                  <Badge tone={STATUS_TONES[r.status]}>{STATUS_LABELS[r.status]}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(r);
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 lg:hidden">
        {rows.map((r) => (
          <li key={r.id}>
            <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <Badge tone={TYPE_TONES[r.type]}>{TYPE_LABELS[r.type]}</Badge>
                  <Badge tone={STATUS_TONES[r.status]}>{STATUS_LABELS[r.status]}</Badge>
                </div>
                <span className="shrink-0 text-xs text-muted">{formatDateTime(r.created_at)}</span>
              </div>
              <button type="button" onClick={() => onOpen(r)} className="mt-3 block w-full text-left">
                <p className="font-bold text-ink">{r.parent_name}</p>
                <p className="text-sm text-muted">
                  {formatPhoneDisplay(r.phone)}
                  {r.student_name && ` · HS: ${r.student_name}`}
                  {r.grade && ` · Lớp ${r.grade}`}
                </p>
                {r.subjects.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.subjects.map((s) => (
                      <Badge key={s} tone="neutral">
                        {subjectLabel(s)}
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-sm text-muted">Lịch: {schedule(r)}</p>
              </button>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <ContactButtons phone={r.phone} />
                <button type="button" onClick={() => onOpen(r)} className="text-sm font-semibold text-brand-700">
                  Chi tiết
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-line bg-white p-4 shadow-soft" role="status" aria-label="Đang tải">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-5 w-20 rounded-full" />
          <div className="skeleton h-4 flex-1" />
          <div className="skeleton hidden h-4 w-32 sm:block" />
        </div>
      ))}
    </div>
  );
}
