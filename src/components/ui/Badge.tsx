import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Tone = 'brand' | 'neutral' | 'success' | 'danger' | 'amber' | 'blue' | 'solid';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  neutral: 'bg-alt text-muted ring-line',
  success: 'bg-green-50 text-success ring-green-200',
  danger: 'bg-red-50 text-danger ring-red-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  blue: 'bg-sky-50 text-sky-800 ring-sky-200',
  solid: 'bg-brand-700 text-white ring-brand-700',
};

export function Badge({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
