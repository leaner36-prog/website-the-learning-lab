import { useParams, useSearchParams } from 'react-router-dom';
import { Check, Target, BookOpen, Sparkles, LayoutGrid, Wallet } from 'lucide-react';
import type { ReactNode } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { Tabs } from '../components/ui/Tabs';
import { Accordion } from '../components/ui/Accordion';
import { ButtonLink } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { getSubject, type LevelContent, type Subject } from '../data/subjects';
import { SITE, formatVND } from '../config/site';
import NotFound from './NotFound';

function InfoBlock({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{icon}</span>
        <h3 className="text-lg font-bold text-ink">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 leading-relaxed text-ink">
          <Check className="mt-1 size-4 shrink-0 text-brand-700" strokeWidth={3} aria-hidden="true" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function LevelPanel({ subject, cap, content }: { subject: Subject; cap: 1 | 2; content: LevelContent }) {
  const price = cap === 1 ? SITE.pricing.tieuHoc : SITE.pricing.thcs;
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid gap-6 md:grid-cols-2 lg:col-span-2">
        <InfoBlock icon={<Target className="size-5" aria-hidden="true" />} title="Mục tiêu">
          <CheckList items={content.goals} />
        </InfoBlock>
        <InfoBlock icon={<BookOpen className="size-5" aria-hidden="true" />} title="Nội dung trọng tâm">
          <CheckList items={content.topics} />
        </InfoBlock>
        <InfoBlock icon={<Sparkles className="size-5" aria-hidden="true" />} title="Kỹ năng phát triển">
          <div className="flex flex-wrap gap-2">
            {content.skills.map((s) => (
              <span key={s} className="rounded-full bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700">
                {s}
              </span>
            ))}
          </div>
        </InfoBlock>
        <InfoBlock icon={<LayoutGrid className="size-5" aria-hidden="true" />} title="Hình thức học">
          <CheckList items={content.format} />
        </InfoBlock>
      </div>

      <aside className="flex flex-col rounded-2xl border-2 border-brand-700 bg-white p-6 shadow-soft lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white">
            <Wallet className="size-5" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-bold text-ink">Học phí {price.label}</h3>
        </div>
        <p className="mt-5 text-sm text-muted">{price.grades}</p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-4xl font-extrabold text-brand-700">{formatVND(price.price)}</span>
          <span className="text-muted">/ {price.unit}</span>
        </p>
        <p className="mt-2 text-sm text-muted">{SITE.sessionMinutes} phút/buổi · có báo cáo tiến độ</p>
        <ButtonLink to={`/dang-ky-hoc-thu?mon=${subject.slug}&cap=${cap}`} size="lg" className="mt-6 w-full">
          Đăng ký học thử môn này
        </ButtonLink>
        <ButtonLink to="/kiem-tra-dau-vao" variant="ghost" className="mt-2 w-full">
          Đặt lịch kiểm tra đầu vào
        </ButtonLink>
      </aside>
    </div>
  );
}

export default function SubjectPage() {
  const { slug = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const subject = getSubject(slug);
  const cap = params.get('cap') === '2' ? '2' : '1';

  usePageMeta(
    subject ? `Môn ${subject.name}` : 'Không tìm thấy trang',
    subject
      ? `Chương trình ${subject.name} Cấp 1 và Cấp 2 tại The Learning Lab: ${subject.summary}`
      : undefined,
  );

  if (!subject) return <NotFound />;
  const Icon = subject.icon;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Chương trình học', to: '/chuong-trinh' }, { label: subject.name }]}
        title={
          <span className="flex items-center gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-white md:size-14">
              <Icon className="size-6 md:size-7" aria-hidden="true" />
            </span>
            {subject.name}
          </span>
        }
        description={subject.summary}
      />

      <section className="section bg-alt">
        <div className="container-page">
          <Tabs
            label={`Cấp học môn ${subject.name}`}
            value={cap}
            onChange={(id) => setParams({ cap: id }, { replace: true, preventScrollReset: true })}
            items={([1, 2] as const).map((c) => ({
              id: String(c),
              label: c === 1 ? 'Cấp 1 (Lớp 1–5)' : 'Cấp 2 (Lớp 6–9)',
              content: <LevelPanel subject={subject} cap={c} content={subject.levels[c]} />,
            }))}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="faq-title">
        <div className="container-page max-w-3xl">
          <SectionHeading title={<span id="faq-title">Câu hỏi thường gặp về môn {subject.name}</span>} />
          <div className="mt-10">
            <Accordion items={subject.faq} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
