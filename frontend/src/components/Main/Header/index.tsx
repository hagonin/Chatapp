import React from 'react';

interface Props {
  children?: React.ReactNode;
}
const Header: React.FC<Props> = ({ children }) => <header className='rootLayout__main-header'>{children}</header>;

export default Header;
