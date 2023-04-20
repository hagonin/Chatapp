import React from 'react';
import './UserInfoCard.scss';

export interface UserInfoCardProp {
  name: string;
  avatar: string;
  phone?: string;
  timestamp?: string;
  smallCard?: boolean;
}
const UserInfoCard: React.FC<UserInfoCardProp> = ({
  name,
  avatar,
  phone,
  timestamp,
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
        {timestamp && (
          <span className="userAreaCard__subtitle">{`Last seen at ${timestamp}`}</span>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
