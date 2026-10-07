import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn's class helper: clsx joins conditional classes, twMerge resolves Tailwind
// conflicts so a later class wins (e.g. `bg-muted` + `bg-surface-raised` → `bg-surface-raised`).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
