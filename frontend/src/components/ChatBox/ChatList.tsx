import React from 'react';
import { MessageCard } from '@components/Common';
import { Props as MessageProps } from '@components/Common/MessageCard';

interface Props {
  list: MessageProps[];
}
const ChatList: React.FC<Props> = ({ list }) => (
  <>
    {list.length > 0
      ? list.map(item => (
          <MessageCard
            message={item.message}
            timestamp={item.timestamp}
            type={item.type}
          />
        ))
      : 'Make a conversion'}
  </>
);

export default ChatList;
