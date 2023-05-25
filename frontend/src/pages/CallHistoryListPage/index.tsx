import React from 'react';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import Main from '@components/Main';
import HistoryList from '@components/HistoryList';

const CallHistoryListPage: React.FC = () => {
  return (
    <>
      <SidebarLeft>
        <HistoryList />
      </SidebarLeft>
      <Main hideOnMobile title="Choosing a contac to see call history" />
    </>
  );
};

export default CallHistoryListPage;
