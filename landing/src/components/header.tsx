import React from 'react';
import Logo from '../assets/logo.svg';
import { FaGithub } from 'react-icons/fa';
import { Flex, IconButton } from '@chakra-ui/react';

export const Header: React.FC = () => {
  return (
    <Flex mt={8} alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <img src={Logo} alt='HeartBeat' className='w-9' />
        <h2 className='text-2xl font-bold ml-2'>Snorlax</h2>
      </Flex>
      <Flex alignItems='center'>
        <a href='https://github.com/hyfic/snorlax'>
          <IconButton
            aria-label='Github'
            icon={<FaGithub className='text-xl' />}
            variant='ghost'
          />
        </a>
      </Flex>
    </Flex>
  );
};
