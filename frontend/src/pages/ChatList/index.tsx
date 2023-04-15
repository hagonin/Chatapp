import React from 'react';
import './Chatbox.scss';
import { imgs } from '@utils/constants';

import { ChatItem, UserInfoCard } from '@components/Common';
import Container from '@components/Main/Container';
import SidebarLeft from '@components/Sidebar/SidebarLeft';
import Header from '@components/Main/Header';
import ChatBox from '@components/ChatBox';
import Main from '@components/Main';
import Footer from '@components/Main/Footer';
import MessageForm from '@components/Form/MessageForm';

const ChatList: React.FC = () => (
  <>
    <SidebarLeft>
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user2}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
      <ChatItem
        name="Ahmet Kadyrow"
        avatar={imgs.user}
        message="Men ertir size barýan..."
        timestamp="12:00"
        status="read"
      />
    </SidebarLeft>
    <Main>
      <Header>
        <UserInfoCard
          name="David"
          tag="David"
          avatar={imgs.user2}
          timestamp="10:20"
          smallCard
        />
      </Header>
      <Container>
        <ChatBox />
      </Container>
      <Footer>
        <MessageForm />
      </Footer>
    </Main>
  </>
);

export default ChatList;
