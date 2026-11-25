import type { SubjectSlug } from './subjects';

// NỘI DUNG MẪU: thay bằng cảm nhận thật (đã được phụ huynh đồng ý) trước khi công khai

export interface Testimonial {
  id: number;
  author: string;
  grade: number;
  subject: SubjectSlug;
  content: string;
  result?: string;
  featured?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: 'Phụ huynh bé Minh Anh',
    grade: 4,
    subject: 'tieng-anh-cambridge',
    content:
      'Sau 6 tháng, con tự tin nói tiếng Anh hơn hẳn. Cô theo sát và nhắn nhận xét sau mỗi buổi nên gia đình nắm được con học gì.',
    result: 'Đạt Flyers 14/15 khiên',
    featured: true,
  },
  {
    id: 2,
    author: 'Phụ huynh bé Gia Bảo',
    grade: 7,
    subject: 'toan',
    content:
      'Con từng sợ Toán vì học bằng tiếng Anh trên lớp. Thầy giảng lại bản chất rất dễ hiểu, giờ con chủ động làm bài và hỏi khi chưa hiểu.',
    result: 'Điểm cuối kỳ tăng từ 6.5 lên 8.75',
    featured: true,
  },
  {
    id: 3,
    author: 'Phụ huynh bé Khánh Linh',
    grade: 3,
    subject: 'khoa-hoc',
    content:
      'Con rất thích các buổi thí nghiệm nhỏ, về nhà kể say sưa. Kiến thức trên lớp con nắm chắc hơn, không còn học thuộc lòng.',
    featured: true,
  },
  {
    id: 4,
    author: 'Phụ huynh bé Đức Minh',
    grade: 9,
    subject: 'tieng-anh-cambridge',
    content:
      'Lộ trình rõ ràng từng tháng, có thi thử định kỳ. Con đạt mục tiêu chứng chỉ sớm hơn dự kiến.',
    result: 'Đạt B1 Preliminary – Merit',
  },
  {
    id: 5,
    author: 'Phụ huynh bé Bảo Ngọc',
    grade: 2,
    subject: 'toan',
    content:
      'Lớp nhỏ nên cô để ý từng bạn. Con tính toán nhanh và cẩn thận hơn, đặc biệt là phần toán có lời văn.',
  },
  {
    id: 6,
    author: 'Phụ huynh bé Hoàng Nam',
    grade: 8,
    subject: 'khoa-hoc',
    content:
      'Con học Khoa học tự nhiên tiến bộ rõ, biết cách trình bày lập luận. Trung tâm báo cáo đều đặn qua Zalo nên gia đình rất yên tâm.',
    result: 'Điểm KHTN giữa kỳ đạt 9.0',
  },
  {
    id: 7,
    author: 'Phụ huynh bé Thảo Vy',
    grade: 5,
    subject: 'tieng-anh-cambridge',
    content:
      'Bài kiểm tra đầu vào chỉ ra đúng điểm yếu kỹ năng Viết của con. Sau 3 tháng con viết đoạn văn mạch lạc hơn nhiều.',
  },
  {
    id: 8,
    author: 'Phụ huynh bé Quang Huy',
    grade: 6,
    subject: 'toan',
    content:
      'Lên lớp 6 con bị hụt kiến thức, nhờ lộ trình riêng mà con theo kịp lớp chỉ sau một học kỳ.',
  },
];
