import { UserInfoCard } from '@components/Common';
import HistoryCard from '@components/Common/HistoryCard';
import MessageForm from '@components/Form/MessageForm';
import HistoryList from '@components/HistoryList';
import Main from '@components/Main';
import MessageList from '@components/MessageList';
import { useRoomContext } from '@context/roomContext';
import { icons } from '@utils/constants';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const CallHistoryPage: React.FC = () => {
  const { user } = useRoomContext();
  const navigate = useNavigate();
  return (
    <Main title="There is not any history">
      {user?.historyList.length! > 0 ? (
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
            {/* <HistoryList list={user?.historyList!} /> */}
            {user?.historyList.map(item => (
              <HistoryCard
                key={item.id}
                id={item.id}
                timestamp={item.timestamp}
                type={item.type}
                date={item.date}
                time={item.time}
              />
            ))}
          </div>
        </>
      ) : null}
    </Main>
  );
};

export default CallHistoryPage;
