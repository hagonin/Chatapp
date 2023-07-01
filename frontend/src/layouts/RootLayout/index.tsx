import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './RootLayout.scss';
import Navigate from '@components/Navigate';
import SidebarRight from '@components/Sidebar/SidebarRight';
import MobileNavi from '@components/Navigate/MobileNav';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@redux/hook';
import selectUserInfo from '@redux/auth/selector';
import { isEmpty } from 'lodash';
import { getMeThunk } from '@redux/auth/thunk';

const RootLayout: React.FC = () => {
  const [showSidebarRight, setShowSidebarRight] = React.useState(false);
  const navigate = useNavigate();
  // const user = useAppSelector(selectUserInfo);
  // if (!user.name) {
  //   navigate('/');
  // }

  return (
    <div className="rootLayout__wrapper">
      <header className="rootLayout__header">Logo Talkie</header>
      <div className="rootLayout__body">
        <Navigate
          toggleSideBarRight={() => setShowSidebarRight(!showSidebarRight)}
        />
        <MobileNavi
          toggleSideBarRight={() => setShowSidebarRight(!showSidebarRight)}
        />
        <Outlet />
        <SidebarRight
          isActive={showSidebarRight}
          toggleSideBarRight={() => setShowSidebarRight(!showSidebarRight)}
        />
      </div>
    </div>
  );
};

export default RootLayout;
