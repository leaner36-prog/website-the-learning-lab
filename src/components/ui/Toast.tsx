import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/cn';

type ToastTone = 'success' | 'error';
interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const show = useCallback((message: string, tone: ToastTone = 'success') => {
    const id = nextId.current++;
    setToasts((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex flex-col items-center gap-2 px-4"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'animate-fade-up pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lift',
              t.tone === 'success' ? 'bg-ink' : 'bg-danger',
            )}
          >
            {t.tone === 'success' ? (
              <CheckCircle2 className="size-4 text-green-400" aria-hidden="true" />
            ) : (
              <AlertCircle className="size-4" aria-hidden="true" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
