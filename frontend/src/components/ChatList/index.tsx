import React from 'react';
import { useRoomContext } from '@context/roomContext';
import { chatList } from '@store/dataFake';
import { ChatItem } from '@components/Common';

const ChatList = () => {
  const { user, setUser } = useRoomContext();
  return (
    <>
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
    </>
  );
};

export default ChatList;
