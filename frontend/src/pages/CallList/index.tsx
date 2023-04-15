import React from 'react';
import { imgs } from '@utils/constants';

import { ChatItem } from '@components/Common';
import Main from '@components/Main';
import SidebarLeft from '@components/Sidebar/SidebarLeft';

const CallList: React.FC = () => (
  <>
    <SidebarLeft>
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        call={{ timestamp: '10:20', type: 'incoming' }}
        online={true}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        call={{ timestamp: '10:20', type: 'missed' }}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        call={{ timestamp: '10:20', type: 'outgoing' }}
      />
    </SidebarLeft>
    <Main>Select a contact to start a conversation!</Main>
  </>
);

export default CallList;
