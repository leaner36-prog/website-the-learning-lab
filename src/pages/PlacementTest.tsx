import { Check, ClipboardList, Monitor, School } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useFormDefaults } from '../hooks/useFormDefaults';
import { PageHero } from '../components/PageHero';
import { RegistrationForm } from '../components/RegistrationForm';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PLACEMENT_CONTENT, PLACEMENT_PREPARE, PLACEMENT_STEPS } from '../data/faq';
import { SITE } from '../config/site';

export default function PlacementTest() {
  usePageMeta(
    'Đặt lịch kiểm tra đầu vào',
    'Đặt lịch kiểm tra đầu vào trực tiếp với giáo viên The Learning Lab, nhận kết quả và tư vấn lộ trình riêng ngay trong buổi.',
  );
  const defaults = useFormDefaults();

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Kiểm tra đầu vào' }]}
        eyebrow={SITE.freePlacementTest ? 'Miễn phí' : 'Kiểm tra đầu vào'}
        title="Kiểm tra đầu vào trực tiếp với giáo viên"
        description="Con làm bài kiểm tra trực tiếp với giáo viên (tại trung tâm hoặc online), sau đó phụ huynh nhận kết quả và tư vấn lộ trình ngay trong buổi."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink">
            <School className="size-4 text-brand-700" aria-hidden="true" /> Tại trung tâm
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink">
            <Monitor className="size-4 text-brand-700" aria-hidden="true" /> Online
          </span>
        </div>
      </PageHero>

      <section className="section bg-white" aria-labelledby="content-title">
        <div className="container-page">
          <SectionHeading title={<span id="content-title">Nội dung kiểm tra theo từng môn</span>} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PLACEMENT_CONTENT.map((c) => (
              <div key={c.subject} className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <ClipboardList className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-ink">{c.subject}</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((i) => (
                    <li key={i} className="flex gap-3 text-ink">
                      <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="process-title">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title={<span id="process-title">Quy trình</span>} />
            <ol className="mt-8 space-y-4">
              {PLACEMENT_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{s.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading align="left" title="Cần chuẩn bị gì?" />
            <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-soft">
              <ul className="space-y-3.5">
                {PLACEMENT_PREPARE.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-ink">
                    <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" id="dat-lich">
        <div className="container-page max-w-4xl">
          <RegistrationForm
            type="kiem_tra_dau_vao"
            defaults={defaults}
            title="Đặt lịch kiểm tra đầu vào"
            description="Điền thông tin bên dưới, trung tâm sẽ liên hệ xác nhận lịch trong vòng 24 giờ."
          />
        </div>
      </section>
    </>
  );
}
