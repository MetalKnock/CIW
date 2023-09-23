import { ReactNode } from 'react';

export interface MenuItem {
  icon: ReactNode;
  title: string;
  isActive: boolean;
}

export type HeaderButton = Omit<MenuItem, 'icon'>;
