import { createContext, useContext, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseReady } from '../../lib/supabase';
import { useAdminSession } from '../../hooks/useAdminSession';
import { SetupNotice } from './SetupNotice';

const SessionContext = createContext<Session | null>(null);
export const useSession = () => useContext(SessionContext);

function Guarded({ children }: { children: ReactNode }) {
  const state = useAdminSession();

  if (state.status === 'loading') {
    return (
      <div className="flex min-h-dvh items-center justify-center" role="status" aria-live="polite">
        <Loader2 className="size-6 animate-spin text-brand-700" aria-hidden="true" />
        <span className="sr-only">Đang kiểm tra đăng nhập...</span>
      </div>
    );
  }
  if (state.status !== 'admin') return <Navigate to="/admin/login" replace />;
  return <SessionContext.Provider value={state.session}>{children}</SessionContext.Provider>;
}

export default function AdminGuard({ children }: { children: ReactNode }) {
  if (!isSupabaseReady) return <SetupNotice />;
  return <Guarded>{children}</Guarded>;
}
