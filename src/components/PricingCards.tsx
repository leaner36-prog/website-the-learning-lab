import { Check } from 'lucide-react';
import { SITE, formatVND } from '../config/site';
import { ButtonLink } from './ui/Button';
import { Badge } from './ui/Badge';
import { cn } from '../lib/cn';

export function PricingCards({ detailed = false }: { detailed?: boolean }) {
  const plans = [
    { key: 'tieuHoc' as const, cap: 1, plan: SITE.pricing.tieuHoc, highlight: false },
    { key: 'thcs' as const, cap: 2, plan: SITE.pricing.thcs, highlight: true },
  ];
  const features = [
    `${SITE.sessionMinutes} phút/buổi`,
    'Áp dụng cho cả 3 môn: Toán, Khoa học, Tiếng Anh Cambridge',
    'Nhận xét sau mỗi buổi & báo cáo tiến độ qua Zalo',
    'Lộ trình cá nhân sau kiểm tra đầu vào',
  ];

  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {plans.map(({ key, cap, plan, highlight }) => (
        <div
          key={key}
          className={cn(
            'card-hover relative flex flex-col rounded-2xl bg-white p-7 shadow-soft sm:p-8',
            highlight ? 'border-2 border-brand-700' : 'border border-line',
          )}
        >
          {highlight && (
            <Badge tone="solid" className="absolute -top-3 left-7">
              Cấp 2
            </Badge>
          )}
          {!highlight && (
            <Badge tone="brand" className="absolute -top-3 left-7">
              Cấp 1
            </Badge>
          )}
          <h3 className="text-xl font-bold text-ink">{plan.label}</h3>
          <p className="text-muted">{plan.grades}</p>
          <p className="mt-6 flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold tracking-tight text-brand-700 sm:text-5xl">
              {formatVND(plan.price)}
            </span>
            <span className="font-medium text-muted">/ {plan.unit}</span>
          </p>
          {detailed && (
            <ul className="mt-6 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-7">
            <ButtonLink
              to={`/dang-ky-hoc-thu?cap=${cap}`}
              variant={highlight ? 'primary' : 'secondary'}
              className="w-full"
            >
              Đăng ký học thử
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  );
}
