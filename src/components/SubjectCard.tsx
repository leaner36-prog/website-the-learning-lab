import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Subject } from '../data/subjects';
import { Badge } from './ui/Badge';

export function SubjectCard({ subject }: { subject: Subject }) {
  const Icon = subject.icon;
  return (
    <article className="card-hover group relative flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft">
      <div className="flex items-start justify-between">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <div className="flex gap-1.5">
          <Badge>Cấp 1</Badge>
          <Badge>Cấp 2</Badge>
        </div>
      </div>
      <h3 className="mt-6 text-xl font-bold text-ink">{subject.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{subject.tagline}</p>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{subject.summary}</p>
      <Link
        to={`/chuong-trinh/${subject.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 font-semibold text-brand-700 after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-brand-800"
      >
        Xem chi tiết
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        <span className="sr-only">môn {subject.name}</span>
      </Link>
    </article>
  );
}
