import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  return (
    <div
      className={`userCard ${
        status ? 'userCard--online' : 'userCard--offline'
      } ${message?.onChatting ? 'userCard--click' : ''} ${
        message?.isActive ? 'userCard--active' : ''
      }`}
      onClick={
        message
          ? () => {
              message.onChatting?.({
                id: id,
                name: name,
                timestamp: timestamp as string,
                messageList: [],
                historyList: [],
                avatar: avatar,
              });
              navigate(`/chatroom/chat-list/${id}`);
            }
          : history
          ? () => {
              history.onWatchHistory?.({
                id: id,
                name: name,
                timestamp: timestamp as string,
                messageList: [],
                historyList: [],
                avatar: avatar,
              });
            navigate(`/chatroom/call-history/${id}`);
            }
          : () => {}
      }
    >
      <div className="userCard__avatar">
        <img src={avatar} alt="user" />
      </div>
      <div className="userCard__content">
        <div className="userCard__name-wrapper">
          <span className="userCard__name">{name}</span>
          {message && (
            <span className="userCard__message-timestamp userCard__message-timestamp--mobile">{`${message.timestamp}`}</span>
          )}
        </div>
        <div className="userCard__message-wrapper">
          {message && (
            <span className="userCard__message">{message.message}</span>
          )}
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
        </div>
        {call && timestamp && (
          <span className="userCard__timestamp">{`Last seen at ${timestamp}`}</span>
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
