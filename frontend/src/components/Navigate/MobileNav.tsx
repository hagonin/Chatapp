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

const MobileNavi: React.FC<Props> = ({ toggleSideBarRight }) => {
  const className = ({ isActive }: PropsClass) =>
    `navigate-mobile__item ${isActive ? 'navigate__item--active' : ''}`;

  return (
    <nav className="navigate-mobile">
      <NavLink className={className} to="/chatroom/friend-list">
        <img src={icons.navigateUserMobile} alt="user" />
        Friends
      </NavLink>
      <NavLink className={className} to="/chatroom/chat-list">
        <img src={icons.navigateMessageMobile} alt="message" />
        Chats
      </NavLink>
      <NavLink className={className} to="/chatroom/call-history">
        <img src={icons.navigatePhoneMobile} alt="phone" />
        Calls
      </NavLink>
      <button
        className="navigate-mobile__item navigate-mobile__setting-btn"
        onClick={toggleSideBarRight}
      >
        <img src={icons.navigateSettingMobile} alt="settings" />
        Profile
      </button>
    </nav>
  );
};

export default MobileNavi;
