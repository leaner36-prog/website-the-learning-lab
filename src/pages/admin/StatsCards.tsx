import { CalendarCheck, CalendarPlus, GraduationCap, Inbox, Sparkles } from 'lucide-react';
import type { RegistrationStats } from '../../lib/registrations';

export function StatsCards({ stats }: { stats?: RegistrationStats }) {
  const items = [
    { label: 'Tổng', value: stats?.total, icon: Inbox },
    { label: 'Mới', value: stats?.moi, icon: Sparkles, highlight: true },
    { label: 'Đã xếp lịch', value: stats?.daXepLich, icon: CalendarCheck },
    { label: 'Đã nhập học', value: stats?.daNhapHoc, icon: GraduationCap },
    { label: 'Đăng ký hôm nay', value: stats?.today, icon: CalendarPlus },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map(({ label, value, icon: Icon, highlight }) => (
        <div
          key={label}
          className={
            highlight
              ? 'rounded-2xl bg-brand-700 p-4 text-white shadow-soft sm:p-5'
              : 'rounded-2xl border border-line bg-white p-4 shadow-soft sm:p-5'
          }
        >
          <dt className={`flex items-center gap-2 text-sm font-medium ${highlight ? 'text-brand-100' : 'text-muted'}`}>
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </dt>
          <dd className="mt-2 text-3xl font-extrabold tracking-tight">
            {value === undefined ? <span className="skeleton inline-block h-8 w-12 align-middle" /> : value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
