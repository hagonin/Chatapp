import React from 'react';
import './UserCard.scss';
import { imgs } from '@utils/constants';

interface Call {
  type: 'missed' | 'incoming' | 'outgoing';
  timestamp: string;
}
interface Props {
  avatar: string;
  name: string;
  message?: string;
  timestamp?: string;
  quantity?: number;
  status?: 'sent' | 'delivered' | 'read';
  online?: boolean;
  lastseen?: string;
  typeCard?: 'small' | 'lg';
  call?: Call;
}
const UserCard: React.FC<Props> = ({
  avatar,
  name,
  message,
  timestamp,
  quantity,
  status,
  online = false,
  lastseen,
  call,
}) => {
  return (
    <div
      className={`userCard ${
        online ? 'userCard--online' : 'userCard--offline'
      }`}
    >
      <div className="userCard__avatar">
        <img src={avatar} alt="user" />
      </div>
      <div className="userCard__content">
        <span className="userCard__name">{name}</span>
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
    </div>
  );
};

export default UserCard;
