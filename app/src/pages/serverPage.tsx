import React, { useEffect, useState } from 'react';
import SnorlaxLogo from '@/assets/logo.svg';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import { ServerForm } from '@/components/serverOptions/serverFormWrapper';
import { useServerStore } from '@/store/server.store';
import { ServerDisplay } from '@/components/serverOptions/serverDisplay';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.005,
      staggerChildren: 0.005,
    },
  },
};

export const ServerPage: React.FC = () => {
  const { servers, loadServers, loading } = useServerStore();

  const [searchQuery, setSearchQuery] = useState('');

  const inputRef = React.useRef<any>();

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        inputRef.current.focus();
      }
    });
  }, []);

  return (
    <div>
      <Flex alignItems='center' justifyContent='space-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Server</h1>
          <p className='text-app-text opacity-50 mt-1'>
            Manage your storage locations.
          </p>
        </div>
        <Flex alignItems='center'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={
                <FiSearch className='text-app-text opacity-60 text-lg font-medium' />
              }
            />
            <Input
              placeholder='Search'
              className='bg-app-dark3'
              focusBorderColor='#5993E2'
              variant='filled'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={inputRef}
            />
          </InputGroup>
          <ServerForm>
            <Button
              ml={1}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Add server
            </Button>
          </ServerForm>
          <Tooltip
            label='Refetch servers'
            className='bg-app-dark3 text-app-text border border-app-dark4'
          >
            <IconButton
              aria-label='Refetch'
              ml={1}
              icon={<IoMdRefresh className='text-app-text text-xl' />}
              className='bg-app-dark3 border border-app-dark4 hover:opacity-60'
              onClick={() => loadServers()}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <motion.div
        variants={container}
        className='mt-5'
        initial='hidden'
        animate='visible'
      >
        {loading && (
          <div className='h-[75vh] w-full flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        )}
        {searchQuery.trim().length !== 0 && (
          <h2 className='mb-5 text-xl font-medium'>
            Searching for {searchQuery} ...
          </h2>
        )}
        {!loading &&
          servers.filter((server) =>
            server.name
              .trim()
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase())
          ).length == 0 && (
            <div
              className={`w-full flex flex-col justify-center items-center ${
                searchQuery.trim().length == 0 ? 'h-[75vh]' : 'h-[65vh]'
              }`}
            >
              <img src={SnorlaxLogo} alt='' className='w-24' />
              <h2 className='text-xl font-medium text-app-text'>
                No server{' '}
                {searchQuery.trim().length == 0
                  ? 'added'
                  : 'matching search result'}{' '}
                !
              </h2>
              <div className='mt-2 w-full px-60 flex justify-center'>
                <p className='text-app-text opacity-60 text-center'>
                  You can't use this application unless you connect to a snorlax
                  server.
                </p>
              </div>
              <ServerForm>
                <Button
                  mt={5}
                  className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
                >
                  Add server
                </Button>
              </ServerForm>
            </div>
          )}
        {!loading &&
          servers
            .filter((server) =>
              server.name
                .trim()
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase())
            )
            .map((server) => <ServerDisplay server={server} key={server.id} />)}
      </motion.div>
    </div>
  );
};
