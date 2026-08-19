import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: classValue[]) {
  return twMerge(clsx(inputs));
}
