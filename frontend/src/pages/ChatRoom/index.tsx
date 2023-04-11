import React from 'react';
import AuthProvider from '@context/authContext';
import UserCard from '@components/Common/UserCard';
import { imgs } from '@utils/constants';

const ChatRoom: React.FC = () => (
  <>
    <h1>Chat Room</h1>
    <div>
      <AuthProvider>
        <UserCard
          name="Ahmet Kadyrow"
          avatar={imgs.user}
          message="Men ertir size barýan..."
          timestamp="12:00"
          quantity={4}
        />
        <UserCard
          name="Ahmet Kadyrow"
          avatar={imgs.user}
          message="Men ertir size barýan..."
          timestamp="12:00"
          // quantity={4}
          status="read"
        />
        {/* topbar in chatbox */}
        <UserCard
          name="Ahmet Kadyrow"
          avatar={imgs.user}
          lastseen="tody at 10:40"
        />
        {/* call */}
        <UserCard
          name="Ahmet Kadyrow"
          avatar={imgs.user}
          call={{ type: 'missed', timestamp: 'TOday, 16:40' }}
        />

        {/* mobile */}
        <UserCard
          name="Ahmet Kadyrow"
          avatar={imgs.user}
          message="Men ertir size barýan..."
          timestamp="12:00"
          quantity={4}
          online={true}
        />
      </AuthProvider>
    </div>
  </>
);
export default ChatRoom;
