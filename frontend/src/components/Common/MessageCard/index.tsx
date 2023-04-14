import React from 'react';
import { imgs } from '@utils/constants';
import './MessageCard.scss';

interface Props {
  message: string;
  timestamp: string;
  type: 'user' | 'partner';
  status?: 'sent' | 'delivered' | 'read';
}
const MessageCard: React.FC<Props> = ({ message, timestamp, type, status }) => (
  <div
    className={`messageCard-wrapper ${
      type === 'user' ? `messageCard-wrapper--right` : ''
    }`}
  >
    <div className={`messageCard ${type ? `messageCard--${type}` : ''}`}>
      <span className="messageCard__message">{message}</span>
      <span className="messageCard__timestamp">
        {timestamp}
        {status && (
          <img
            src={
              status === 'sent'
                ? imgs.sent
                : status === 'delivered'
                ? imgs.delivered
                : imgs.read
            }
            alt="message status"
          />
        )}
      </span>
      <span className="messageCard__img">
        {type === 'partner' ? (
          <img src={imgs.messageCardIconWhite} alt="icon" />
        ) : (
          <img src={imgs.messageCardIconBlue} alt="icon" />
        )}
      </span>
    </div>
  </div>
);

export default MessageCard;
