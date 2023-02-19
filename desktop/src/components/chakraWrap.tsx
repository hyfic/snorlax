import React, { useEffect } from 'react';
import { PropsWithChildren } from 'react';
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  createStandaloneToast,
  DarkMode,
  useColorMode,
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
      <ChakraDarkMode>
        {children}
        <ToastContainer />
      </ChakraDarkMode>
    </ChakraProvider>
  );
};

const ChakraDarkMode: ReactComponent = ({ children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode('dark'); // setting color mode to dark, just in case
  }, []);

  return <DarkMode>{children}</DarkMode>;
};
