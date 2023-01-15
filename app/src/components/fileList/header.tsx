import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useFileListStore } from '@/store/filelist.store';
import { FiFolderPlus, FiSearch, FiUpload } from 'react-icons/fi';
import { useServerStore } from '@/store/server.store';
import { BiChevronDown } from 'react-icons/bi';
import { ServerStatus } from '../serverOptions/serverStatus';
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';

export const Header: React.FC = () => {
  const { selectedServer } = useServerStore();
  const { pathName, searchQuery, setSearchQuery } = useFileListStore();

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
              disabled={pathName == '/'}
            />
          </Tooltip>
          <div className='mx-1 bg-app-dark3 px-3 py-2 rounded-md border border-app-dark4'>
            <p className='text-app-text font-medium'>{pathName}</p>
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
              disabled={pathName == '/'}
            />
          </Tooltip>
        </Flex>
        <InputGroup w='fit-content'>
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
        <Flex alignItems='center'>
          <ServerStatus
            connection={selectedServer?.connection || null}
            refetchBtnToolTip='Refetch files'
            onRefetchBtnClick={() => {}}
          />
          <div>
            <Button
              mx={1}
              leftIcon={<FiUpload />}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Upload file
            </Button>
          </div>
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
