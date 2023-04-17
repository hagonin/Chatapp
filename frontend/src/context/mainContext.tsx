import React from 'react';

interface Main {
  title?: string | React.ReactNode;
  containerType: 'chatbox' | 'profile' | 'notification' | 'call-list';
}
interface MainContextType {
  main: Main;
  changeType: ({ title, containerType }: Main) => void;
}

const DefaultMainContext: MainContextType = {
  main: {
    title: 'Nothing here',
    containerType: 'chatbox',
  },
  changeType: () => {},
};

const MainContext = React.createContext<MainContextType>(DefaultMainContext);

interface Props {
  children: React.ReactNode;
}

const MainProvider: React.FC<Props> = ({ children }) => {
  const [main, setMain] = React.useState<Main>(DefaultMainContext.main as Main);
  const changeType = ({ title, containerType }: Main) => {
    setMain({ title: title, containerType: containerType });
  };
  return (
    <MainContext.Provider value={{ main, changeType }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => React.useContext(MainContext);

export default MainProvider;
