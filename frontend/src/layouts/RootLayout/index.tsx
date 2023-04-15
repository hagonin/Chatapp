import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';
import Navigate from '@components/Navigate';
import SidebarRight from '@components/Sidebar/SidebarRight';

const RootLayout: React.FC = () => {
  return (
    <div className="rootLayout__wrapper">
      <header className="rootLayout__header">Logo Talkie</header>
      <div className="rootLayout__body">
        <Navigate />
        <Outlet/>
        <SidebarRight />
      </div>
    </div>
  );
};

export default RootLayout;
