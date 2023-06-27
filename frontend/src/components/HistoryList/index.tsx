import React from 'react';
import { ChatItem } from '@components/Common';
import { callList } from '@store/dataFake';
import { useNavigate } from 'react-router-dom';

const HistoryList = () => {
  const navigate = useNavigate();
  return callList.length > 0 ? (
    <>
      {/* {callList.map(item => (
        <ChatItem
          key={item.id}
          id={item.id}
          avatar={item.avatar}
          name={item.name}
          status={item.status}
          timestamp={item.timestamp}
          history={{
            type: item.history?.type!,
            timestamp: item.history?.timestamp!,
            onWatchHistory: setUser,
          }}
        />
      ))} */}
    </>
  ) : (
    <span>Have no any conversation</span>
  );
};
export default HistoryList;
