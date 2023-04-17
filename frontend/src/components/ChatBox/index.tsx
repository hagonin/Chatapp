import React from 'react';
import MessageForm from '@components/Form/MessageForm';
import { useRoomContext } from '@context/roomContext';
import ChatList from './ChatList';
import { UserInfoCard } from '@components/Common';

const ChatBox: React.FC = () => {
  const { user } = useRoomContext();
  return user ? (
    <>
      <header className="rootLayout__main-header">
        <UserInfoCard
          name={user.name}
          avatar={user.avatar}
          tag={user.name}
          timestamp={user.timestamp}
        />
      </header>
      <div className="rootLayout__main-container scrollbar">
        <ChatList list={user.messageList} />
      </div>
      <div className="rootLayout__main-footer">
        <MessageForm />
      </div>
    </>
  ) : (
    <p className="rootLayout__main-message">
      Select a friend to make conversation
    </p>
  );
};

export default ChatBox;
