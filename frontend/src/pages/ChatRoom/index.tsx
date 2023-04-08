import React from 'react';
import AuthProvider from '@context/authContext';
import User from '@components/User';

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
