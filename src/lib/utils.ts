type ClassValue = string | number | null | boolean | undefined;

/**
 * Lightweight className combiner (avoids pulling in clsx/tailwind-merge as a dependency).
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Strips control characters and collapses whitespace. Used to sanitize
 * free-text fields before they are persisted.
 */
export function sanitizeText(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .replace(/\s{2,}/g, " ");
}

/**
 * Normalizes a Nigerian-style phone number by removing spaces, dashes,
 * and parentheses while preserving a leading "+".
 */
export function sanitizePhone(value: string): string {
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  return hasPlus ? `+${digits}` : digits;
}
