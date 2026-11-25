import { Link } from 'react-router-dom';
import { FlaskRound } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Logo({ inverted, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2.5 rounded-lg', className)}
      aria-label="The Learning Lab – về trang chủ"
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-xl',
          inverted ? 'bg-white text-brand-700' : 'bg-brand-700 text-white',
        )}
        aria-hidden="true"
      >
        <FlaskRound className="size-5" strokeWidth={2.25} />
      </span>
      <span className={cn('whitespace-nowrap text-lg font-extrabold tracking-tight', inverted ? 'text-white' : 'text-ink')}>
        The Learning <span className={inverted ? 'text-brand-200' : 'text-brand-700'}>Lab</span>
      </span>
    </Link>
  );
}
