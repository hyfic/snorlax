import { useEffect, useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { invoke } from '@tauri-apps/api';
import { showToast } from '@/utils/showToast';
import { useServerStore } from '@/store/server.store';
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

export const AddServerWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const { loadServers } = useServerStore();

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

  const onClose = () => {
    setLoading(false);
    setConnection('');
    setServerName('');
    setIdx(0);
    setServerURL('');
    setServerIP('');
    setServerPort('');
    setServerProtocol('http');
    closeModal();
  };

  const addServerHandler = () => {
    setLoading(true);

    invoke('add_server', { connection, name: serverName })
      .then((id: any) => {
        showToast({
          title: 'Added server successfully',
          status: 'info',
        });
        onClose();
        loadServers(id);
      })
      .catch((err) => {
        showToast({
          title: 'Failed to add server',
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
          <ModalHeader>Add server</ModalHeader>
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
              Add server
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
