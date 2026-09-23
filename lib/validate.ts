/** Accepts 10-digit Indian mobiles, optionally prefixed with +91 / 91 / 0; spaces or dashes allowed. */
export const normaliseMobile = (v: string) => {
  const digits = v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
