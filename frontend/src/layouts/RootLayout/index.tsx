import React from 'react';
import { Outlet } from 'react-router-dom';
// interface Props {
//   children?: React.ReactNode;
// }
const RootLayout: React.FC = () => {
  return <Outlet />;
};

export default RootLayout;
