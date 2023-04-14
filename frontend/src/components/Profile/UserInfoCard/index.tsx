import React from 'react';
import './UserInforCard.scss';

interface Props {
  icon: string;
  label: string;
  content: string;
}
const UserInfoCard: React.FC<Props> = ({ icon, label, content }) => (
  <div className="userCardInfo limit">
    <img src={icon} alt="user icon" className="userCardInfo__icon" />
    <span className="userCardInfo__label">{label}</span>
    <span className="userCardInfo__content">{content}</span>
  </div>
);

export default UserInfoCard;
