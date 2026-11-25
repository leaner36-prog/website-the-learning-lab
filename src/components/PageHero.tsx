import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function PageHero({
  title,
  description,
  crumbs,
  eyebrow,
  children,
}: {
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-alt">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-brand-100/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-40 top-24 hidden size-16 rotate-12 rounded-2xl bg-brand-200/50 md:block"
      />
      <div className="container-page relative py-12 md:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
            <li>
              <Link to="/" className="hover:text-brand-700">
                Trang chủ
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-brand-700">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
