import React from 'react';
import { imgs } from '@utils/constants';

const Main: React.FC<{ children?: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="rootLayout__main">
      {children || (
        <div className="rootLayout__main-img-wrapper">
          <img src={imgs.chat} alt="chat" />
          {title && <p>{title}</p>}
        </div>
      )}
    </div>
  );
};

export default Main;
