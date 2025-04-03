import { ConnectionZone } from '@features/global/components/connectionZone/connectionZone';
import {
  ConnectionZoneWrapper,
  LayoutWrapper,
} from '@global/components/layout/layout.styles';
import Sidebar from '@global/components/sidebar';
import useAppInitialization from '@global/hooks/useAppInitialization';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useAppInitialization();

  return (
    <LayoutWrapper>
      <ConnectionZoneWrapper>
        <ConnectionZone />
      </ConnectionZoneWrapper>
      <Sidebar />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
