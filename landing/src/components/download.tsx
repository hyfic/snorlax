import React from 'react';
import { FaWindows } from 'react-icons/fa';
import { Center, Button } from '@chakra-ui/react';

export const Download: React.FC = () => {
  return (
    <Center mt={10}>
      <a
        download
        href='https://github.com/hyfic/snorlax/releases/download/v1.0.0-beta/snorlax.exe'
      >
        <Button
          size='lg'
          className='bg-app-accent text-app-text transition-all duration-200 hover:bg-app-accent/80'
          mr={2}
        >
          <FaWindows className='mr-2' />
          Download app
        </Button>
      </a>
      <a
        download
        href='https://github.com/hyfic/snorlax/releases/download/v1.0.0-beta/server.exe'
      >
        <Button
          size='lg'
          className='bg-app-accent text-app-text transition-all duration-200 hover:bg-app-accent/80'
        >
          <FaWindows className='mr-2' />
          Download server
        </Button>
      </a>
    </Center>
  );
};
