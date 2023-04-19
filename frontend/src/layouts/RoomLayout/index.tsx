import React from 'react';
import { Outlet } from 'react-router-dom';
import './RoomLayout.scss';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import ChatList from '@components/ChatList';

const RoomLayout = () => {
  return (
    <>
      <SidebarLeft>
        <ChatList />
      </SidebarLeft>
      <Outlet />
    </>
  );
};

export default RoomLayout;