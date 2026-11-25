import {
  ShieldCheck,
  ClipboardCheck,
  Users,
  Lightbulb,
  MessageCircle,
  CalendarClock,
  type LucideIcon,
} from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

// TODO: trung tâm cập nhật chính sách học phí thực tế
export const PRICING_FAQ: FaqItem[] = [
  {
    q: 'Đóng học phí như thế nào?',
    a: 'TODO: Học phí được đóng theo gói buổi hoặc theo tháng, bằng chuyển khoản hoặc tiền mặt tại trung tâm.',
  },
  {
    q: 'Nghỉ học có được học bù không?',
    a: 'TODO: Nếu báo nghỉ trước, con sẽ được sắp xếp buổi học bù phù hợp.',
  },
  {
    q: 'Học nhiều môn có ưu đãi không?',
    a: 'TODO: Trung tâm có ưu đãi khi đăng ký từ 2 môn trở lên hoặc anh/chị em ruột cùng học.',
  },
];

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WHY_US: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'Bám sát chương trình hệ Chuẩn Vinschool',
    description: 'Nội dung và tiến độ khớp với bài học trên lớp của con.',
  },
  {
    icon: ClipboardCheck,
    title: 'Kiểm tra đầu vào, lộ trình cá nhân',
    description: 'Mỗi con một lộ trình, xuất phát từ đúng năng lực hiện tại.',
  },
  {
    icon: Users,
    title: 'Lớp nhỏ / kèm 1-1',
    description: 'Giáo viên theo sát, kịp thời điều chỉnh cho từng con.',
  },
  {
    icon: Lightbulb,
    title: 'Học hiểu bản chất, không học vẹt',
    description: 'Con hiểu vì sao, nhớ lâu và vận dụng được.',
  },
  {
    icon: MessageCircle,
    title: 'Báo cáo tiến độ qua Zalo',
    description: 'Phụ huynh nhận nhận xét sau buổi học và báo cáo định kỳ.',
  },
  {
    icon: CalendarClock,
    title: 'Lịch học linh hoạt',
    description: 'Khung giờ chiều, tối trong tuần và cuối tuần.',
  },
];

export const TIME_SLOTS = [
  'Chiều thứ 2–6 (17h–19h)',
  'Tối thứ 2–6 (19h–21h)',
  'Sáng cuối tuần',
  'Chiều cuối tuần',
];

export const PLACEMENT_CONTENT = [
  {
    subject: 'Toán',
    items: ['Kiến thức theo chương trình lớp hiện tại', 'Tư duy logic và toán có lời văn', 'Cách trình bày bài giải'],
  },
  {
    subject: 'Khoa học',
    items: ['Khái niệm khoa học theo lớp', 'Kỹ năng quan sát, giải thích hiện tượng', 'Đọc hiểu thuật ngữ tiếng Anh'],
  },
  {
    subject: 'Tiếng Anh Cambridge',
    items: ['Từ vựng & ngữ pháp', 'Nghe – Đọc – Viết theo định dạng Cambridge', 'Nói trực tiếp với giáo viên'],
  },
];

export const PLACEMENT_STEPS = [
  { title: 'Đặt lịch', description: 'Phụ huynh điền form bên dưới, chọn ngày và khung giờ mong muốn.' },
  { title: 'Xác nhận lịch', description: 'Trung tâm gọi điện hoặc nhắn Zalo xác nhận trong vòng 24 giờ.' },
  // TODO: xác nhận thời lượng bài kiểm tra
  { title: 'Con làm bài', description: 'Con làm bài trực tiếp với giáo viên khoảng 45–60 phút.' },
  { title: 'Nhận kết quả & lộ trình', description: 'Giáo viên trao đổi kết quả và tư vấn lộ trình ngay trong buổi.' },
];

export const PLACEMENT_PREPARE = [
  'Bút chì, tẩy, thước kẻ (với môn Toán)',
  'Vở hoặc bài kiểm tra gần nhất trên lớp (nếu có)',
  'Nếu học online: máy tính/máy tính bảng có camera, micro và mạng ổn định',
  'Phụ huynh dành khoảng 15 phút cuối buổi để nghe tư vấn',
];

export const TRIAL_BENEFITS = [
  'Con trải nghiệm một buổi học thật với giáo viên và phương pháp của trung tâm',
  'Giáo viên nhận xét điểm mạnh, điểm cần cải thiện của con',
  'Phụ huynh được tư vấn lộ trình và lịch học phù hợp',
  'Không ràng buộc đăng ký sau buổi học thử',
];
