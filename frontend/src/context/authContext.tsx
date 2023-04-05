import React from 'react';

export interface UserStateType {
  id: number | null;
  username: string;
  last_name?: string;
  first_name?: string;
  avatar?: string;
  email: string;
}

interface AuthContextType {
  user: UserStateType;
  setUser: (user: UserStateType) => void;
}

const AuthDefaultState = {
  user: {
    id: 1,
    username: 'UserA',
    last_name: '',
    first_name: '',
    avatar: '',
    email: 'userA@gmail.com',
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
