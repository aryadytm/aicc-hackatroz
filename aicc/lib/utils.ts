import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeToASCII(text: string) {
  // Replace any non-ASCII characters with an empty string
  return text.replace(/[^\x00-\x7F]/g, "");
}