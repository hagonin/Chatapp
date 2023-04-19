import React from 'react';
import '../SideBar.scss';
import SearchForm from '@components/Form/SearchForm';

interface Props {
  children: React.ReactNode
}
const SidebarLeft: React.FC<Props> = ({children}) => {
  return (
    <div className="sideBar__left">
      <div className="sideBar__search">
        <SearchForm />
      </div>
      <div className="sideBar__container scrollbar">{children}</div>
    </div>
  );
};

export default SidebarLeft;
