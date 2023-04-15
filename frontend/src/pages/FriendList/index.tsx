import React from 'react';
import { imgs } from '@utils/constants';

import { ChatItem } from '@components/Common';
import Main from '@components/Main';
import SidebarLeft from '@components/Sidebar/SidebarLeft';

const FriendList: React.FC = () => (
  <>
    <SidebarLeft>
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        timestamp="12:00"
        tag={true}
        onCall={() => console.log('calling')}
      />
    </SidebarLeft>
    <Main>Select a contact to start a conversation!</Main>
  </>
);

export default FriendList;
