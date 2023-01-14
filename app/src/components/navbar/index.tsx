import React from 'react';
import { Flex } from '@chakra-ui/react';
import { ServerOptions } from './serverOptions';

export const Navbar: React.FC = () => {
  return (
    <Flex direction='column' h='full' justifyContent='space-between'>
      <Flex direction='column'>
        <ServerOptions />
      </Flex>
      <div></div>
    </Flex>
  );
};
