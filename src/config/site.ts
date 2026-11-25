export const SITE = {
  name: 'The Learning Lab',
  slogan: 'Học chắc trên lớp – Tự tin vươn xa',
  zalo: '0911558819',
  zaloDisplay: '0911 558 819',
  zaloUrl: 'https://zalo.me/0911558819',
  phoneUrl: 'tel:0911558819',
  address: 'TODO: địa chỉ trung tâm',
  email: 'TODO: email',
  openingHours: 'TODO: giờ làm việc',
  pricing: {
    tieuHoc: { label: 'Tiểu học', grades: 'Lớp 1 – 5', price: 250000, unit: 'buổi' },
    thcs: { label: 'THCS', grades: 'Lớp 6 – 9', price: 350000, unit: 'buổi' },
  },
  sessionMinutes: 90, // TODO: xác nhận thời lượng 1 buổi
  freeTrial: true, // TODO: xác nhận học thử miễn phí
  freePlacementTest: true, // TODO: xác nhận kiểm tra đầu vào miễn phí
};

export const formatVND = (n: number) => n.toLocaleString('vi-VN') + 'đ';

export type SchoolLevel = 'tieu_hoc' | 'thcs';

export const levelFromGrade = (grade: number): SchoolLevel => (grade <= 5 ? 'tieu_hoc' : 'thcs');

export const priceForLevel = (level: SchoolLevel) =>
  level === 'tieu_hoc' ? SITE.pricing.tieuHoc : SITE.pricing.thcs;
