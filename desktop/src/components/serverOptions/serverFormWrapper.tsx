import validURl from 'valid-url';
import { useEffect, useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { ServerType } from '@/types/server.type';
import { invoke } from '@tauri-apps/api';
import { showToast } from '@/utils/showToast';
import { useServerStore } from '@/store/server.store';
import { useFilePageStore } from '@/store/filepage.store';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  server?: ServerType;
}

export const ServerForm: ReactComponent<Props> = ({ server, children }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const { loadServers } = useServerStore();
  const { setPath } = useFilePageStore();

  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState('');
  const [serverName, setServerName] = useState('');

  const [idx, setIdx] = useState(0);
  const [serverURL, setServerURL] = useState('');
  const [serverIP, setServerIP] = useState('');
  const [serverPort, setServerPort] = useState('');
  const [serverProtocol, setServerProtocol] = useState<'http' | 'https'>(
    'http'
  );

  useEffect(() => {
    if (idx == 0) {
      setConnection(serverURL);
    } else {
      if (serverIP.trim().length == 0 || serverPort.trim().length == 0) {
        setConnection('');
        return;
      }
      setConnection(`${serverProtocol}://${serverIP}:${serverPort}`);
    }
  }, [idx, serverURL, serverIP, serverPort, serverProtocol]);

  const setServerData = () => {
    if (!server) return;
    setServerName(server.name);
    let connectionSplit = server.connection.split(':');
    if (connectionSplit.length === 2) {
      setIdx(0);
      setServerURL(server.connection);
    }

    if (connectionSplit.length > 2) {
      setIdx(1);
      setServerProtocol(connectionSplit[0] as any);
      setServerIP(
        connectionSplit[1].split('/').filter((x) => x.trim().length !== 0)[0]
      );
      setServerPort(
        connectionSplit[2].split('/').filter((x) => x.trim().length !== 0)[0]
      );
    }
  };

  useEffect(setServerData, [server]);

  const onClose = () => {
    setLoading(false);
    if (!server) {
      setConnection('');
      setServerName('');
      setIdx(0);
      setServerURL('');
      setServerIP('');
      setServerPort('');
      setServerProtocol('http');
    } else {
      setServerData();
    }
    closeModal();
  };

  const addServerHandler = () => {
    // check if connection is a valid URL or not
    if (!validURl.isUri(connection)) {
      showToast({
        title: 'Invalid data',
        description: 'Please enter a valid data',
        status: 'error',
      });
      return;
    }

    setLoading(true);

    let data = server
      ? {
          id: server.id,
          connection,
          name: serverName,
        }
      : {
          connection,
          name: serverName,
        };

    invoke(server ? 'update_server' : 'add_server', data)
      .then((id: any) => {
        showToast({
          title: server
            ? 'Edited server details successfully'
            : 'Added server successfully',
          status: 'info',
        });
        onClose();
        loadServers(id);
        setPath('/');
      })
      .catch((err) => {
        showToast({
          title: server
            ? 'Failed to edit server details'
            : 'Failed to add server',
          description: err,
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>{server ? 'Edit server' : 'Add server'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='Server name'
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
            <Tabs
              mt={5}
              variant='soft-rounded'
              colorScheme='blue'
              onChange={setIdx}
              index={idx}
            >
              <TabList>
                <Tab>URL</Tab>
                <Tab>IP & PORT</Tab>
              </TabList>
              <TabPanels mt={5}>
                <TabPanel p={0}>
                  <Input
                    variant='filled'
                    placeholder='Server URL'
                    value={serverURL}
                    onChange={(e) => setServerURL(e.target.value)}
                  />
                </TabPanel>
                <TabPanel p={0}>
                  <Flex alignItems='center'>
                    <Select
                      variant='filled'
                      value={serverProtocol}
                      onChange={(e: any) => setServerProtocol(e.target.value)}
                    >
                      <option value='http'>http</option>
                      <option value='https'>https</option>
                    </Select>
                    <Input
                      variant='filled'
                      placeholder='Server IP'
                      value={serverIP}
                      onChange={(e) => setServerIP(e.target.value)}
                      mx={2}
                    />
                    <Input
                      variant='filled'
                      placeholder='Port'
                      value={serverPort}
                      onChange={(e) => setServerPort(e.target.value)}
                    />
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={loading}
              variant='outline'
              mr={2}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={
                loading ||
                connection.trim().length === 0 ||
                serverName.trim().length === 0
              }
              isLoading={loading}
              onClick={addServerHandler}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              {server ? 'Edit server' : 'Add server'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
