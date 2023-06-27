import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

import {
  CallHistoryPage,
  ChangePasswordPage,
  ChatRoomPage,
  FriendListPage,
  HomePage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
} from '@pages';
import RoomLayout from '@layouts/RoomLayout';
import ChatListPage from '@pages/chatlist';
import CallHistoryList from '@pages/callhistorylist';
import HistoryLayout from '@layouts/HistoryLayout';
import CallHistoryListPage from '@pages/callhistorylist';
import { Provider } from 'react-redux';
import store from '@redux/configureStore';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/',
    element: <AuthenLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <SignupPage />,
      },
      {
        path: 'login/request_reset_password',
        element: <ResetPasswordPage />,
      },
      {
        path: 'change_password',
        element: <ChangePasswordPage />,
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
            element: <ChatRoomPage />,
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
        element: <FriendListPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" gutter={8} />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
