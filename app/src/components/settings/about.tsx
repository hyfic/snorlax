import React from 'react';
import HyficLogo from '@/assets/hyfic.svg';
import { FaGithub } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';

export const About: React.FC = () => {
  return (
    <div>
      <div>
        <h1 className='text-2xl font-semibold'>About</h1>
        <p className='text-app-text opacity-50 mt-1'>
          More about Snorlax & Hyfic.
        </p>
      </div>
      <div className='mt-5'>
        <a href='https://github.com/hyfic/snorlax' target='_blank'>
          <Tooltip
            label='Contribute on github'
            className='bg-app-dark3 text-app-text border border-app-dark4'
          >
            <Button className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'>
              <FaGithub className='mr-2' /> Contribute
            </Button>
          </Tooltip>
        </a>
        <a href='https://buymeacoffee.com/fadhilsaheer' target='_blank'>
          <Tooltip
            label='Support us on buymeacoffee.com'
            className='bg-app-dark3 text-app-text border border-app-dark4'
          >
            <Button
              ml={2}
              className='bg-app-dark3 transition-all duration-200 hover:bg-app-dark4'
            >
              <SiBuymeacoffee className='mr-2' /> Sponsor
            </Button>
          </Tooltip>
        </a>
        <Flex mt={10} alignItems='center' justifyContent='space-between'>
          <p className='flex items-center text-app-text'>
            Developed with{' '}
            <AiFillHeart className='text-rose-500 text-xl mx-1' />{' '}
            <a
              href='https://fadhilsaheer.tech'
              target='_blank'
              className='underline underline-offset-4 transition-all duration-200 hover:opacity-50'
            >
              Fadhil
            </a>
          </p>
          <a
            href='https://hyfic.github.io'
            target='_blank'
            className='opacity-50 transition-all duration-200 hover:opacity-100'
          >
            <img src={HyficLogo} alt='' className='ml-1 w-14' />
          </a>
        </Flex>
      </div>
    </div>
  );
};
