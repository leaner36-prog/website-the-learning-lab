import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSubject } from '../data/subjects';
import type { RegistrationDefaults } from '../components/RegistrationForm';

export function useFormDefaults(): RegistrationDefaults {
  const [params] = useSearchParams();
  const mon = params.get('mon');
  const cap = params.get('cap');
  return useMemo(() => {
    const d: RegistrationDefaults = {};
    if (mon && getSubject(mon)) d.subjects = [mon];
    if (cap === '1' || cap === '2') d.level = Number(cap) as 1 | 2;
    return d;
  }, [mon, cap]);
}
