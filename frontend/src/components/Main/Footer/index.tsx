import React from 'react';
interface Props {
  children: React.ReactNode;
}
const Footer: React.FC<Props> = ({ children }) => (
  <div className="rootLayout__main-footer">{children}</div>
);

export default Footer;
