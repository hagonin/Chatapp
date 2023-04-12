import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

import ChatRoom from '@pages/ChatRoom';
import Login from '@pages/Login';
import Signup from '@pages/SignUp';
import Home from '@pages/Home';
import ResetPassword from '@pages/ResetPassword';
import ResetChangePassword from '@pages/ResetChangePassword';
import ChangePassword from '@pages/ChangePassword';

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
        path: 'login/reset_password',
        element: <ResetChangePassword />,
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
        path: '',
        element: <ChatRoom />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
