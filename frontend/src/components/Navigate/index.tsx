import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigate.scss';
import { icons } from '@utils/constants';
import { ROUTES } from '@utils/routes';

interface PropsClass {
  isActive: boolean;
}

interface NavigateProps {
  toggleSideBarRight: () => void;
}

const Navigate: React.FC<NavigateProps> = ({ toggleSideBarRight }) => {
  const className = ({ isActive }: PropsClass) =>
    `navigate__item ${isActive ? 'navigate__item--active' : ''}`;

  return (
    <nav className="navigate">
      <NavLink className={className} to={ROUTES.FRIEND_LIST}>
        <img src={icons.navigateUser} alt="user" />
      </NavLink>
      <NavLink className={className} to={ROUTES.CHAT_LIST}>
        <img src={icons.navigateMesage} alt="message" />
      </NavLink>
      <NavLink className={className} to={ROUTES.CALL_HISTORY}>
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
