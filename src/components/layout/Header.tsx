import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonAnchor, ButtonLink } from '../ui/Button';
import { NAV_LINKS, PROGRAM_LINKS } from '../../config/nav';
import { SITE } from '../../config/site';
import { cn } from '../../lib/cn';

const linkBase =
  'relative inline-flex items-center gap-1 whitespace-nowrap px-1 py-2 text-[15px] font-medium transition-colors hover:text-brand-700';
const activeBar =
  "after:absolute after:inset-x-1 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-700 after:content-['']";

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setProgramOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!programOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setProgramOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setProgramOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [programOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const programActive = pathname.startsWith('/chuong-trinh');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-brand-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Bỏ qua điều hướng
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-4 xl:h-20">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-8">
            <li>
              <NavLink to="/" end className={({ isActive }) => cn(linkBase, isActive ? 'text-brand-700 ' + activeBar : 'text-ink')}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  aria-expanded={programOpen}
                  aria-haspopup="true"
                  aria-controls="program-menu"
                  onClick={() => setProgramOpen((o) => !o)}
                  className={cn(linkBase, programActive ? 'text-brand-700 ' + activeBar : 'text-ink')}
                >
                  Chương trình học
                  <ChevronDown
                    className={cn('size-4 transition-transform', programOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {programOpen && (
                  <div
                    id="program-menu"
                    className="animate-fade-up absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-2xl border border-line bg-white p-2 shadow-lift"
                  >
                    <ul>
                      {PROGRAM_LINKS.map((l) => (
                        <li key={l.to}>
                          <NavLink
                            to={l.to}
                            end
                            className={({ isActive }) =>
                              cn(
                                'block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-700',
                                isActive ? 'bg-brand-50 text-brand-700' : 'text-ink',
                              )
                            }
                          >
                            {l.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => cn(linkBase, isActive ? 'text-brand-700 ' + activeBar : 'text-ink')}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <ButtonLink to="/kiem-tra-dau-vao" variant="secondary" size="sm">
            Kiểm tra đầu vào
          </ButtonLink>
          <ButtonLink to="/dang-ky-hoc-thu" size="sm">
            Đăng ký học thử
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 rounded-lg p-2 text-ink hover:bg-alt xl:hidden"
          aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-white xl:hidden"
        >
          <nav aria-label="Điều hướng di động" className="container-page flex-1 py-4">
            <ul className="divide-y divide-line">
              <li>
                <Link to="/" className={cn('block py-4 text-lg font-semibold', pathname === '/' ? 'text-brand-700' : 'text-ink')}>
                  Trang chủ
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  aria-expanded={mobileProgramOpen}
                  aria-controls="mobile-program-list"
                  onClick={() => setMobileProgramOpen((o) => !o)}
                  className={cn(
                    'flex w-full items-center justify-between py-4 text-lg font-semibold',
                    programActive ? 'text-brand-700' : 'text-ink',
                  )}
                >
                  Chương trình học
                  <ChevronDown
                    className={cn('size-5 transition-transform', mobileProgramOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                <ul id="mobile-program-list" hidden={!mobileProgramOpen} className="mb-3 space-y-1 rounded-xl bg-alt p-2">
                  {PROGRAM_LINKS.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className={cn(
                          'block rounded-lg px-4 py-3 font-medium',
                          pathname === l.to ? 'bg-white text-brand-700' : 'text-ink',
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={cn('block py-4 text-lg font-semibold', pathname === l.to ? 'text-brand-700' : 'text-ink')}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-page space-y-3 border-t border-line bg-alt py-5">
            <ButtonLink to="/dang-ky-hoc-thu" size="lg" className="w-full">
              Đăng ký học thử
            </ButtonLink>
            <ButtonLink to="/kiem-tra-dau-vao" variant="secondary" size="lg" className="w-full">
              Kiểm tra đầu vào
            </ButtonLink>
            <div className="grid grid-cols-2 gap-3">
              <ButtonAnchor href={SITE.phoneUrl} variant="ghost" className="border border-line bg-white">
                <Phone className="size-4" aria-hidden="true" />
                Gọi ngay
              </ButtonAnchor>
              <ButtonAnchor
                href={SITE.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="border border-line bg-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Zalo
              </ButtonAnchor>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
