import React from 'react';
import { imgs } from '@utils/constants';
import './Main.scss';

interface Props {
  children?: React.ReactNode;
  title?: string;
  hideOnMobile?: true;
}
const Main: React.FC<Props> = ({ children, title, hideOnMobile }) => {
  return (
    <div className={`main ${hideOnMobile ? 'hideOnMobile' : ''}`}>
      {children || (
        <div className="main__img-wrapper">
          <img src={imgs.chat} alt="chat" />
          {title && <p>{title}</p>}
        </div>
      )}
    </div>
  );
};

export default Main;
