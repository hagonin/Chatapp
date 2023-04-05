import React from 'react';
import User from '@components/User';
import AuthProvider from '@context/authContext';

const App: React.FC = () => {
  return (
    <div>
      <p>Hello world</p>
      <AuthProvider>
        <User />
      </AuthProvider>
    </div>
  );
};

export default App;
