import { ReactComponent as NavigationIcon } from '@/shared/assets/icons/navigation.svg';
import { HeaderButton, MenuItem } from '@/shared/types/menu';

export const MENU_LIST: MenuItem[] = [
  { icon: <NavigationIcon />, title: 'По проекту', isActive: false },
  { icon: <NavigationIcon />, title: 'Объекты', isActive: false },
  { icon: <NavigationIcon />, title: 'РД', isActive: false },
  { icon: <NavigationIcon />, title: 'МТО', isActive: false },
  { icon: <NavigationIcon />, title: 'СМР', isActive: true },
  { icon: <NavigationIcon />, title: 'График', isActive: false },
  { icon: <NavigationIcon />, title: 'МиМ', isActive: false },
  { icon: <NavigationIcon />, title: 'Рабочие', isActive: false },
  { icon: <NavigationIcon />, title: 'Капвложения', isActive: false },
  { icon: <NavigationIcon />, title: 'Бюджет', isActive: false },
  { icon: <NavigationIcon />, title: 'Финансирование', isActive: false },
  { icon: <NavigationIcon />, title: 'Панорамы', isActive: false },
  { icon: <NavigationIcon />, title: 'Камеры', isActive: false },
  { icon: <NavigationIcon />, title: 'Поручения', isActive: false },
  { icon: <NavigationIcon />, title: 'Контрагенты', isActive: false },
];

export const HEADER_BUTTONS: HeaderButton[] = [
  { title: 'Просмотр', isActive: true },
  { title: 'Управление', isActive: false },
];
