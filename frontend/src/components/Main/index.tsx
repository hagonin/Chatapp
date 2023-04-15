import React from 'react';
interface Props {
  children: React.ReactNode;
}
const Main: React.FC<Props> = ({ children }) => (
  <div className="rootLayout__main">{children}</div>
);

export default Main;
