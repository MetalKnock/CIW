import './styles/index.scss';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Header } from '@/widgets/Header';
import { Menu } from '@/widgets/Menu';
import { Main } from '@/pages/Main';
import { HEADER_BUTTONS, MENU_LIST } from '@/shared/constants/navigate';
import { StoreProvider } from './providers/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <MainLayout
        header={<Header buttons={HEADER_BUTTONS} />}
        menu={
          <Menu menuList={MENU_LIST} projectName='Название проекта' abbreviation='Аббревиатура' />
        }
      >
        <Main />
      </MainLayout>
    </StoreProvider>
  );
}
