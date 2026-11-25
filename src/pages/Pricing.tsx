import { Gift } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { PricingCards } from '../components/PricingCards';
import { CtaBanner } from '../components/CtaBanner';
import { Accordion } from '../components/ui/Accordion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PRICING_FAQ } from '../data/faq';
import { SITE, formatVND } from '../config/site';

export default function Pricing() {
  usePageMeta(
    'Học phí',
    `Học phí The Learning Lab: Tiểu học ${formatVND(SITE.pricing.tieuHoc.price)}/buổi, THCS ${formatVND(SITE.pricing.thcs.price)}/buổi, áp dụng cho Toán, Khoa học, Tiếng Anh Cambridge.`,
  );
  const freeParts = [SITE.freePlacementTest && 'Kiểm tra đầu vào', SITE.freeTrial && 'học thử'].filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Học phí' }]}
        eyebrow="Học phí"
        title="Học phí rõ ràng theo cấp học"
        description="Một mức học phí cho mỗi cấp, áp dụng cho cả 3 môn Toán, Khoa học và Tiếng Anh Cambridge."
      />

      <section className="section bg-white">
        <div className="container-page">
          {freeParts.length > 0 && (
            <div className="mx-auto mb-12 flex max-w-4xl items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
                <Gift className="size-6" aria-hidden="true" />
              </span>
              <p className="text-lg font-bold text-brand-800">{freeParts.join(' & ')} miễn phí</p>
            </div>
          )}
          <PricingCards detailed />
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="pricing-faq">
        <div className="container-page max-w-3xl">
          <SectionHeading title={<span id="pricing-faq">Câu hỏi về học phí</span>} />
          <div className="mt-10">
            <Accordion items={PRICING_FAQ} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
