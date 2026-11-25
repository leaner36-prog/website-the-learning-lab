import { Award, Quote, Star } from 'lucide-react';
import type { Testimonial } from '../data/testimonials';
import { subjectLabel } from '../data/subjects';
import { Badge } from './ui/Badge';

const initial = (author: string) => {
  const name = author.replace(/^Phụ huynh (bé )?/i, '').trim();
  return name.split(/\s+/).pop()?.charAt(0).toUpperCase() ?? '?';
};

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="card-hover flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber-500" role="img" aria-label="Đánh giá 5 trên 5 sao">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </div>
        <Quote className="size-6 text-brand-200" aria-hidden="true" />
      </div>
      <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-ink">
        <p>{`“${t.content}”`}</p>
      </blockquote>
      {t.result && (
        <p className="mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
          <Award className="size-4" aria-hidden="true" />
          {t.result}
        </p>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-700 font-bold text-white"
          aria-hidden="true"
        >
          {initial(t.author)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{t.author}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge tone="neutral">Lớp {t.grade}</Badge>
            <Badge tone="brand">{subjectLabel(t.subject)}</Badge>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
