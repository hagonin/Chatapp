import React from 'react';
import { friendList } from '@store/dataFake';

import { ChatItem } from '@components/Common';
import Main from '@components/Main';
import SidebarLeft from '@components/Sidebar/SidebarLeft';

const FriendList: React.FC = () => (
  <>
    <SidebarLeft>
      {friendList.length > 0 ? (
        friendList.map(item => (
          <ChatItem
            key={item.id}
            id={item.id}
            name={item.name}
            avatar={item.avatar}
            timestamp={item.timestamp}
            status={item.status}
            call={{ onCall: () => console.log('calling') }}
          />
        ))
      ) : (
        <span>Have no any conversation</span>
      )}
    </SidebarLeft>
    <Main title="Choosing a contact and make a call" />
  </>
);

export default FriendList;
