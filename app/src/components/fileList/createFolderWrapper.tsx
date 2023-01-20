import { useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { createFolder } from '@/api/file.api';
import { showToast } from '@/utils/showToast';
import { useFilesStore } from '@/store/files.store';
import { useServerStore } from '@/store/server.store';
import { useFileListStore } from '@/store/filelist.store';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  afterCreate?: () => void;
}

export const CreateFolderWrapper: ReactComponent<Props> = ({
  afterCreate,
  children,
}) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const { addFile } = useFilesStore();
  const { selectedServer } = useServerStore();
  const { path } = useFileListStore();

  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setFolderName('');
    closeModal();
  };

  const createFolderHandler = () => {
    setLoading(true);

    if (!selectedServer) return;

    createFolder(selectedServer.connection, path, folderName)
      .then(() => {
        showToast({
          title: 'Created folder successfully',
          status: 'success',
        });
        addFile({
          name: folderName,
          isDir: true,
        });
        onClose();

        if (afterCreate) {
          afterCreate();
        }
      })
      .catch((err) => {
        showToast({
          title: 'Failed to create folder',
          description: err?.message,
          status: 'error',
          duration: 5000,
        });
        onClose();
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => onClose()}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>Create folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='Folder name'
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={loading}
              variant='outline'
              mr={2}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              disabled={loading || folderName.trim().length === 0}
              isLoading={loading}
              onClick={createFolderHandler}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Create folder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};