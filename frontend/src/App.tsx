import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

import { ChangePassword, Home, Login, ResetPassword, Signup } from '@pages';
import CallList from '@pages/CallList';
import FriendList from '@pages/FriendList';
import ChatList from '@pages/ChatList';

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
      // {
      //   path: '',
      //   element: <ChatRoom />,
      // },
      {
        path: 'chat-list',
        element: <ChatList />,
      },
      {
        path: 'call-list',
        element: <CallList />,
      },
      {
        path: 'friend-list',
        element: <FriendList />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
