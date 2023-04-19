import React from 'react';
import { useRoomContext } from '@context/roomContext';
import ChatBox from '@components/ChatBox';
import Main from '@components/Main';
const ChatRoom = () => {
  const { user, setUser } = useRoomContext();
  return (
    <Main>
      {user?.messageList && (
        <ChatBox
          userInfo={{
            name: user.name,
            avatar: user.avatar,
            timestamp: user.timestamp,
          }}
          chatlist={user.messageList}
        />
      )}
    </Main>
  );
};
export default ChatRoom;
