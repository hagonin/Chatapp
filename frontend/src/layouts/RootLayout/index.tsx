import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';

const RootLayout: React.FC = () => {
  return (
    <div className="rootLayout__wrapper">
      <div>Chat room</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
