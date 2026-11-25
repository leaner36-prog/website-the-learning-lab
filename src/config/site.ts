export const SITE = {
  name: 'The Learning Lab',
  slogan: 'Học chắc trên lớp – Tự tin vươn xa',
  zalo: '0911558819',
  zaloDisplay: '0911 558 819',
  zaloUrl: 'https://zalo.me/0911558819',
  phoneUrl: 'tel:0911558819',
  address: 'R105 Vinhomes Ocean Park, Gia Lâm, Hà Nội',
  email: 'thelearninglab.3in1@gmail.com',
  openingHours: 'Thứ 2 – Thứ 6: 14:00 – 21:00 · Thứ 7 – CN: 08:30 – 20:30',
  pricing: {
    tieuHoc: { label: 'Tiểu học', grades: 'Lớp 1 – 5', price: 250000, unit: 'buổi' },
    thcs: { label: 'THCS', grades: 'Lớp 6 – 9', price: 350000, unit: 'buổi' },
  },
  sessionMinutes: 90,
  freeTrial: true,
  freePlacementTest: true,
};

export const formatVND = (n: number) => n.toLocaleString('vi-VN') + 'đ';

export type SchoolLevel = 'tieu_hoc' | 'thcs';

export const levelFromGrade = (grade: number): SchoolLevel => (grade <= 5 ? 'tieu_hoc' : 'thcs');

export const priceForLevel = (level: SchoolLevel) =>
  level === 'tieu_hoc' ? SITE.pricing.tieuHoc : SITE.pricing.thcs;
