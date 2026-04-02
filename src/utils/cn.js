import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes cleanly resolving style conflicts natively
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
