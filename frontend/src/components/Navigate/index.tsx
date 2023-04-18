import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigate.scss';
import { icons } from '@utils/constants';

interface PropsClass {
  isActive: boolean;
}

interface Props {
  toggleSideBarRight: () => void;
}

const Navigate: React.FC<Props> = ({ toggleSideBarRight }) => {
  const className = ({ isActive }: PropsClass) =>
    `navigate__item ${isActive ? 'navigate__item--active' : ''}`;

  return (
    <nav className="navigate">
      <NavLink className={className} to="/chatroom/friend-list">
        <img src={icons.navigateUser} alt="user" />
      </NavLink>
      <NavLink className={className} to="/chatroom/chat-list">
        <img src={icons.navigateMesage} alt="message" />
      </NavLink>
      <NavLink className={className} to="/chatroom/call-history">
        <img src={icons.navigateMissedPhone} alt="phone" />
      </NavLink>
      <button
        className="navigate__item navigate__setting-btn"
        onClick={toggleSideBarRight}
      >
        <img src={icons.navigateSetting} alt="settings" />
      </button>
    </nav>
  );
};

export default Navigate;
