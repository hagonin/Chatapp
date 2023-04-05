import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layouts/RootLayout';
import ChatRoom from '@pages/ChatRoom';
import Login from '@pages/Login';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// const routers = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout />,
//     children: [
//       {
//         path: 'chatroom',
//         element: <ChatRoom />,
//       },
//       {
//         path: 'login',
//         element: <Login />,
//       },
//     ],
//   },
// ]);

const Routers: React.FC = () => {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </RootLayout>
    </Router>
  );
};

export default Routers;
