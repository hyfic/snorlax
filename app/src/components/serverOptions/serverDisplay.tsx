import React, { useEffect, useState } from 'react';
import SnorlaxLogo from '@/assets/logo.svg';
import { ServerType } from '@/types/server.type';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { pingServer } from '@/api/ping';
import { PermissionWrapper } from '../permissionWrapper';
import { invoke } from '@tauri-apps/api';
import { useServerStore } from '@/store/server.store';
import { showToast } from '@/utils/showToast';

interface Props {
  server: ServerType;
}

export const ServerDisplay: React.FC<Props> = ({ server }) => {
  const { deleteServer } = useServerStore();

  const [isServerOnline, setIsServerOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    pingServer(server.connection)
      .then(() => setIsServerOnline(true))
      .catch(() => setIsServerOnline(false))
      .finally(() => setLoading(false));
  }, [server]);

  const serverRemoveHandler = () => {
    setLoading(true);

    invoke('delete_server', { id: server.id })
      .then(() => {
        showToast({ title: 'Removed server successfully', status: 'info' });
        deleteServer(server.id);
      })
      .catch((err) => {
        showToast({
          title: 'Failed to remove server',
          description: err,
          status: 'error',
          duration: 5000,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Flex
      className='w-full bg-app-dark3 px-5 py-4 rounded-md border-2 border-app-dark4 border-opacity-50'
      alignItems='center'
      justifyContent='space-between'
      mb={2}
    >
      <Flex alignItems='center'>
        <img src={SnorlaxLogo} className='w-12' alt='' />
        <div className='ml-3'>
          <h3 className='font-medium text-app-text text-lg'>{server.name}</h3>
          <p className='text-app-text2'>{server.connection}</p>
        </div>
      </Flex>
      <Flex alignItems='center'>
        <div className='bg-app-dark4 py-2 px-3 rounded-md flex items-center'>
          <div
            className={`p-1 border-2 rounded-full mr-1.5 ${
              loading
                ? 'border-app-text2 bg-app-text2'
                : isServerOnline
                ? 'border-teal-300 bg-teal-300'
                : 'border-rose-400 bg-rose-400'
            }`}
          />
          <p className='text-app-text2'>
            {loading ? 'Loading' : isServerOnline ? 'Online' : 'Offline'}
          </p>
        </div>
        <PermissionWrapper
          description='Are you sure you want to remove this server from your list ? You can add server later.'
          placeholder='Remove server'
          onClick={serverRemoveHandler}
        >
          <Tooltip
            label='Delete server'
            className='bg-app-dark3 border border-app-dark4 text-app-text'
          >
            <IconButton
              mx={2}
              aria-label='Delete server'
              className='bg-app-dark4 text-app-text hover:opacity-60'
              icon={<FiTrash2 className='text-lg' />}
            />
          </Tooltip>
        </PermissionWrapper>
        <Tooltip
          label='Edit server details'
          className='bg-app-dark3 border border-app-dark4 text-app-text'
        >
          <IconButton
            aria-label='Edit server'
            className='bg-app-dark4 text-app-text hover:opacity-60'
            icon={<FiEdit className='text-lg' />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
