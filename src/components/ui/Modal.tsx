import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialogA11y } from './useDialogA11y';

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogA11y(open, ref, onClose);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="animate-fade-up relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lift focus:outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-bold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="-m-2 rounded-lg p-2 text-muted hover:bg-alt hover:text-ink"
            aria-label="Đóng"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 text-muted">{children}</div>
        {footer && <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
