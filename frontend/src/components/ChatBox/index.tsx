import React from 'react';
import MessageForm from '@components/Form/MessageForm';
import { useRoomContext } from '@context/roomContext';
import ChatList from './ChatList';
import { UserInfoCard } from '@components/Common';
import { Props as MessageProps } from '@components/Common/MessageCard';
import { UserInfoCardProp } from '@components/Common/UserInfoCard';
import Main from '@components/Main';

interface Props {
  chatlist: MessageProps[];
  userInfo: UserInfoCardProp;
}

const ChatBox: React.FC<Props> = ({ userInfo, chatlist }) => {
  return (
    <Main>
      <header className="rootLayout__main-header">
        <UserInfoCard
          name={userInfo.name}
          avatar={userInfo.avatar}
          timestamp={userInfo.timestamp}
        />
      </header>
      <div className="rootLayout__main-container scrollbar">
        <ChatList list={chatlist} />
      </div>
      <div className="rootLayout__main-footer">
        <MessageForm />
      </div>
    </Main>
  );
};

export default ChatBox;
