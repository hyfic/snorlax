import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdRefresh } from 'react-icons/io';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from '@chakra-ui/react';
import { ServerForm } from '@/components/serverOptions/serverFormWrapper';
import { useServerStore } from '@/store/server.store';
import { ServerDisplay } from '@/components/serverOptions/serverDisplay';

export const SettingsPage: React.FC = () => {
  const { servers, loadServers } = useServerStore();

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Flex alignItems='center' justifyContent='space-between'>
        <div>
          <h1 className='text-2xl font-semibold'>Settings</h1>
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
      <div className='mt-5'>
        {searchQuery.trim().length !== 0 && (
          <h2 className='mb-5 text-xl font-medium'>
            Searching for {searchQuery} ...
          </h2>
        )}
        {servers.filter((server) =>
          server.name
            .trim()
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        ).length == 0 && <h2 className='text-app-text2'>No results</h2>}
        {servers
          .filter((server) =>
            server.name
              .trim()
              .toLowerCase()
              .includes(searchQuery.trim().toLowerCase())
          )
          .map((server) => (
            <ServerDisplay server={server} key={server.id} />
          ))}
      </div>
    </div>
  );
};
