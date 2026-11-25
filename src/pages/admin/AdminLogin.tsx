import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Loader2, Lock } from 'lucide-react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { checkIsAdmin } from '../../hooks/useAdminSession';
import { supabase, isSupabaseReady } from '../../lib/supabase';
import { Logo } from '../../components/layout/Logo';
import { Button } from '../../components/ui/Button';
import { SetupNotice } from './SetupNotice';

export default function AdminLogin() {
  usePageMeta('Đăng nhập quản trị');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session && (await checkIsAdmin().catch(() => false))) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  if (!isSupabaseReady || !supabase) return <SetupNotice />;
  const sb = supabase;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    if (!email.trim() || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }
    setLoading(true);
    try {
      const { error: authError } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) {
        const code = (authError as { code?: string }).code;
        if (code === 'email_not_confirmed') setError('Email chưa được xác nhận. Vui lòng kiểm tra hộp thư.');
        else if (authError.status === 429) setError('Thử quá nhiều lần. Vui lòng đợi ít phút rồi thử lại.');
        else if (authError.status === 400) setError('Email hoặc mật khẩu không đúng.');
        else setError('Có lỗi không mong muốn, vui lòng thử lại sau.');
        return;
      }
      const ok = await checkIsAdmin();
      if (!ok) {
        await sb.auth.signOut();
        setError('Tài khoản không có quyền quản trị.');
        return;
      }
      navigate('/admin', { replace: true });
    } catch {
      setError('Có lỗi không mong muốn, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-soft">
          <Logo />
          <div className="mt-8 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Lock className="size-5" aria-hidden="true" />
            </span>
            <h1 className="text-2xl font-extrabold text-ink">Đăng nhập quản trị</h1>
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-ink">
                Mật khẩu
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div aria-live="assertive">
              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-danger">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading} aria-busy={loading}>
              {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </div>
        <Link to="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-brand-700">
          <ArrowLeft className="size-4" aria-hidden="true" /> Về trang chủ
        </Link>
      </div>
    </div>
  );
}
