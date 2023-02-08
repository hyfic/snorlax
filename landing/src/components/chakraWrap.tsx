import React from 'react';
import { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

export const ChakraWrap: ReactComponent = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
