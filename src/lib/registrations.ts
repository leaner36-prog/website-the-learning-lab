import { supabase } from './supabase';
import type { SchoolLevel } from '../config/site';

export type RegistrationType = 'hoc_thu' | 'kiem_tra_dau_vao' | 'tu_van';
export type RegistrationStatus =
  | 'moi'
  | 'da_lien_he'
  | 'da_xep_lich'
  | 'da_hoc_thu'
  | 'da_nhap_hoc'
  | 'huy';
export type LearningMode = 'truc_tiep' | 'online';

export interface Registration {
  id: string;
  created_at: string;
  updated_at: string;
  type: RegistrationType;
  parent_name: string;
  phone: string;
  student_name: string | null;
  grade: number | null;
  school_level: SchoolLevel | null;
  school: string | null;
  subjects: string[];
  learning_mode: LearningMode | null;
  preferred_date: string | null;
  preferred_time: string | null;
  note: string | null;
  status: RegistrationStatus;
  admin_note: string | null;
}

export type RegistrationInput = Omit<
  Registration,
  'id' | 'created_at' | 'updated_at' | 'status' | 'admin_note'
>;

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  moi: 'Mới',
  da_lien_he: 'Đã liên hệ',
  da_xep_lich: 'Đã xếp lịch',
  da_hoc_thu: 'Đã học thử / kiểm tra',
  da_nhap_hoc: 'Đã nhập học',
  huy: 'Hủy',
};

export const TYPE_LABELS: Record<RegistrationType, string> = {
  hoc_thu: 'Học thử',
  kiem_tra_dau_vao: 'Kiểm tra đầu vào',
  tu_van: 'Tư vấn',
};

export const LEVEL_LABELS: Record<SchoolLevel, string> = {
  tieu_hoc: 'Tiểu học',
  thcs: 'THCS',
};

export const MODE_LABELS: Record<LearningMode, string> = {
  truc_tiep: 'Tại trung tâm',
  online: 'Online',
};

export const PAGE_SIZE = 20;

const notReady = () => new Error('Supabase chưa được cấu hình');

export async function createRegistration(input: RegistrationInput) {
  if (!supabase) throw notReady();
  const { error } = await supabase.from('registrations').insert(input);
  if (error) throw error;
}

export interface ListParams {
  type?: RegistrationType | '';
  status?: RegistrationStatus | '';
  subject?: string;
  schoolLevel?: SchoolLevel | '';
  search?: string;
  page?: number;
}

function applyFilters<T extends { eq: Function; contains: Function; or: Function }>(
  query: T,
  { type, status, subject, schoolLevel, search }: ListParams,
): T {
  let q = query;
  if (type) q = q.eq('type', type);
  if (status) q = q.eq('status', status);
  if (schoolLevel) q = q.eq('school_level', schoolLevel);
  if (subject) q = q.contains('subjects', [subject]);
  const term = search?.trim().replace(/[,()*%\\]/g, ' ').trim();
  if (term) {
    q = q.or(`parent_name.ilike.*${term}*,student_name.ilike.*${term}*,phone.ilike.*${term}*`);
  }
  return q;
}

export async function listRegistrations(params: ListParams = {}) {
  if (!supabase) throw notReady();
  const page = Math.max(1, params.page ?? 1);
  const from = (page - 1) * PAGE_SIZE;
  const base = supabase
    .from('registrations')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });
  const { data, error, count } = await applyFilters(base, params).range(from, from + PAGE_SIZE - 1);
  if (error) throw error;
  return { data: (data ?? []) as Registration[], count: count ?? 0 };
}

export async function listAllRegistrations(params: ListParams = {}) {
  if (!supabase) throw notReady();
  const rows: Registration[] = [];
  const chunk = 1000;
  for (let from = 0; ; from += chunk) {
    const base = supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    const { data, error } = await applyFilters(base, params).range(from, from + chunk - 1);
    if (error) throw error;
    rows.push(...((data ?? []) as Registration[]));
    if (!data || data.length < chunk) break;
  }
  return rows;
}

export interface RegistrationStats {
  total: number;
  moi: number;
  daXepLich: number;
  daNhapHoc: number;
  today: number;
}

export async function getRegistrationStats(): Promise<RegistrationStats> {
  if (!supabase) throw notReady();
  const sb = supabase;
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const count = async (build: (q: any) => any) => {
    const { count: c, error } = await build(
      sb.from('registrations').select('id', { count: 'exact', head: true }),
    );
    if (error) throw error;
    return (c as number) ?? 0;
  };
  const [total, moi, daXepLich, daNhapHoc, today] = await Promise.all([
    count((q) => q),
    count((q) => q.eq('status', 'moi')),
    count((q) => q.eq('status', 'da_xep_lich')),
    count((q) => q.eq('status', 'da_nhap_hoc')),
    count((q) => q.gte('created_at', startOfToday.toISOString())),
  ]);
  return { total, moi, daXepLich, daNhapHoc, today };
}

export async function updateRegistration(
  id: string,
  patch: { status?: RegistrationStatus; admin_note?: string | null },
) {
  if (!supabase) throw notReady();
  const { error } = await supabase.from('registrations').update(patch).eq('id', id);
  if (error) throw error;
}

export async function deleteRegistration(id: string) {
  if (!supabase) throw notReady();
  const { error } = await supabase.from('registrations').delete().eq('id', id);
  if (error) throw error;
}
