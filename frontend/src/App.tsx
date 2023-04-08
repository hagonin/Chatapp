import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatRoom from '@pages/ChatRoom';
import Login from '@pages/Login';
import Signup from '@pages/SignUp';
import Home from '@pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chatroom',
    element: <ChatRoom />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
