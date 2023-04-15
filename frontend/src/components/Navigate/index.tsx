import { icons } from '@utils/constants';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigate.scss';


const Navigate: React.FC = () => {
  return (
    <div className="rootLayout__navigate navigate">
      <NavLink
        className="navigate__item navigate__item--active"
        to="/chatroom/friend-list"
      >
        <img src={icons.navigateUser} alt="user" />
      </NavLink>
      <NavLink className="navigate__item" to="/chatroom/chat-list">
        <img src={icons.navigateMesage} alt="message" />
      </NavLink>
      <NavLink className="navigate__item" to="/chatroom/call-list">
        <img src={icons.navigateMissedPhone} alt="phone" />
      </NavLink>
      <button className="navigate__item">
        <img src={icons.navigateSetting} alt="settings" />
      </button>
    </div>
  );
};

export default Navigate;
