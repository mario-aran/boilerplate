// WARNING: This file is referenced by "components.json". Don not rename or move
// "shadcn": Created by shadcn cli

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
