import { METHOD_STEPS } from '../data/method';

export function MethodSteps() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden h-0.5 bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200 lg:block"
      />
      <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {METHOD_STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={step.title}>
              <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lift ring-8 ring-white">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-brand-600">Bước {i + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
