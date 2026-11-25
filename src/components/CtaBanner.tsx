import { ButtonLink } from './ui/Button';

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 md:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 text-center sm:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border-[28px] border-white/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 size-56 rotate-12 rounded-[2.5rem] bg-brand-800/60"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 id="cta-title" className="text-2xl font-extrabold leading-tight text-white md:text-4xl">
              Chưa biết con nên bắt đầu từ đâu?
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-brand-100">
              Đặt lịch kiểm tra đầu vào để nhận lộ trình riêng.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/kiem-tra-dau-vao" variant="white" size="lg">
                Đặt lịch kiểm tra đầu vào
              </ButtonLink>
              <ButtonLink to="/dang-ky-hoc-thu" variant="outline-white" size="lg">
                Đăng ký học thử
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
