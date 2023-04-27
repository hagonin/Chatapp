import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import HistoryList from '@components/HistoryList';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import Main from '@components/Main';

const HistoryLayout: React.FC = () => {
  return (
    <>
      <SidebarLeft hideOnMobile={true}>
        <HistoryList />
      </SidebarLeft>
      <Outlet />
    </>
  );
};

export default HistoryLayout;
