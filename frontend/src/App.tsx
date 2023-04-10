import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatRoom from '@pages/ChatRoom';
import Login from '@pages/Login';
import Signup from '@pages/SignUp';
import Home from '@pages/Home';
import AuthenLayout from '@layouts/AuthenLayout';
import RootLayout from '@layouts/RootLayout';

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
    ],
  },

  {
    path: '/chatroom',
    element: <RootLayout />,
    children: [
      {
        element: <ChatRoom />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
