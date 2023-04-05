import React from 'react';
import User from '@components/User';
import AuthProvider from '@context/authContext';

const ChatRoom: React.FC = () => (
  <>
    <h1>Chat Room</h1>
    <div>
      <p>Hello world</p>
      <AuthProvider>
        <User />
      </AuthProvider>
    </div>
  </>
);
export default ChatRoom;
