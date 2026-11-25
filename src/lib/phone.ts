const PHONE_RE = /^(0|\+84)(3|5|7|8|9)\d{8}$/;

export const cleanPhone = (raw: string) => raw.replace(/[\s.\-()]/g, '');

export const isValidPhone = (raw: string) => PHONE_RE.test(cleanPhone(raw));

export const normalizePhone = (raw: string) => {
  const p = cleanPhone(raw);
  return p.startsWith('+84') ? '0' + p.slice(3) : p;
};

export const formatPhoneDisplay = (p: string) =>
  p.length === 10 ? `${p.slice(0, 4)} ${p.slice(4, 7)} ${p.slice(7)}` : p;

export const zaloLink = (p: string) => `https://zalo.me/${normalizePhone(p)}`;
