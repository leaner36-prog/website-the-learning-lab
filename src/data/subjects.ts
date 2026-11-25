import { Calculator, FlaskConical, Languages, type LucideIcon } from 'lucide-react';

// TODO: trung tâm rà soát lại cho khớp chương trình thực tế

export type SubjectSlug = 'toan' | 'khoa-hoc' | 'tieng-anh-cambridge';

export interface LevelContent {
  title: string;
  goals: string[];
  topics: string[];
  skills: string[];
  format: string[];
}

export interface Subject {
  slug: SubjectSlug;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  levels: { 1: LevelContent; 2: LevelContent };
  faq: { q: string; a: string }[];
}

export const SUBJECTS: Subject[] = [
  {
    slug: 'toan',
    name: 'Toán',
    shortName: 'Toán',
    icon: Calculator,
    tagline: 'Tư duy logic, tính toán chắc chắn',
    summary:
      'Củng cố kiến thức trên lớp, rèn tư duy logic và cách trình bày bài giải mạch lạc, làm quen thuật ngữ Toán bằng tiếng Anh.',
    levels: {
      1: {
        title: 'Cấp 1 (Lớp 1–5)',
        goals: [
          'Nắm chắc kiến thức Toán trên lớp theo từng tuần',
          'Tính nhanh, tính đúng, trình bày bài sạch đẹp',
          'Hình thành tư duy logic và thói quen tự kiểm tra kết quả',
        ],
        topics: [
          'Số học & các phép tính',
          'Phân số và số thập phân',
          'Hình học & đo lường',
          'Toán có lời văn',
          'Tư duy logic',
          'Làm quen thuật ngữ Toán bằng tiếng Anh',
        ],
        skills: ['Tính toán chính xác', 'Đọc hiểu đề bài', 'Lập luận từng bước', 'Tự tin trình bày'],
        format: ['Lớp nhỏ hoặc kèm 1-1', 'Bài tập về nhà vừa sức', 'Nhận xét sau mỗi buổi qua Zalo'],
      },
      2: {
        title: 'Cấp 2 (Lớp 6–9)',
        goals: [
          'Bám sát tiến độ và đề kiểm tra trên lớp',
          'Hiểu bản chất để giải được dạng bài mới',
          'Chuẩn bị vững vàng cho kiểm tra giữa kỳ, cuối kỳ',
        ],
        topics: [
          'Số hữu tỉ và số thực',
          'Biểu thức đại số',
          'Phương trình',
          'Hình học phẳng',
          'Thống kê & xác suất',
          'Ôn tập kiểm tra giữa kỳ, cuối kỳ',
        ],
        skills: ['Tư duy trừu tượng', 'Chứng minh & lập luận', 'Quản lý thời gian làm bài', 'Tự học'],
        format: ['Lớp nhỏ hoặc kèm 1-1', 'Đề luyện theo cấu trúc trên lớp', 'Báo cáo định kỳ cho phụ huynh'],
      },
    },
    faq: [
      {
        q: 'Con học Toán trên lớp bằng tiếng Anh, trung tâm có hỗ trợ không?',
        a: 'Có. Giáo viên giảng bằng tiếng Việt để con hiểu bản chất, đồng thời giới thiệu thuật ngữ tiếng Anh tương ứng để con tự tin trên lớp.',
      },
      {
        q: 'Con đã học khá, có cần học thêm không?',
        a: 'Với học sinh khá, lộ trình tập trung vào bài nâng cao và tư duy mở rộng thay vì lặp lại kiến thức đã vững.',
      },
      {
        q: 'Bao lâu thì thấy con tiến bộ?',
        a: 'Thông thường sau 4–6 tuần phụ huynh sẽ thấy rõ sự thay đổi trong điểm kiểm tra và sự tự tin của con.',
      },
    ],
  },
  {
    slug: 'khoa-hoc',
    name: 'Khoa học',
    shortName: 'Khoa học',
    icon: FlaskConical,
    tagline: 'Tò mò, quan sát, thí nghiệm',
    summary:
      'Học Khoa học qua câu hỏi, quan sát và thí nghiệm nhỏ; hiểu bản chất hiện tượng và rèn kỹ năng điều tra khoa học.',
    levels: {
      1: {
        title: 'Cấp 1 (Lớp 1–5)',
        goals: [
          'Hiểu các khái niệm khoa học cơ bản trên lớp',
          'Phát triển óc tò mò và kỹ năng quan sát',
          'Biết đặt câu hỏi và giải thích hiện tượng đơn giản',
        ],
        topics: [
          'Thực vật, động vật, cơ thể người',
          'Vật chất & vật liệu',
          'Lực, ánh sáng, âm thanh, điện',
          'Trái Đất & vũ trụ',
          'Kỹ năng điều tra khoa học: đặt câu hỏi, dự đoán, làm thí nghiệm, ghi kết quả',
        ],
        skills: ['Quan sát', 'Dự đoán', 'Ghi chép kết quả', 'Giải thích bằng lời'],
        format: ['Thí nghiệm nhỏ trên lớp', 'Phiếu học tập trực quan', 'Nhận xét sau mỗi buổi qua Zalo'],
      },
      2: {
        title: 'Cấp 2 (Lớp 6–9)',
        goals: [
          'Nắm vững Khoa học tự nhiên (Sinh – Hóa – Lý) trên lớp',
          'Vận dụng kiến thức vào bài tập và tình huống thực tế',
          'Trình bày lập luận khoa học chặt chẽ',
        ],
        topics: [
          'Tế bào',
          'Chất và phản ứng',
          'Lực và chuyển động',
          'Năng lượng',
          'Điện',
          'Kỹ năng thí nghiệm và trình bày lập luận khoa học',
        ],
        skills: ['Phân tích số liệu', 'Thiết kế thí nghiệm', 'Lập luận dựa trên bằng chứng', 'Tự học'],
        format: ['Lớp nhỏ hoặc kèm 1-1', 'Ôn tập theo chủ đề', 'Báo cáo định kỳ cho phụ huynh'],
      },
    },
    faq: [
      {
        q: 'Môn Khoa học có học thí nghiệm thật không?',
        a: 'Có, giáo viên sử dụng thí nghiệm nhỏ, an toàn và mô hình trực quan để con hiểu bản chất hiện tượng.',
      },
      {
        q: 'Trung tâm có dạy theo thuật ngữ tiếng Anh trên lớp không?',
        a: 'Giáo viên kết hợp thuật ngữ tiếng Anh tương ứng để con theo kịp nội dung học trên lớp.',
      },
      {
        q: 'Lên cấp 2 con học Khoa học tự nhiên như thế nào?',
        a: 'Nội dung được chia theo chủ đề Sinh – Hóa – Lý, bám tiến độ trên lớp và ôn tập trước các kỳ kiểm tra.',
      },
    ],
  },
  {
    slug: 'tieng-anh-cambridge',
    name: 'Tiếng Anh Cambridge',
    shortName: 'Tiếng Anh',
    icon: Languages,
    tagline: 'Tự tin 4 kỹ năng, chinh phục chứng chỉ',
    summary:
      'Phát triển đồng đều Nghe – Nói – Đọc – Viết, bám sát nội dung Tiếng Anh Cambridge trên lớp và luyện thi chứng chỉ Cambridge.',
    levels: {
      1: {
        title: 'Cấp 1 (Lớp 1–5)',
        goals: [
          'Theo kịp và nổi bật trong giờ Tiếng Anh trên lớp',
          'Phát âm chuẩn, tự tin giao tiếp',
          'Đạt mục tiêu Starters, Movers, Flyers',
        ],
        topics: [
          'Ngữ âm (phonics)',
          'Từ vựng & ngữ pháp nền tảng',
          '4 kỹ năng Nghe – Nói – Đọc – Viết',
          'Bám sát nội dung Tiếng Anh Cambridge trên lớp',
          'Luyện thi Starters, Movers, Flyers',
        ],
        skills: ['Phát âm', 'Nghe hiểu', 'Đọc hiểu', 'Viết câu & đoạn ngắn'],
        format: ['Lớp nhỏ, nhiều hoạt động nói', 'Đề luyện theo định dạng Cambridge', 'Nhận xét sau mỗi buổi qua Zalo'],
      },
      2: {
        title: 'Cấp 2 (Lớp 6–9)',
        goals: [
          'Sử dụng tiếng Anh học thuật trong các môn học',
          'Viết luận và thuyết trình mạch lạc',
          'Đạt A2 Key for Schools, B1 Preliminary for Schools',
        ],
        topics: [
          'Ngữ pháp và từ vựng học thuật',
          'Viết đoạn văn / bài luận',
          'Thuyết trình',
          'Luyện thi A2 Key for Schools',
          'Luyện thi B1 Preliminary for Schools',
        ],
        skills: ['Viết học thuật', 'Thuyết trình', 'Đọc hiểu văn bản dài', 'Chiến lược làm bài thi'],
        format: ['Lớp nhỏ hoặc kèm 1-1', 'Thi thử định kỳ', 'Báo cáo định kỳ cho phụ huynh'],
      },
    },
    faq: [
      {
        q: 'Con nên thi chứng chỉ Cambridge nào?',
        a: 'Sau buổi kiểm tra đầu vào, giáo viên sẽ tư vấn cấp độ phù hợp (Starters, Movers, Flyers, KET, PET) và thời điểm thi hợp lý.',
      },
      {
        q: 'Lớp học có giáo viên nước ngoài không?',
        a: 'TODO: trung tâm cập nhật thông tin đội ngũ giáo viên.',
      },
      {
        q: 'Con nhút nhát, ngại nói thì sao?',
        a: 'Lớp nhỏ giúp giáo viên tạo cơ hội để con nói nhiều hơn trong môi trường an toàn, từ đó tự tin dần.',
      },
      {
        q: 'Có thi thử theo định dạng Cambridge không?',
        a: 'Có, con được làm đề thi thử định kỳ và nhận nhận xét chi tiết từng kỹ năng.',
      },
    ],
  },
];

export const getSubject = (slug: string) => SUBJECTS.find((s) => s.slug === slug);

export const SUBJECT_OPTIONS = SUBJECTS.map((s) => ({ value: s.slug, label: s.name }));

export const subjectLabel = (slug: string) => getSubject(slug)?.name ?? slug;
