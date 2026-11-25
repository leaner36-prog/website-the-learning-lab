import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { SITE } from '../../config/site';
import { NAV_LINKS, PROGRAM_LINKS } from '../../config/nav';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-xs leading-relaxed text-brand-200">{SITE.slogan}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Chương trình</h2>
          <ul className="mt-4 space-y-2.5">
            {PROGRAM_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-brand-100 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Thông tin</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-brand-100 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/kiem-tra-dau-vao" className="text-brand-100 transition-colors hover:text-white">
                Kiểm tra đầu vào
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Liên hệ</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={SITE.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MessageCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  Zalo / ĐT: <strong className="font-semibold text-white">{SITE.zaloDisplay}</strong>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{SITE.email}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{SITE.openingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-brand-200 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}. Mọi quyền được bảo lưu.
          </p>
          <p className="text-xs leading-relaxed text-brand-200/90 md:max-w-xl md:text-right">
            <em>
              The Learning Lab là trung tâm dạy kèm độc lập, không trực thuộc hay liên kết với Hệ thống Giáo dục
              Vinschool.
            </em>{' '}
            <Link to="/admin" className="ml-1 underline underline-offset-2 hover:text-white">
              Quản trị
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
