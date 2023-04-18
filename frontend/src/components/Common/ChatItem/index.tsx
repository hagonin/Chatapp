import React from 'react';
import './ChatItem.scss';
import { imgs } from '@utils/constants';
import { Props } from './type';

const ChatItem: React.FC<Props> = ({
  id,
  avatar,
  name,
  status,
  timestamp,
  message,
  call,
  history,
}) => {
  return (
    <div
      className={`userCard ${
        status ? 'userCard--online' : 'userCard--offline'
      } ${message?.onChat ? 'userCard--click' : ''} ${
        message?.isActive ? 'userCard--active' : ''
      }`}
      onClick={
        message
          ? () => {
              message.onChat?.({
                id: id,
                name: name,
                timestamp: timestamp as string,
                messageList: [],
                avatar: avatar,
              });
            }
          : () => {}
      }
    >
      <div className="userCard__avatar">
        <img src={avatar} alt="user" />
      </div>
      <div className="userCard__content">
        <span className="userCard__name">{name}</span>
        {message && (
          <span className="userCard__message">{message.message}</span>
        )}
        {call && timestamp && (
          <span className="userCard__timestamp">{`last seen at ${timestamp}`}</span>
        )}
        {message && (
          <span className="userCard__message-timestamp">{`${message.timestamp}`}</span>
        )}
        {history && (
          <span
            className={`userCard__history userCard__history--${history.type}`}
          >
            {history.timestamp}
          </span>
        )}
      </div>
      {message?.type.status === 'to' && (
        <span className="userCard__quantity">{message.type.quanlity}</span>
      )}
      {message && !(message?.type.status === 'to') && (
        <span className="userCard__status">
          <img
            src={
              message?.type.status === 'sent'
                ? imgs.sent
                : message?.type.status === 'delivered'
                ? imgs.delivered
                : imgs.read
            }
            alt="icon"
          />
        </span>
      )}
      {history && (
        <img
          src={
            history.type === 'outgoing'
              ? imgs.phone1
              : history.type === 'incoming'
              ? imgs.phone2
              : imgs.phone3
          }
          alt="icon"
        />
      )}
      {call && (
        <button
          onClick={call?.onCall}
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
