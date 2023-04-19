import React from 'react';
import '../SideBar.scss';
import SearchForm from '@components/Form/SearchForm';

interface Props {
  children: React.ReactNode;
  hideOnMobile?: true;
}
const SidebarLeft: React.FC<Props> = ({ children, hideOnMobile }) => {
  return (
    <div className={`sideBar__left ${hideOnMobile ? 'hideOnMobile' : ''}`}>
      <div className="sideBar__search">
        <SearchForm />
      </div>
      <div className="sideBar__container scrollbar">{children}</div>
    </div>
  );
};

export default SidebarLeft;
