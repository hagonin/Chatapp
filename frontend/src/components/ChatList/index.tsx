import React from 'react';
import { chatList } from '@store/dataFake';
import { ChatItem } from '@components/Common';

const ChatList = () => {
  return (
    <>
      {chatList.length > 0 ? null : (
        // chatList.map(item => (
        //   <ChatItem
        //     key={item.id}
        //     id={item.id}
        //     name={item.name}
        //     avatar={item.avatar}
        //     timestamp={item.timestamp}
        //     status={item.status}
        //     message={{
        //       message: item.message?.message!,
        //       timestamp: item.message?.timestamp!,
        //       type: item.message?.type!,
        //       onChatting: setUser,
        //       isActive: item.id === (user?.id as number),
        //     }}
        //   />
        // ))
        <span>Have no conversation at all</span>
      )}
    </>
  );
};

export default ChatList;
