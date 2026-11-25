import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function Card({
  className,
  hover,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-white p-6 shadow-soft',
        hover && 'card-hover',
        className,
      )}
      {...rest}
    />
  );
}
