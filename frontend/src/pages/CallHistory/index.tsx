import React from 'react';
import { callList } from '@store/dataFake';

import { ChatItem } from '@components/Common';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import Main from '@components/Main';

const CallHistory: React.FC = () => (
  <>
    <SidebarLeft>
      {callList.length > 0 ? (
        callList.map(item => (
          <ChatItem
            key={item.id}
            id={item.id}
            avatar={item.avatar}
            name={item.name}
            status={item.status}
            timestamp={item.timestamp}
            history={{
              onCall: () => console.log('calling'),
              type: item.history?.type!,
              timestamp: item.history?.timestamp!,
            }}
          />
        ))
      ) : (
        <span>Have no any conversation</span>
      )}
    </SidebarLeft>
    <Main />
  </>
);

export default CallHistory;
