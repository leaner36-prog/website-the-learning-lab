import { ImageIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

/** Khung giữ chỗ để sau này thay bằng ảnh thật (truyền `src` khi đã có ảnh). */
export function ImagePlaceholder({
  src,
  alt,
  label = 'Ảnh sẽ được cập nhật',
  className,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  if (src) {
    return <img src={src} alt={alt} className={cn('rounded-2xl object-cover', className)} loading="lazy" />;
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-brand-200 bg-brand-50 text-brand-400',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:radial-gradient(#E9B9C0_1px,transparent_1px)] [background-size:16px_16px]"
      />
      <div className="relative flex flex-col items-center gap-2 text-sm font-medium">
        <ImageIcon className="size-8" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}
