import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

function BookStarsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
      {/* Three stars above the book */}
      <path d="M32 7l1.8 3.8 4.2.5-3.1 2.9.8 4.1-3.7-2-3.7 2 .8-4.1-3.1-2.9 4.2-.5z" />
      <path d="M21 12l1.3 2.7 3 .4-2.2 2.1.6 3-2.7-1.4-2.7 1.4.6-3-2.2-2.1 3-.4z" />
      <path d="M43 12l1.3 2.7 3 .4-2.2 2.1.6 3-2.7-1.4-2.7 1.4.6-3-2.2-2.1 3-.4z" />
      {/* Open book left pages */}
      <path d="M31 44C25 35 16 31 8 30v4c8 1 16 5 23 11z" />
      <path d="M31 40C25 31 17 25 10 23v3.5c7 2 14 7 21 14.5z" />
      <path d="M31 36C26 27 19 20 13 17v3c6 3 12 9 18 17z" />
      {/* Open book right pages */}
      <path d="M33 44c6-9 15-13 23-14v4c-8 1-16 5-23 11z" />
      <path d="M33 40c6-9 14-15 21-17v3.5c-7 2-14 7-21 14.5z" />
      <path d="M33 36c5-9 12-16 18-19v3c-6 3-12 9-18 17z" />
      {/* Book spine smile */}
      <path
        d="M25.5 47.5a7.5 7.5 0 0 0 13 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ inverted, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex shrink-0 items-center gap-2.5 rounded-lg', className)}
      aria-label="The Learning Lab by Ms. Thịnh – về trang chủ"
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-xl',
          inverted ? 'bg-white text-brand-700' : 'bg-brand-700 text-white',
        )}
        aria-hidden="true"
      >
        <BookStarsMark className="size-7" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'whitespace-nowrap text-[17px] font-extrabold tracking-tight',
            inverted ? 'text-white' : 'text-ink',
          )}
        >
          The Learning <span className={inverted ? 'text-brand-200' : 'text-brand-700'}>Lab</span>
        </span>
        <span
          className={cn(
            'mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.18em]',
            inverted ? 'text-brand-200' : 'text-muted',
          )}
        >
          By Ms. Thịnh
        </span>
      </span>
    </Link>
  );
}
