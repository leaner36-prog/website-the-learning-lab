import type { RegistrationStatus, RegistrationType } from '../../lib/registrations';

const pad = (n: number) => String(n).padStart(2, '0');

export const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const formatDate = (iso: string | null) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

export const STATUS_TONES: Record<RegistrationStatus, 'brand' | 'blue' | 'amber' | 'success' | 'neutral' | 'danger'> = {
  moi: 'brand',
  da_lien_he: 'blue',
  da_xep_lich: 'amber',
  da_hoc_thu: 'neutral',
  da_nhap_hoc: 'success',
  huy: 'danger',
};

export const TYPE_TONES: Record<RegistrationType, 'solid' | 'brand' | 'neutral'> = {
  hoc_thu: 'solid',
  kiem_tra_dau_vao: 'brand',
  tu_van: 'neutral',
};
