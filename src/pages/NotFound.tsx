import { Home } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { ButtonLink } from '../components/ui/Button';

export default function NotFound() {
  usePageMeta('Không tìm thấy trang', 'Trang bạn tìm không tồn tại.');
  return (
    <section className="section bg-white">
      <div className="container-page flex flex-col items-center text-center">
        <p className="text-8xl font-extrabold tracking-tight text-brand-100 md:text-9xl" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-ink md:text-4xl">Không tìm thấy trang</h1>
        <p className="mt-3 max-w-md text-lg text-muted">
          Trang anh/chị đang tìm không tồn tại hoặc đã được chuyển sang địa chỉ khác.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" size="lg">
            <Home className="size-4" aria-hidden="true" /> Về trang chủ
          </ButtonLink>
          <ButtonLink to="/lien-he" variant="secondary" size="lg">
            Liên hệ hỗ trợ
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
