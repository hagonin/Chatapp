import React from 'react';
import Main from '@components/Main';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import ChatList from '@components/ChatList';

const ChatListPage: React.FC = () => {
  return (
    <>
      <SidebarLeft>
        <ChatList />
      </SidebarLeft>
      <Main title="Choosing a message to continue talking..." />
    </>
  );
};

export default ChatListPage;
