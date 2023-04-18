import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

import {
  CallHistory,
  ChangePassword,
  ChatList,
  FriendList,
  Home,
  Login,
  ResetPassword,
  Signup,
} from '@pages';
import AuthProvider from '@context/authContext';
import RoomProvider from '@context/roomContext';

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
        element: <ChatList />,
      },
      {
        path: 'call-history',
        element: <CallHistory />,
      },
      {
        path: 'friend-list',
        element: <FriendList />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RoomProvider>
        <RouterProvider router={router} />
      </RoomProvider>
    </AuthProvider>
  );
};

export default App;
