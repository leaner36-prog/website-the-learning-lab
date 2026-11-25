import { MessageCircle } from 'lucide-react';
import { SITE } from '../../config/site';

export function ZaloFloat() {
  return (
    <a
      href={SITE.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Nhắn Zalo ${SITE.zaloDisplay} (mở tab mới)`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-700 p-4 font-semibold text-white shadow-lift ring-4 ring-white transition-colors hover:bg-brand-800 sm:px-5 sm:py-3.5"
    >
      <MessageCircle className="size-6 sm:size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Zalo {SITE.zaloDisplay}</span>
    </a>
  );
}
