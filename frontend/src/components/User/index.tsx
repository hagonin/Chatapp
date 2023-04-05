import { UserStateType, useAuthContext } from '@context/authContext';
import * as React from 'react';

const User: React.FC = () => {
  const { user, setUser } = useAuthContext();
  const handleChangeName = (): void => {
    const newUser: UserStateType = {
      ...user,
      username: 'UserB',
      email: 'userB@gmail.com',
      id: 3,
    };
    setUser(newUser);
  };
  return (
    <>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
      <h1>{user.id}</h1>
      <button onClick={handleChangeName}>Click change name</button>
    </>
  );
};

export default User;
