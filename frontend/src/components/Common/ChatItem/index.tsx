import React from 'react';
import './ChatItem.scss';
import { imgs } from '@utils/constants';
import { User } from '@context/roomContext';

interface Call {
  type: 'missed' | 'incoming' | 'outgoing';
  timestamp: string;
}
interface Props {
  id: number;
  avatar: string;
  name: string;
  message?: string;
  timestamp: string;
  quantity?: number;
  status?: 'sent' | 'delivered' | 'read';
  online?: boolean;
  lastseen?: string;
  call?: Call;
  tag?: boolean;
  onCall?: () => void;
  onChat?: (user: User) => void;
}
const ChatItem: React.FC<Props> = ({
  id,
  avatar,
  name,
  message,
  timestamp,
  quantity,
  status,
  online = false,
  lastseen,
  call,
  tag,
  onCall,
  onChat,
}) => {
  return (
    <div
      className={`userCard ${
        online ? 'userCard--online' : 'userCard--offline'
      }`}
      onClick={
        onChat
          ? () =>
              onChat({
                id,
                name,
                timestamp,
                avatar,
                messageList: [
                  {
                    message: 'Hello',
                    timestamp: '12:00',
                    type: 'partner',
                  },
                  {
                    message: 'How are you?',
                    timestamp: '12:01',
                    type: 'user',
                    status: 'sent',
                  },
                ],
              })
          : () => {}
      }
    >
      <div className="userCard__avatar">
        <img src={avatar} alt="user" />
      </div>
      <div className="userCard__content">
        <span className="userCard__name">{name}</span>
        {tag && <span className="userCard__tag">{`@${name}`}</span>}
        {message && <span className="userCard__message">{message}</span>}
        {lastseen && (
          <span className="userCard__message">{`last seen${lastseen}`}</span>
        )}
        {timestamp && <span className="userCard__timestamp">{timestamp}</span>}
        {call && (
          <span className={`userCard__call userCard__call--${call.type}`}>
            {call.timestamp}
          </span>
        )}
      </div>
      {quantity && <span className="userCard__quantity">{quantity}</span>}
      {status && (
        <span className="userCard__status">
          <img
            src={
              status === 'sent'
                ? imgs.sent
                : status === 'delivered'
                ? imgs.delivered
                : imgs.read
            }
            alt="icon"
          />
        </span>
      )}
      {call && (
        <img
          src={
            call.type === 'outgoing'
              ? imgs.phone1
              : call.type === 'incoming'
              ? imgs.phone2
              : imgs.phone3
          }
          alt="icon"
        />
      )}
      {onCall && (
        <button
          onClick={onCall}
          className="userCard__call-btn"
          title="make a call"
        >
          <img src={imgs.phone} alt="phone" />
        </button>
      )}
    </div>
  );
};

export default ChatItem;
