import React from 'react';

import { useRoomContext } from '@context/roomContext';
import { chatList } from '@store/dataFake';

import Main from '@components/Main';
import ChatBox from '@components/ChatBox';
import { ChatItem, UserInfoCard } from '@components/Common';
import SidebarLeft from '@components/Sidebar/SidebarLeft';

const ChatList: React.FC = () => {
  const { user, setUser } = useRoomContext();
  return (
    <>
      <SidebarLeft>
        {chatList.length > 0 ? (
          chatList.map(item => (
            <ChatItem
              key={item.id}
              id={item.id}
              name={item.name}
              avatar={item.avatar}
              timestamp={item.timestamp}
              status={item.status}
              message={{
                message: item.message?.message!,
                timestamp: item.message?.timestamp!,
                type: item.message?.type!,
                onChat: setUser,
                isActive: item.id === (user?.id as number),
              }}
            />
          ))
        ) : (
          <span>Have no conversation at all</span>
        )}
      </SidebarLeft>

      {user?.messageList ? (
        <ChatBox
          userInfo={{
            name: user.name,
            avatar: user.avatar,
            timestamp: user.timestamp,
          }}
          chatlist={user.messageList}
        />
      ) : (
        <Main title="Choosing a message to continue talking..." />
      )}
    </>
  );
};

export default ChatList;
