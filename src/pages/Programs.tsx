import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { SubjectCard } from '../components/SubjectCard';
import { CtaBanner } from '../components/CtaBanner';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SUBJECTS } from '../data/subjects';
import { SITE, formatVND } from '../config/site';

export default function Programs() {
  usePageMeta(
    'Chương trình học',
    'Tổng quan chương trình Toán, Khoa học và Tiếng Anh Cambridge cho Cấp 1 (lớp 1–5) và Cấp 2 (lớp 6–9) tại The Learning Lab.',
  );
  const levels = [
    { key: 1 as const, label: 'Cấp 1 (Lớp 1–5)', price: SITE.pricing.tieuHoc },
    { key: 2 as const, label: 'Cấp 2 (Lớp 6–9)', price: SITE.pricing.thcs },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Chương trình học' }]}
        eyebrow="Chương trình học"
        title="Bám sát trên lớp, phát triển vượt trội"
        description="The Learning Lab dạy kèm 3 môn Toán, Khoa học và Tiếng Anh Cambridge cho học sinh lớp 1–9, bám sát chương trình hệ Chuẩn Vinschool. Mỗi môn được thiết kế riêng cho từng cấp học."
      />

      <section className="section bg-white">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.slug} subject={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt" aria-labelledby="overview-title">
        <div className="container-page">
          <SectionHeading
            title={<span id="overview-title">Tổng quan 3 môn × 2 cấp</span>}
            description="Nội dung trọng tâm của từng môn theo cấp học. Bấm vào môn để xem chi tiết."
          />

          <div className="mt-12 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-soft md:block">
            <table className="w-full text-left">
              <caption className="sr-only">Bảng tổng quan nội dung các môn theo cấp học</caption>
              <thead className="bg-brand-700 text-white">
                <tr>
                  <th scope="col" className="w-48 px-6 py-4 font-semibold">
                    Môn học
                  </th>
                  {levels.map((l) => (
                    <th key={l.key} scope="col" className="px-6 py-4 font-semibold">
                      {l.label}
                      <span className="block text-sm font-normal text-brand-100">
                        {formatVND(l.price.price)}/{l.price.unit}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SUBJECTS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <tr key={s.slug} className="align-top">
                      <th scope="row" className="px-6 py-5">
                        <Link to={`/chuong-trinh/${s.slug}`} className="flex items-center gap-3 font-bold text-ink hover:text-brand-700">
                          <span className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                            <Icon className="size-5" aria-hidden="true" />
                          </span>
                          {s.name}
                        </Link>
                      </th>
                      {levels.map((l) => (
                        <td key={l.key} className="px-6 py-5">
                          <ul className="space-y-1.5 text-sm text-muted">
                            {s.levels[l.key].topics.slice(0, 4).map((t) => (
                              <li key={t} className="flex gap-2">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                                {t}
                              </li>
                            ))}
                          </ul>
                          <Link
                            to={`/chuong-trinh/${s.slug}?cap=${l.key}`}
                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                          >
                            Chi tiết <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-10 space-y-4 md:hidden">
            {SUBJECTS.map((s) => (
              <div key={s.slug} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
                <h3 className="text-lg font-bold text-ink">{s.name}</h3>
                {levels.map((l) => (
                  <div key={l.key} className="mt-4">
                    <p className="text-sm font-semibold text-brand-700">
                      {l.label} · {formatVND(l.price.price)}/{l.price.unit}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {s.levels[l.key].topics.slice(0, 4).join(' · ')}
                    </p>
                  </div>
                ))}
                <Link
                  to={`/chuong-trinh/${s.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
                >
                  Xem chi tiết môn {s.name} <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
