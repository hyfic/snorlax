import React from 'react';
import { PropsWithChildren } from 'react';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
  createStandaloneToast,
} from '@chakra-ui/react';

type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

const config: ThemeConfig = {
  initialColorMode: 'system',
};

const theme = extendTheme({ config });

const { ToastContainer } = createStandaloneToast();

export const ChakraWrap: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
      <ToastContainer />
    </ChakraProvider>
  );
};
