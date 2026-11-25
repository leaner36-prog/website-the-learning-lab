import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { PageHero } from '../components/PageHero';
import { RegistrationForm } from '../components/RegistrationForm';
import { ButtonAnchor } from '../components/ui/Button';
import { ImagePlaceholder } from '../components/ui/ImagePlaceholder';
import { SITE } from '../config/site';

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">{icon}</span>
      <div>
        <p className="text-sm font-medium text-muted">{label}</p>
        <p className="font-semibold text-ink">{children}</p>
      </div>
    </div>
  );
}

export default function Contact() {
  usePageMeta('Liên hệ', `Liên hệ The Learning Lab qua Zalo/điện thoại ${SITE.zaloDisplay} hoặc gửi câu hỏi tư vấn.`);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Liên hệ' }]}
        eyebrow="Liên hệ"
        title="Chúng tôi luôn sẵn sàng hỗ trợ"
        description="Nhắn Zalo để được phản hồi nhanh nhất, hoặc gửi câu hỏi qua form bên dưới."
      />
      <section className="section bg-alt">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-brand-700 bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Zalo / Điện thoại</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{SITE.zaloDisplay}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <ButtonAnchor href={SITE.zaloUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> Nhắn Zalo
                </ButtonAnchor>
                <ButtonAnchor href={SITE.phoneUrl} variant="secondary">
                  <Phone className="size-4" aria-hidden="true" /> Gọi ngay
                </ButtonAnchor>
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-soft">
              <InfoRow icon={<MapPin className="size-5" aria-hidden="true" />} label="Địa chỉ">
                {SITE.address}
              </InfoRow>
              <InfoRow icon={<Mail className="size-5" aria-hidden="true" />} label="Email">
                {SITE.email}
              </InfoRow>
              <InfoRow icon={<Clock className="size-5" aria-hidden="true" />} label="Giờ làm việc">
                {SITE.openingHours}
              </InfoRow>
            </div>

            <ImagePlaceholder alt="Bản đồ vị trí trung tâm" label="Bản đồ sẽ được cập nhật" className="aspect-[4/3] w-full" />
          </div>

          <RegistrationForm
            type="tu_van"
            title="Gửi câu hỏi tư vấn"
            description="Để lại câu hỏi, trung tâm sẽ liên hệ lại trong vòng 24 giờ."
          />
        </div>
      </section>
    </>
  );
}
