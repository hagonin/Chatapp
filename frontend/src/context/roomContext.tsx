import React from 'react';
import { chatlist01 } from '@store/dataFake';
import { Props as MessageProps } from '@components/Common/MessageCard';

export interface User {
  id: number;
  name: string;
  timestamp: string;
  avatar: string;
  messageList: MessageProps[];
}
interface RoomContextProps {
  user: User | null;
  setUser: (user: User) => void;
}

const RoomContext = React.createContext<RoomContextProps>({
  user: null,
  setUser: () => {},
});

interface RoomProviderProps {
  children?: React.ReactNode;
}
const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const setNewUser = (user: User) => {
    //  first get partner info including id
    //  using partner id, call api get chatlist
    setUser({ ...user, messageList: chatlist01 });
    
  };
  return (
    <RoomContext.Provider value={{ user: user, setUser: setNewUser }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => React.useContext(RoomContext);
export default RoomProvider;
