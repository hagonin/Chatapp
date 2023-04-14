import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthenLayout.scss';

const AuthenLayout = () => (
  <div className="container authenLayout__wrapper">
    <Outlet />
  </div>
);

export default AuthenLayout;
