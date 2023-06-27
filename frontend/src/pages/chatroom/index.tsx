import React from 'react';
import { useNavigate } from 'react-router-dom';
import { icons } from '@utils/constants';
import Main from '@components/Main';
import { UserInfoCard } from '@components/Common';
import MessageForm from '@container/MessageForm';
import MessageList from '@components/MessageList';

const ChatRoom = () => {
  const navigate = useNavigate();
  return (
    <Main title="There is not any conversation">
      {/* {user?.messageList.length! > 0 ? (
        <>
          <header className="main__header">
            <button
              className="main__btn-arrow"
              onClick={() => navigate('/chatroom/chat-list')}
            >
              <img src={icons.leftArrow} alt="left-arrow" />
            </button>
            <UserInfoCard
              name={user?.name!}
              avatar={user?.avatar!}
              timestamp={user?.timestamp}
            />
          </header>

          <div className="main__container scrollbar">
            <MessageList list={user?.messageList!} />
          </div>
          <div className="main__footer">
            <MessageForm />
          </div>
        </>
      ) : null} */}
    </Main>
  );
};
export default ChatRoom;
