import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiAddCircleLine } from 'react-icons/ri';
import { Paths } from '@/utils/paths';
import { ServerForm } from '../serverOptions/serverFormWrapper';
import { useServerStore } from '@/store/server.store';
import { useFilePageStore } from '@/store/filepage.store';
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
  const { setPath } = useFilePageStore();
  const { selectedServer, servers, loadServers, setSelectedServer } =
    useServerStore();

  const [menuPlaceholder, setMenuPlaceholder] = useState('No server selected');

  useEffect(loadServers, []);

  useEffect(() => {
    if (!selectedServer) {
      // select first element of databases if there is no selected database
      if (servers.length === 0) {
        setMenuPlaceholder('No server selected');
        return;
      }

      setSelectedServer(servers[0]);
      return;
    }

    setMenuPlaceholder(selectedServer.name);
  }, [selectedServer, servers]);

  return (
    <div>
      <Menu>
        <MenuButton
          w='full'
          textAlign='left'
          as={Button}
          rightIcon={<BiChevronDown className='text-2xl' />}
          className='bg-app-dark3 border-2 border-app-dark4'
          py={5}
        >
          {menuPlaceholder}
        </MenuButton>
        <MenuList className='bg-app-dark3'>
          {servers.length !== 0 && (
            <MenuGroup title=''>
              <div
                className={servers.length > 5 ? 'h-52 overflow-y-scroll' : ''}
              >
                {servers.map((server) => (
                  <MenuItem
                    key={server.id}
                    className='bg-app-dark3 hover:bg-app-dark4'
                    onClick={() => {
                      setSelectedServer(server);
                      setPath('/');
                      setMenuPlaceholder(server.name);
                    }}
                  >
                    {server.name}
                  </MenuItem>
                ))}
              </div>
            </MenuGroup>
          )}
          {servers.length !== 0 && <MenuDivider />}
          <MenuGroup title='Options'>
            <ServerForm>
              <MenuItem
                className='bg-app-dark3 hover:bg-app-dark4'
                icon={<RiAddCircleLine className='text-lg' />}
              >
                Add server
              </MenuItem>
            </ServerForm>
            <Link to={Paths.server} replace>
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
