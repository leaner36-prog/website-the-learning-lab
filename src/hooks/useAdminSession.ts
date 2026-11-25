import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type AdminState =
  | { status: 'loading' }
  | { status: 'signed_out' }
  | { status: 'not_admin'; session: Session }
  | { status: 'admin'; session: Session }
  | { status: 'error'; message: string };

export async function checkIsAdmin() {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc('is_admin');
  if (error) throw error;
  return data === true;
}

export function useAdminSession(): AdminState {
  const [state, setState] = useState<AdminState>({ status: 'loading' });

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    const resolve = async (session: Session | null) => {
      if (!session) {
        if (active) setState({ status: 'signed_out' });
        return;
      }
      try {
        const ok = await checkIsAdmin();
        if (active) setState(ok ? { status: 'admin', session } : { status: 'not_admin', session });
      } catch {
        if (active) setState({ status: 'error', message: 'Không kiểm tra được quyền quản trị.' });
      }
    };

    supabase.auth.getSession().then(({ data }) => resolve(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      // Deferred: awaiting Supabase calls inside this callback can deadlock the auth client.
      if (event === 'SIGNED_OUT' || event === 'SIGNED_IN') setTimeout(() => resolve(session), 0);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
