import { Check, MessageCircle, Phone } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useFormDefaults } from '../hooks/useFormDefaults';
import { PageHero } from '../components/PageHero';
import { RegistrationForm } from '../components/RegistrationForm';
import { ButtonAnchor } from '../components/ui/Button';
import { TRIAL_BENEFITS } from '../data/faq';
import { SITE, formatVND } from '../config/site';

export default function TrialRegistration() {
  usePageMeta(
    'Đăng ký học thử',
    'Đăng ký buổi học thử Toán, Khoa học hoặc Tiếng Anh Cambridge tại The Learning Lab cho học sinh lớp 1–9.',
  );
  const defaults = useFormDefaults();
  const prices = [SITE.pricing.tieuHoc, SITE.pricing.thcs];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Đăng ký học thử' }]}
        eyebrow={SITE.freeTrial ? 'Học thử miễn phí' : 'Học thử'}
        title="Đăng ký học thử"
        description="Để con trải nghiệm một buổi học thật cùng giáo viên The Learning Lab trước khi quyết định."
      />
      <section className="section bg-alt">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <h2 className="text-lg font-bold text-ink">Lợi ích của buổi học thử</h2>
              <ul className="mt-4 space-y-3">
                {TRIAL_BENEFITS.map((b) => (
                  <li key={b} className="flex gap-3 leading-relaxed text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
              <h2 className="text-lg font-bold text-ink">Học phí theo cấp</h2>
              <dl className="mt-4 divide-y divide-line">
                {prices.map((p) => (
                  <div key={p.label} className="flex items-center justify-between py-3">
                    <dt>
                      <span className="font-semibold text-ink">{p.label}</span>
                      <span className="block text-sm text-muted">{p.grades}</span>
                    </dt>
                    <dd className="text-lg font-extrabold text-brand-700">
                      {formatVND(p.price)}
                      <span className="text-sm font-medium text-muted">/{p.unit}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl bg-brand-700 p-6 text-white">
              <h2 className="text-lg font-bold">Cần tư vấn nhanh?</h2>
              <p className="mt-1 text-brand-100">Nhắn Zalo hoặc gọi {SITE.zaloDisplay}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <ButtonAnchor href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer" variant="white" size="sm" className="flex-1">
                  <MessageCircle className="size-4" aria-hidden="true" /> Nhắn Zalo
                </ButtonAnchor>
                <ButtonAnchor href={SITE.phoneUrl} variant="outline-white" size="sm" className="flex-1">
                  <Phone className="size-4" aria-hidden="true" /> Gọi ngay
                </ButtonAnchor>
              </div>
            </div>
          </div>

          <RegistrationForm
            type="hoc_thu"
            defaults={defaults}
            title="Thông tin đăng ký"
            description="Trung tâm sẽ liên hệ xác nhận lịch học thử trong vòng 24 giờ."
          />
        </div>
      </section>
    </>
  );
}
