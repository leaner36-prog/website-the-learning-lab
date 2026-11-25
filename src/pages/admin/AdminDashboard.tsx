import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { AlertTriangle, ChevronLeft, ChevronRight, ExternalLink, Inbox, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Logo } from '../../components/layout/Logo';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { supabase } from '../../lib/supabase';
import {
  getRegistrationStats,
  listAllRegistrations,
  listRegistrations,
  LEVEL_LABELS,
  MODE_LABELS,
  PAGE_SIZE,
  STATUS_LABELS,
  TYPE_LABELS,
  type Registration,
} from '../../lib/registrations';
import { subjectLabel } from '../../data/subjects';
import { downloadCSV, toCSV } from '../../lib/csv';
import { useSession } from './AdminGuard';
import { StatsCards } from './StatsCards';
import { Filters, type FilterState } from './Filters';
import { ListSkeleton, RegistrationList } from './RegistrationList';
import { RegistrationDetail } from './RegistrationDetail';
import { formatDate, formatDateTime } from './format';

const EMPTY_FILTERS: FilterState = { type: '', status: '', subject: '', schoolLevel: '', search: '' };

export default function AdminDashboard() {
  usePageMeta('Quản trị đăng ký');
  const session = useSession();
  const toast = useToast();
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setFilters((f) => (f.search === searchInput ? f : { ...f, search: searchInput }));
      setPage(1);
    }, 300);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  const list = useSWR(['registrations', filters, page], () => listRegistrations({ ...filters, page }), {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });
  const stats = useSWR('registration-stats', getRegistrationStats, { revalidateOnFocus: false });

  const { mutate: mutateList } = list;
  const { mutate: mutateStats } = stats;

  useEffect(() => {
    if (!supabase) return;
    const sb = supabase;
    const channel = sb
      .channel('registrations-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'registrations' }, (payload) => {
        if (payload.eventType === 'INSERT') toast('Có đăng ký mới');
        mutateList();
        mutateStats();
      })
      .subscribe();
    return () => {
      sb.removeChannel(channel);
    };
  }, [mutateList, mutateStats, toast]);

  const rows = list.data?.data ?? [];
  const total = list.data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const selected = rows.find((r) => r.id === selectedId) ?? null;

  const changeFilters = (patch: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...patch }));
    setPage(1);
  };

  const refresh = () => {
    mutateList();
    mutateStats();
  };

  const onChanged = (patch: Partial<Registration> & { id: string }, deleted?: boolean) => {
    mutateList(
      (prev) =>
        prev && {
          count: deleted ? prev.count - 1 : prev.count,
          data: deleted ? prev.data.filter((r) => r.id !== patch.id) : prev.data.map((r) => (r.id === patch.id ? { ...r, ...patch } : r)),
        },
      { revalidate: true },
    );
    mutateStats();
  };

  const exportCSV = async () => {
    setExporting(true);
    try {
      const all = await listAllRegistrations(filters);
      const headers = [
        'Thời gian', 'Loại', 'Trạng thái', 'Phụ huynh', 'SĐT', 'Học sinh', 'Lớp', 'Cấp', 'Trường', 'Môn',
        'Hình thức', 'Ngày mong muốn', 'Khung giờ', 'Ghi chú', 'Ghi chú nội bộ',
      ];
      const data = all.map((r) => [
        formatDateTime(r.created_at),
        TYPE_LABELS[r.type],
        STATUS_LABELS[r.status],
        r.parent_name,
        r.phone,
        r.student_name,
        r.grade,
        r.school_level ? LEVEL_LABELS[r.school_level] : '',
        r.school,
        r.subjects.map(subjectLabel).join('; '),
        r.learning_mode ? MODE_LABELS[r.learning_mode] : '',
        formatDate(r.preferred_date),
        r.preferred_time,
        r.note,
        r.admin_note,
      ]);
      const stamp = new Date().toISOString().slice(0, 10);
      downloadCSV(`dang-ky-the-learning-lab-${stamp}.csv`, toCSV(headers, data));
      toast(`Đã xuất ${all.length} bản ghi`);
    } catch {
      toast('Xuất CSV thất bại', 'error');
    } finally {
      setExporting(false);
    }
  };

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 sm:inline">
              Quản trị
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm text-muted md:inline">{session?.user.email}</span>
            <Link
              to="/"
              target="_blank"
              className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-alt hover:text-ink sm:inline-flex"
            >
              Xem website <ExternalLink className="size-3.5" aria-hidden="true" />
            </Link>
            <Button variant="secondary" size="sm" onClick={() => supabase?.auth.signOut()}>
              <LogOut className="size-4" aria-hidden="true" /> Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="container-page space-y-6 py-6 md:py-8">
        <h1 className="text-2xl font-extrabold text-ink md:text-3xl">Danh sách đăng ký</h1>

        <StatsCards stats={stats.data} />

        <Filters
          value={filters}
          searchInput={searchInput}
          onSearchInput={setSearchInput}
          onChange={changeFilters}
          onRefresh={refresh}
          onExport={exportCSV}
          refreshing={list.isValidating}
          exporting={exporting}
        />

        <section aria-label="Kết quả" aria-busy={list.isLoading}>
          {list.error && !list.data ? (
            <div role="alert" className="flex flex-col items-center rounded-2xl border border-red-200 bg-white p-10 text-center shadow-soft">
              <AlertTriangle className="size-8 text-danger" aria-hidden="true" />
              <p className="mt-3 font-semibold text-ink">Không tải được danh sách đăng ký</p>
              <p className="mt-1 text-sm text-muted">Vui lòng kiểm tra kết nối và thử lại.</p>
              <Button className="mt-5" onClick={refresh}>
                Thử lại
              </Button>
            </div>
          ) : list.isLoading && !list.data ? (
            <ListSkeleton />
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-white p-12 text-center">
              <Inbox className="size-10 text-brand-200" aria-hidden="true" />
              <p className="mt-3 font-semibold text-ink">{hasFilters ? 'Không có kết quả phù hợp' : 'Chưa có đăng ký nào'}</p>
              <p className="mt-1 text-sm text-muted">
                {hasFilters ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.' : 'Đăng ký mới từ website sẽ hiển thị tại đây.'}
              </p>
              {hasFilters && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setSearchInput('');
                    setFilters(EMPTY_FILTERS);
                    setPage(1);
                  }}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          ) : (
            <>
              <RegistrationList rows={rows} onOpen={(r) => setSelectedId(r.id)} />
              <nav
                aria-label="Phân trang"
                className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row"
              >
                <p>
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} / {total} bản ghi
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="size-4" aria-hidden="true" /> Trước
                  </Button>
                  <span className="px-2 font-semibold text-ink">
                    Trang {page}/{totalPages}
                  </span>
                  <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                    Sau <ChevronRight className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </nav>
            </>
          )}
        </section>
      </main>

      {selected && (
        <RegistrationDetail
          key={selected.id}
          registration={selected}
          onClose={() => setSelectedId(null)}
          onChanged={onChanged}
        />
      )}
    </>
  );
}
