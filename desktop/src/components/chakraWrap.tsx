import React from 'react';
import { PropsWithChildren } from 'react';
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  createStandaloneToast,
  DarkMode,
} from '@chakra-ui/react';

type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

const config: ThemeConfig = {
  initialColorMode: 'dark',
};

const theme = extendTheme({ config });

const { ToastContainer } = createStandaloneToast();

export const ChakraWrap: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        {children}
        <ToastContainer />
      </DarkMode>
    </ChakraProvider>
  );
};
