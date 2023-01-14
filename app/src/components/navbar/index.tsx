import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ServerOptions } from './serverOptions';

export const Navbar: React.FC = () => {
  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <ServerOptions />
      </Flex>
      <p className='text-sm text-app-text2 opacity-50'>Snorlax v1.0.0</p>
    </Flex>
  );
};
