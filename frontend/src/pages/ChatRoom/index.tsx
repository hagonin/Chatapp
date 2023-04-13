import React from 'react';
import './ChatRoom.scss';
import { icons, imgs } from '@utils/constants';
import AuthProvider from '@context/authContext';
import { MessageCard, OptionCard, UserCard } from '@components/Common';
import Profile from '@components/Profile';

const ChatRoom: React.FC = () => (
  <div className="chatroom">
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

      <div className="chatroom__box">
        {/* MessageCard */}
        <MessageCard message="dkdkdk" timestamp="12:34 PM" type="partner" />
        <MessageCard
          message="Ertir onda hökman ýanyň bilen algyn ýatdan dkd dkdkdk dkdkdk dkdkdk dkdkdk dkdkdk dkdkdkd dkdkdk dkdkdk dkdkkd  llksdf dkfksdjf ldkfkdf  dlkfjdf skdjs skdkskdj klsdkksa kksdk çykarman  Ertir onda hökman ýanyň bilen algyn ýatdan çykarman dkdk dkdkdk dkkdkd dkdkdk"
          timestamp="12:34 PM"
          type="partner"
        />
        <MessageCard
          message="Ertir onda hökman ýanyň bilen algyn ýatdan dkd dkdkdk dkdkdk dkdkdk dkdkdk dkdkdk dkdkdkd dkdkdk dkdkdk dkdkkd  llksdf dkfksdjf ldkfkdf  dlkfjdf skdjs skdkskdj klsdkksa kksdk çykarman"
          timestamp="12:34 PM"
          type="user"
          status="read"
        />
      </div>
      <div className="chatroom__optionList">
        <OptionCard label="Edit Profile" icon={icons.profile} active={false} />
        <OptionCard label="Notifications" icon={icons.notifi} active={false} />
        <OptionCard
          label="Privacy and security"
          icon={icons.privacy}
          active={false}
        />
        <OptionCard label="Chat settings" icon={icons.settings} active={true} />
      </div>
      <div className="chatroom__userInfoList">
        <Profile
          avatar={imgs.user2}
          username="Designer"
          phone="123456"
          about="Hello nice to meet you"
        />
      </div>
    </div>
  </div>
);
export default ChatRoom;
