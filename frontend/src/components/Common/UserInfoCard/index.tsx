import React from 'react';
import './UserInfoCard.scss';

interface Props {
  name: string;
  avatar: string;
  phone?: string;
  timestamp?: string;
  tag?: string;
  smallCard?: boolean;
}
const UserInfoCard: React.FC<Props> = ({
  name,
  avatar,
  phone,
  timestamp,
  tag,
  smallCard,
}) => {
  return (
    <div className="userAreaCard">
      <div
        className={`userAreaCard__avatar ${
          smallCard ? 'userAreaCard__avatar--small' : ''
        }`}
      >
        <img src={avatar} alt="avatar" />
      </div>
      <div className="userAreaCard__content">
        <h4>{name}</h4>
        {phone && <span className="userAreaCard__subtitle">{phone}</span>}
        {tag && <span className="userAreaCard__subtitle">{`@${tag}`}</span>}
        {timestamp && (
          <span className="userAreaCard__subtitle">{`Last seen at ${timestamp}`}</span>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
