import { icons } from '@utils/constants';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigate.scss';
import { useMainContext } from '@context/mainContext';

interface PropsClass {
  isActive: boolean;
}

interface Props {
  toggleSideBarRight: () => void;
}

const Navigate: React.FC<Props> = ({ toggleSideBarRight }) => {
  const { changeType } = useMainContext();
  const className = ({ isActive }: PropsClass) =>
    `navigate__item ${isActive ? 'navigate__item--active' : ''}`;

  return (
    <div className="rootLayout__navigate navigate">
      <NavLink
        className={className}
        to="/chatroom/friend-list"
        onClick={() =>
          changeType({ containerType: 'call-list' })
        }
      >
        <img src={icons.navigateUser} alt="user" />
      </NavLink>
      <NavLink
        className={className}
        to="/chatroom/chat-list"
        onClick={() =>
          changeType({ containerType: 'chatbox' })
        }
      >
        <img src={icons.navigateMesage} alt="message" />
      </NavLink>
      <NavLink
        className={className}
        to="/chatroom/call-list"
        onClick={() =>
          changeType({ containerType: 'call-list' })
        }
      >
        <img src={icons.navigateMissedPhone} alt="phone" />
      </NavLink>
      <button
        className="navigate__item navigate__setting-btn"
        onClick={toggleSideBarRight}
      >
        <img src={icons.navigateSetting} alt="settings" />
      </button>
    </div>
  );
};

export default Navigate;
