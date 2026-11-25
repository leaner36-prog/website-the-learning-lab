import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink transition-colors hover:bg-alt sm:px-6 sm:py-5"
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn('size-5 shrink-0 text-brand-700 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 leading-relaxed text-muted sm:px-6"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
