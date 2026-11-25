import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { MethodSteps } from '../components/MethodSteps';
import { CtaBanner } from '../components/CtaBanner';
import { SectionHeading } from '../components/ui/SectionHeading';
import { METHOD_PRINCIPLES } from '../data/method';

export default function Method() {
  usePageMeta(
    'Phương pháp học',
    'Phương pháp 4 bước của The Learning Lab: kiểm tra đầu vào, lộ trình riêng, học & luyện tập, theo dõi & báo cáo cho phụ huynh.',
  );

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Phương pháp' }]}
        eyebrow="Phương pháp"
        title="Mỗi con một lộ trình, mỗi buổi một bước tiến"
        description="Chúng tôi bắt đầu từ việc hiểu con, sau đó đồng hành bằng lộ trình rõ ràng và phản hồi thường xuyên cho phụ huynh."
      />

      <section className="section bg-white" aria-labelledby="steps-title">
        <div className="container-page">
          <SectionHeading eyebrow="Quy trình" title={<span id="steps-title">4 bước đồng hành cùng con</span>} />
          <div className="mt-14">
            <MethodSteps />
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="principles-title">
        <div className="container-page">
          <SectionHeading eyebrow="Nguyên tắc" title={<span id="principles-title">4 nguyên tắc giảng dạy</span>} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {METHOD_PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-hover relative overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-soft">
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-6 text-8xl font-extrabold text-brand-50"
                  >
                    {i + 1}
                  </span>
                  <span className="relative flex size-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold text-ink">{p.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-muted">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
