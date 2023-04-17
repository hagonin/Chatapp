import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';
import Navigate from '@components/Navigate';
import SidebarRight from '@components/Sidebar/SidebarRight';
import Main from '@components/Main';

const RootLayout: React.FC = () => {
  const [showSidebarRight, setShowSidebarRight] = React.useState(false);
  return (
    <div className="rootLayout__wrapper">
      <header className="rootLayout__header">Logo Talkie</header>
      <div className="rootLayout__body">
        <Navigate
          toggleSideBarRight={() => setShowSidebarRight(!showSidebarRight)}
        />
        {/* SideBar Left */}
        <Outlet />
        <Main />
        <SidebarRight
          isActive={showSidebarRight}
          toggleSideBarRight={() => setShowSidebarRight(!showSidebarRight)}
        />
      </div>
    </div>
  );
};

export default RootLayout;
