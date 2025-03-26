// "shadcn": Created by Shadcn Cli
// WARNING: This file is referenced by "components.json". Don't rename or move it

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
