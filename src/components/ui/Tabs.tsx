import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({
  items,
  value,
  onChange,
  label,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    onChange(items[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex w-full gap-1 rounded-2xl border border-line bg-alt p-1 sm:w-auto"
      >
        {items.map((item, i) => {
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                'flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:px-6 sm:text-base',
                selected ? 'bg-brand-700 text-white shadow-sm' : 'text-muted hover:text-brand-700',
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== value}
          tabIndex={0}
          className="mt-8 focus-visible:ring-offset-4"
        >
          {item.id === value && item.content}
        </div>
      ))}
    </div>
  );
}
