import React from 'react';
import { MessageCard } from '@components/Common';
import { Props as MessageProps } from '@components/Common/MessageCard';

interface Props {
  list: MessageProps[];
}
const MessageList: React.FC<Props> = ({ list }) => (
  <>
    {list.map(item => (
      <MessageCard
        key={item.id}
        id={item.id}
        message={item.message}
        timestamp={item.timestamp}
        type={item.type}
      />
    ))}
  </>
);

export default MessageList;
