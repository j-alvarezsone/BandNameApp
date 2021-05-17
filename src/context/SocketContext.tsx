import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket';
import { SocketContextProps } from '../types/types';

export const SocketContext = createContext({});

export const SocketProvider = ({ children }: SocketContextProps) => {
  const { socket, online } = useSocket('http://localhost:8080');

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
