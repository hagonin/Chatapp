import React from 'react';
import { useMainContext } from '@context/mainContext';
import ChatBox from '@components/ChatBox';
import MessageForm from '@components/Form/MessageForm';
import Profile from '@components/Profile';
import { imgs } from '@utils/constants';

const Main: React.FC = () => {
  const { main } = useMainContext();
  let Component: string | React.ReactElement;
  switch (main.containerType) {
    case 'call-list':
      Component = (
        <p className="rootLayout__main-message">
          Select a contact to start a conversation!
        </p>
      );
      break;
    case 'chatbox':
      Component = <ChatBox />;
      break;
    case 'profile':
      Component = (
        <>
          <header className="rootLayout__main-header">
            <h3>Profile</h3>
          </header>
          <div className="rootLayout__main-container">
            <Profile
              avatar={imgs.user}
              about="Helllllooooo"
              username="David"
              phone="11111111"
            />
          </div>
        </>
      );
      break;
    case 'notification':
      Component = (
        <>
          <header className="rootLayout__main-header">
            <h3>Notification</h3>
          </header>
          <div className="rootLayout__main-container">List noitification</div>
        </>
      );
      break;
    default:
      Component = 'Nothing here';
      break;
  }
  return <div className="rootLayout__main">{Component}</div>;
};

export default Main;
