import React from 'react';
import { imgs } from '@utils/constants';

import { ChatItem, UserInfoCard } from '@components/Common';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import { useRoomContext } from '@context/roomContext';

const ChatList: React.FC = () => {
  const { setUser } = useRoomContext();
  // chatlist from authenUser
  const chatlist = [
    {
      id: 0,
      name: 'Ahmet Kadyrow',
      avatar: imgs.user2,
      message: 'Men ertir size barýan...',
      timestamp: '12:00',
      status: 'read',
    },
    {
      id: 1,
      name: 'Ahmet Kadyrow11',
      avatar: imgs.user2,
      message: 'Men ertir size barýan sssss...',
      timestamp: '12:00',
      status: 'sent',
    },
  ];
  return (
    <SidebarLeft>
      {chatlist?.map(item => (
        <ChatItem
          id={item.id}
          name={item.name}
          avatar={item.avatar}
          message={item.message}
          timestamp={item.timestamp}
          status={item.status as 'read' | 'sent' | 'delivered' | undefined}
          onChat={setUser}
        />
      ))}
    </SidebarLeft>
  );
};

export default ChatList;
