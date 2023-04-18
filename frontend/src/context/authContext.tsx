import { imgs } from '@utils/constants';
import React from 'react';

export interface UserStateType {
  id: number | null;
  username: string;
  last_name?: string;
  first_name?: string;
  avatar?: string;
  email: string;
  about: string;
  phone: string;
}

interface AuthContextType {
  user: UserStateType;
  setUser: (user: UserStateType) => void;
}

const AuthDefaultState = {
  user: {
    id: 1,
    username: 'David',
    last_name: 'John',
    first_name: 'Somi',
    avatar: imgs.user,
    email: 'userA@gmail.com',
    about: 'Hello i am newer',
    phone: '123456'
  },
  setUser: () => {},
};

const AuthContext = React.createContext<AuthContextType>(AuthDefaultState);

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<UserStateType>(AuthDefaultState.user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => React.useContext(AuthContext);

export default AuthProvider;
export { useAuthContext };
