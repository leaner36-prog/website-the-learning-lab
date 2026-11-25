import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { ButtonLink } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SubjectCard } from '../components/SubjectCard';
import { PricingCards } from '../components/PricingCards';
import { TestimonialCard } from '../components/TestimonialCard';
import { MethodSteps } from '../components/MethodSteps';
import { CtaBanner } from '../components/CtaBanner';
import { SUBJECTS } from '../data/subjects';
import { WHY_US } from '../data/faq';
import { TESTIMONIALS } from '../data/testimonials';
import { SITE } from '../config/site';

const ROADMAP = [
  { title: 'Kiểm tra đầu vào', note: 'Đánh giá năng lực hiện tại' },
  { title: 'Lộ trình cá nhân', note: 'Mục tiêu rõ ràng theo tháng' },
  { title: 'Học bám sát trên lớp', note: 'Củng cố & nâng cao' },
  { title: 'Báo cáo qua Zalo', note: 'Phụ huynh nắm tiến độ' },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-50" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full border-[36px] border-brand-50" />
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(#ECE4E5_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
      <div className="container-page relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
            <GraduationCap className="size-4" aria-hidden="true" />
            Dành cho học sinh Vinschool hệ Chuẩn · Lớp 1–9
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Học chắc kiến thức trên lớp. <span className="text-brand-700">Tự tin</span> với Toán, Khoa học & Tiếng Anh
            Cambridge.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            Dạy kèm bám sát chương trình hệ Chuẩn Vinschool cho học sinh lớp 1–9. Mỗi con có một lộ trình riêng, xuất
            phát từ đúng năng lực và mục tiêu của con.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/dang-ky-hoc-thu" size="lg">
              Đăng ký học thử
            </ButtonLink>
            <ButtonLink to="/kiem-tra-dau-vao" variant="secondary" size="lg">
              Đặt lịch kiểm tra đầu vào
            </ButtonLink>
          </div>
          {(SITE.freeTrial || SITE.freePlacementTest) && (
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted">
              <Sparkles className="size-4 text-brand-600" aria-hidden="true" />
              Kiểm tra đầu vào & học thử miễn phí
            </p>
          )}
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 size-24 rotate-6 rounded-3xl bg-brand-700 sm:-right-6 sm:-top-6"
          />
          <div className="relative rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted">Lộ trình của con</p>
                <p className="text-xl font-bold text-ink">Học kỳ này</p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-success">
                Đang tiến bộ
              </span>
            </div>
            <ol className="mt-6 space-y-3">
              {ROADMAP.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-alt px-4 py-3.5"
                >
                  <CheckCircle2 className="size-6 shrink-0 text-brand-700" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-sm text-muted">{step.note}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-200">0{i + 1}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted">Mức độ hoàn thành mục tiêu</span>
                <span className="font-bold text-brand-700">80%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-brand-50" aria-hidden="true">
                <div className="h-full w-4/5 rounded-full bg-brand-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta(
    'Dạy kèm Toán, Khoa học, Tiếng Anh Cambridge lớp 1–9',
    'The Learning Lab dạy kèm Toán, Khoa học và Tiếng Anh Cambridge cho học sinh lớp 1–9, bám sát chương trình hệ Chuẩn Vinschool. Đăng ký học thử và kiểm tra đầu vào.',
  );
  const featured = TESTIMONIALS.filter((t) => t.featured).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="section bg-alt" aria-labelledby="subjects-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Chương trình học"
            title={<span id="subjects-title">3 môn học, 2 cấp học</span>}
            description="Bám sát nội dung trên lớp của hệ Chuẩn Vinschool, từ lớp 1 đến lớp 9."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.slug} subject={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="why-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Vì sao chọn chúng tôi"
            title={<span id="why-title">Vì sao phụ huynh chọn The Learning Lab</span>}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card-hover flex gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="method-title">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Phương pháp"
              title={<span id="method-title">4 bước đồng hành cùng con</span>}
            />
            <Link
              to="/phuong-phap"
              className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
            >
              Tìm hiểu phương pháp <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <MethodSteps />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="pricing-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Học phí"
            title={<span id="pricing-title">Học phí rõ ràng, minh bạch</span>}
            description="Một mức học phí theo cấp học, áp dụng cho cả 3 môn."
          />
          <div className="mt-12">
            <PricingCards />
          </div>
          <div className="mt-8 text-center">
            <Link to="/hoc-phi" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800">
              Xem chi tiết học phí <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="testimonials-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="Cảm nhận"
            title={<span id="testimonials-title">Phụ huynh nói gì về The Learning Lab</span>}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/cam-nhan" className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800">
              Xem tất cả cảm nhận <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
