import { useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { FileType } from '@/types/file.type';
import { renameFile } from '@/api/file.api';
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
  selectedFile: FileType;
  afterRename?: () => void;
}

export const RenameWrapper: ReactComponent<Props> = ({
  selectedFile,
  afterRename,
  children,
}) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const { renameFile: renameStoreFile } = useFilesStore();
  const { selectedServer } = useServerStore();
  const { path } = useFileListStore();

  const [fileName, setFileName] = useState(selectedFile.name);
  const [loading, setLoading] = useState(false);

  const onClose = (name?: string) => {
    setFileName(name || selectedFile.name);
    closeModal();
  };

  const renameServerHandler = () => {
    setLoading(true);

    if (!selectedServer) return;

    renameFile(selectedServer.connection, {
      oldPath: `${path}/${selectedFile.name}`,
      newPath: `${path}/${fileName}`,
    })
      .then(() => {
        showToast({
          title: 'Renamed file successfully',
          status: 'success',
        });
        renameStoreFile(selectedFile.name, fileName);
        onClose(fileName);

        if (afterRename) {
          afterRename();
        }
      })
      .catch((err) => {
        showToast({
          title: 'Failed to rename file',
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
          <ModalHeader>Rename file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='File name'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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
              disabled={loading || fileName.trim().length === 0}
              isLoading={loading}
              onClick={renameServerHandler}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Rename {selectedFile.isDir ? 'folder' : 'file'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
