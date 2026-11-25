import {
  ClipboardCheck,
  Route,
  BookOpenCheck,
  LineChart,
  Lightbulb,
  MessagesSquare,
  Users,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';

export interface MethodItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const METHOD_STEPS: MethodItem[] = [
  {
    icon: ClipboardCheck,
    title: 'Kiểm tra đầu vào',
    description: 'Đánh giá kiến thức, kỹ năng và cách học của con.',
  },
  {
    icon: Route,
    title: 'Thiết kế lộ trình riêng',
    description: 'Mục tiêu theo từng tháng, bám sát tiến độ trên lớp.',
  },
  {
    icon: BookOpenCheck,
    title: 'Học & luyện tập',
    description: 'Củng cố bài trên lớp, mở rộng và nâng cao theo năng lực.',
  },
  {
    icon: LineChart,
    title: 'Theo dõi & báo cáo',
    description: 'Nhận xét sau mỗi buổi, báo cáo định kỳ cho phụ huynh qua Zalo.',
  },
];

export const METHOD_PRINCIPLES: MethodItem[] = [
  {
    icon: Lightbulb,
    title: 'Hiểu bản chất thay vì học thuộc',
    description: 'Con hiểu “vì sao” trước khi luyện “làm thế nào”, nhờ đó giải được cả dạng bài mới.',
  },
  {
    icon: MessagesSquare,
    title: 'Học chủ động',
    description: 'Học qua câu hỏi, thực hành và thí nghiệm để con tự khám phá kiến thức.',
  },
  {
    icon: Users,
    title: 'Lớp nhỏ, theo sát từng con',
    description: 'Sĩ số nhỏ hoặc kèm 1-1 giúp giáo viên nắm rõ điểm mạnh, điểm yếu của mỗi con.',
  },
  {
    icon: HeartHandshake,
    title: 'Phối hợp chặt chẽ với phụ huynh',
    description: 'Phụ huynh luôn nắm được con học gì, tiến bộ ra sao và cần hỗ trợ ở đâu.',
  },
];
