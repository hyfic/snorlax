import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useFileListStore } from '@/store/filelist.store';
import { FiFolderPlus, FiUpload } from 'react-icons/fi';
import { useServerStore } from '@/store/server.store';
import { pingServer } from '@/api/ping';
import { BiChevronDown } from 'react-icons/bi';
import {
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';

export const Header: React.FC = () => {
  const { selectedServer } = useServerStore();
  const { path } = useFileListStore();

  const [isServerOnline, setIsServerOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedServer) return;

    setLoading(true);
    pingServer(selectedServer.connection)
      .then(() => setIsServerOnline(true))
      .catch(() => setIsServerOnline(false))
      .finally(() => setLoading(false));
  }, [selectedServer]);

  return (
    <div>
      <Flex mt={3} alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Tooltip
            label='Go back'
            className='bg-app-dark3 border border-app-dark4 text-app-text'
          >
            <IconButton
              aria-label='back'
              className='hover:bg-app-dark4 text-app-text'
              variant='ghost'
              icon={<MdKeyboardArrowLeft className='text-3xl text-app-text2' />}
              disabled={path == '/'}
            />
          </Tooltip>
          <div className='mx-1 bg-app-dark3 px-3 py-2 rounded-md border border-app-dark4'>
            <p className='text-app-text font-medium'>{path}</p>
          </div>
          <Tooltip
            label='Go forward'
            className='bg-app-dark3 border border-app-dark4 text-app-text'
          >
            <IconButton
              aria-label='forward '
              className='hover:bg-app-dark4 text-app-text'
              variant='ghost'
              icon={
                <MdKeyboardArrowRight className='text-3xl text-app-text2' />
              }
              disabled={path == '/'}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems='center'>
          <div className='bg-app-dark3 border border-app-dark4 py-2 px-3 rounded-md flex items-center'>
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
          <Button
            mx={1}
            leftIcon={<FiUpload />}
            className='bg-app-accent border border-app-accent transition-all duration-200 hover:bg-app-accent/80 hover:border-app-accent/80'
          >
            Upload file
          </Button>
          <Menu>
            <MenuButton>
              <IconButton
                aria-label='forward '
                className='bg-app-dark3 text-app-text hover:opacity-80 border border-app-dark4'
                icon={<BiChevronDown className='text-2xl' />}
              />
            </MenuButton>
            <MenuList className='bg-app-dark3'>
              <MenuItem
                icon={<FiUpload className='text-lg' />}
                className='bg-app-dark3 hover:bg-app-dark4'
              >
                Upload file
              </MenuItem>
              <MenuItem
                icon={<FiFolderPlus className='text-lg' />}
                className='bg-app-dark3 hover:bg-app-dark4'
              >
                New folder
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </div>
  );
};
