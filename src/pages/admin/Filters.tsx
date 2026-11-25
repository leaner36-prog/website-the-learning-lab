import { Download, Loader2, RefreshCw, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { LEVEL_LABELS, STATUS_LABELS, TYPE_LABELS, type ListParams } from '../../lib/registrations';
import { SUBJECT_OPTIONS } from '../../data/subjects';

export type FilterState = Required<Omit<ListParams, 'page'>>;

function Select({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Record<string, string>;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </label>
      <select id={id} className="input py-2.5 text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Tất cả</option>
        {Object.entries(options).map(([k, v]) => (
          <option key={k} value={k}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Filters({
  value,
  searchInput,
  onSearchInput,
  onChange,
  onRefresh,
  onExport,
  refreshing,
  exporting,
}: {
  value: FilterState;
  searchInput: string;
  onSearchInput: (v: string) => void;
  onChange: (patch: Partial<FilterState>) => void;
  onRefresh: () => void;
  onExport: () => void;
  refreshing: boolean;
  exporting: boolean;
}) {
  const subjectOptions = Object.fromEntries(SUBJECT_OPTIONS.map((s) => [s.value, s.label]));
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <label htmlFor="f-search" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
            Tìm kiếm
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="f-search"
              type="search"
              className="input py-2.5 pl-9 text-sm"
              placeholder="Tên phụ huynh, học sinh, SĐT"
              value={searchInput}
              onChange={(e) => onSearchInput(e.target.value)}
            />
          </div>
        </div>
        <Select id="f-type" label="Loại" value={value.type} onChange={(v) => onChange({ type: v as FilterState['type'] })} options={TYPE_LABELS} />
        <Select id="f-status" label="Trạng thái" value={value.status} onChange={(v) => onChange({ status: v as FilterState['status'] })} options={STATUS_LABELS} />
        <Select id="f-subject" label="Môn" value={value.subject} onChange={(v) => onChange({ subject: v })} options={subjectOptions} />
        <Select id="f-level" label="Cấp" value={value.schoolLevel} onChange={(v) => onChange({ schoolLevel: v as FilterState['schoolLevel'] })} options={LEVEL_LABELS} />
      </div>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <Button variant="secondary" size="sm" onClick={onRefresh} disabled={refreshing}>
          <RefreshCw className={`size-4 ${refreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
          Làm mới
        </Button>
        <Button size="sm" onClick={onExport} disabled={exporting}>
          {exporting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Download className="size-4" aria-hidden="true" />}
          Xuất CSV
        </Button>
      </div>
    </div>
  );
}
