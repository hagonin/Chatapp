import React from 'react';
import AuthProvider from '@context/authContext';

const ChatRoom: React.FC = () => (
  <>
    <h1>Chat Room</h1>
    <div>
      <AuthProvider>
        <h2>User</h2>
      </AuthProvider>
    </div>
  </>
);
export default ChatRoom;
