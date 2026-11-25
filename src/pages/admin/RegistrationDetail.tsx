import { useState, type ReactNode } from 'react';
import { Loader2, MessageCircle, Phone, Trash2 } from 'lucide-react';
import { Drawer } from '../../components/ui/Drawer';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Button, ButtonAnchor } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import {
  deleteRegistration,
  LEVEL_LABELS,
  MODE_LABELS,
  STATUS_LABELS,
  TYPE_LABELS,
  updateRegistration,
  type Registration,
  type RegistrationStatus,
} from '../../lib/registrations';
import { subjectLabel } from '../../data/subjects';
import { formatPhoneDisplay, zaloLink } from '../../lib/phone';
import { formatDate, formatDateTime, TYPE_TONES } from './format';

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3 py-2.5">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium text-ink">{children || '—'}</dd>
    </div>
  );
}

export function RegistrationDetail({
  registration,
  onClose,
  onChanged,
}: {
  registration: Registration | null;
  onClose: () => void;
  onChanged: (patch: Partial<Registration> & { id: string }, deleted?: boolean) => void;
}) {
  const toast = useToast();
  const [note, setNote] = useState(registration?.admin_note ?? '');
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNote, setSavingNote] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!registration) return null;
  const r = registration;

  const changeStatus = async (status: RegistrationStatus) => {
    setSavingStatus(true);
    try {
      await updateRegistration(r.id, { status });
      onChanged({ id: r.id, status });
      toast('Đã cập nhật');
    } catch {
      toast('Cập nhật thất bại, vui lòng thử lại', 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  const saveNote = async () => {
    setSavingNote(true);
    try {
      const value = note.trim() || null;
      await updateRegistration(r.id, { admin_note: value });
      onChanged({ id: r.id, admin_note: value });
      toast('Đã lưu ghi chú');
    } catch {
      toast('Lưu ghi chú thất bại', 'error');
    } finally {
      setSavingNote(false);
    }
  };

  const doDelete = async () => {
    setDeleting(true);
    try {
      await deleteRegistration(r.id);
      setConfirmOpen(false);
      onChanged({ id: r.id }, true);
      toast('Đã xóa đăng ký');
      onClose();
    } catch {
      toast('Xóa thất bại, vui lòng thử lại', 'error');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Drawer
        open
        onClose={onClose}
        title="Chi tiết đăng ký"
        footer={
          <Button variant="ghost" className="w-full text-danger hover:bg-red-50" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="size-4" aria-hidden="true" /> Xóa đăng ký
          </Button>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={TYPE_TONES[r.type]}>{TYPE_LABELS[r.type]}</Badge>
          <span className="text-sm text-muted">{formatDateTime(r.created_at)}</span>
        </div>
        <p className="mt-3 text-xl font-bold text-ink">{r.parent_name}</p>
        <p className="text-muted">{formatPhoneDisplay(r.phone)}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ButtonAnchor href={`tel:${r.phone}`} variant="secondary" size="sm">
            <Phone className="size-4" aria-hidden="true" /> Gọi
          </ButtonAnchor>
          <ButtonAnchor href={zaloLink(r.phone)} target="_blank" rel="noopener noreferrer" size="sm">
            <MessageCircle className="size-4" aria-hidden="true" /> Zalo
          </ButtonAnchor>
        </div>

        <div className="mt-6">
          <label htmlFor="detail-status" className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
            Trạng thái
            {savingStatus && <Loader2 className="size-3.5 animate-spin text-brand-700" aria-hidden="true" />}
          </label>
          <select
            id="detail-status"
            className="input"
            value={r.status}
            disabled={savingStatus}
            onChange={(e) => changeStatus(e.target.value as RegistrationStatus)}
          >
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <dl className="mt-6 divide-y divide-line rounded-2xl border border-line px-4">
          <Row label="Học sinh">{r.student_name}</Row>
          <Row label="Lớp">{r.grade ? `Lớp ${r.grade}${r.school_level ? ` (${LEVEL_LABELS[r.school_level]})` : ''}` : null}</Row>
          <Row label="Trường">{r.school}</Row>
          <Row label="Môn">{r.subjects.length ? r.subjects.map(subjectLabel).join(', ') : null}</Row>
          <Row label="Hình thức">{r.learning_mode ? MODE_LABELS[r.learning_mode] : null}</Row>
          <Row label="Ngày mong muốn">{formatDate(r.preferred_date)}</Row>
          <Row label="Khung giờ">{r.preferred_time}</Row>
          <Row label="Ghi chú">{r.note && <span className="whitespace-pre-wrap">{r.note}</span>}</Row>
          <Row label="Cập nhật lúc">{formatDateTime(r.updated_at)}</Row>
        </dl>

        <div className="mt-6">
          <label htmlFor="detail-note" className="mb-2 block text-sm font-semibold text-ink">
            Ghi chú nội bộ
          </label>
          <textarea
            id="detail-note"
            rows={4}
            className="input resize-y"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="VD: Đã gọi lúc 10h, hẹn thứ 7 học thử..."
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm" onClick={saveNote} disabled={savingNote || (note.trim() || null) === r.admin_note}>
              {savingNote && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              Lưu ghi chú
            </Button>
          </div>
        </div>
      </Drawer>

      <Modal
        open={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        title="Xóa đăng ký này?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)} disabled={deleting}>
              Hủy
            </Button>
            <Button variant="danger" onClick={doDelete} disabled={deleting}>
              {deleting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              Xóa vĩnh viễn
            </Button>
          </>
        }
      >
        Đăng ký của <strong className="text-ink">{r.parent_name}</strong> sẽ bị xóa vĩnh viễn và không thể khôi phục.
      </Modal>
    </>
  );
}
