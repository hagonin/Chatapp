import ChatRoom from '@pages/ChatRoom';
import Login from '@pages/Login';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatRoom />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
