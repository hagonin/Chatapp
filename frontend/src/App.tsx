import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

import {
  CallHistory,
  ChangePassword,
  ChatRoom,
  FriendList,
  Home,
  Login,
  ResetPassword,
  Signup,
} from '@pages';
import AuthProvider from '@context/authContext';
import RoomProvider from '@context/roomContext';
import RoomLayout from '@layouts/RoomLayout';
import ChatListPage from '@pages/ChatListPage';
import CallHistoryList from '@pages/CallHistoryListPage';
import HistoryLayout from '@layouts/HistoryLayout';
import CallHistoryListPage from '@pages/CallHistoryListPage';
import CallHistoryPage from '@pages/CallHistoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/',
    element: <AuthenLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Signup />,
      },
      {
        path: 'login/request_reset_password',
        element: <ResetPassword />,
      },
      {
        path: 'change_password',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: '/chatroom',
    element: <RootLayout />,
    children: [
      {
        path: 'chat-list',
        element: <ChatListPage />,
      },
      {
        path: 'chat-list',
        element: <RoomLayout />,
        children: [
          {
            path: ':id',
            element: <ChatRoom />,
          },
        ],
      },
      {
        path: 'call-history',
        element: <CallHistoryListPage />,
        index: true,
      },
      {
        path: 'call-history',
        element: <HistoryLayout />,
        children: [
          {
            path: ':id',
            element: <CallHistoryPage />,
          },
        ],
      },
      {
        path: 'friend-list',
        element: <FriendList />,
      },
    ],
  },
]);

const App: React.FC = () => {
  // console.log(process);
  return (
    <AuthProvider>
      <RoomProvider>
        <Toaster position="top-right" gutter={8} />
        <RouterProvider router={router} />
      </RoomProvider>
    </AuthProvider>
  );
};

export default App;
