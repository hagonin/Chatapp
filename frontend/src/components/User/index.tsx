import { UserStateType, useAuthContext } from '@context/authContext';
import * as React from 'react';
import './User.scss';
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
      <p className="user__name">{user.email}</p>
      <p className="user__id">{user.id}</p>
      <button onClick={handleChangeName}>Click change name</button>
    </>
  );
};

export default User;
