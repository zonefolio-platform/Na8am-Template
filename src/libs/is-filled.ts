// src/libs/is-filled.ts
// Returns true only when a value has meaningful content.
// Any empty string, null, undefined, empty array, or zero returns false.

export function isFilled(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (typeof v === "number") return v > 0;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}
