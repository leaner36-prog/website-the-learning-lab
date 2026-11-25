import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Tag = 'h2',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>
      )}
      <Tag className="text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
        {title}
      </Tag>
      {description && <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
