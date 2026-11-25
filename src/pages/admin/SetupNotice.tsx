import { Settings } from 'lucide-react';
import { Logo } from '../../components/layout/Logo';

export function SetupNotice() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-8 shadow-soft">
        <Logo />
        <div className="mt-8 flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Settings className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-ink">Chưa cấu hình Supabase</h1>
            <p className="mt-2 leading-relaxed text-muted">
              Thêm <code className="rounded bg-alt px-1.5 py-0.5 text-sm text-ink">VITE_SUPABASE_URL</code> và{' '}
              <code className="rounded bg-alt px-1.5 py-0.5 text-sm text-ink">VITE_SUPABASE_ANON_KEY</code> vào biến môi
              trường, sau đó tải lại trang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
