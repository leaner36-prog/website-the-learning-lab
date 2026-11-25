import { SUBJECTS } from '../data/subjects';

export const PROGRAM_LINKS = [
  { to: '/chuong-trinh', label: 'Tổng quan chương trình' },
  ...SUBJECTS.map((s) => ({ to: `/chuong-trinh/${s.slug}`, label: s.name })),
];

export const NAV_LINKS = [
  { to: '/phuong-phap', label: 'Phương pháp' },
  { to: '/hoc-phi', label: 'Học phí' },
  { to: '/cam-nhan', label: 'Cảm nhận' },
  { to: '/lien-he', label: 'Liên hệ' },
];
