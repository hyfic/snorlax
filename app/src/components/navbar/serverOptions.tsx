import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAddCircleLine } from 'react-icons/ri';
import { Paths } from '@/utils/paths';
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

export const ServerOptions: React.FC = () => {
  return (
    <div>
      <Menu>
        <MenuButton
          w='full'
          textAlign='left'
          as={Button}
          rightIcon={<BiChevronDown />}
          className='bg-app-dark3 border-2 border-app-dark4'
        >
          Fadhil's server
        </MenuButton>
        <MenuList className='bg-app-dark3'>
          <MenuGroup title='Servers'>
            <Link to={Paths.fileList}>
              <MenuItem className='bg-app-dark3 hover:bg-app-dark4'>
                My server
              </MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title='Options'>
            <MenuItem
              className='bg-app-dark3 hover:bg-app-dark4'
              icon={<RiAddCircleLine className='text-lg' />}
            >
              Add server
            </MenuItem>
            <Link to={Paths.settings} replace>
              <MenuItem
                className='bg-app-dark3 hover:bg-app-dark4'
                icon={<IoSettingsOutline className='text-lg' />}
              >
                Server settings
              </MenuItem>
            </Link>
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  );
};
