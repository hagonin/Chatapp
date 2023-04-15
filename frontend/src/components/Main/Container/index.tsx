import React from 'react';
interface Props {
  children: React.ReactNode;
}
const Container: React.FC<Props> = ({ children }) => (
  <div className="rootLayout__main-container scrollbar">{children}</div>
);

export default Container;
