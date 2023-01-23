import { useEffect, useState } from 'react';
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

  const { renameFile: renameStoreFile, files } = useFilesStore();
  const { selectedServer } = useServerStore();
  const { path } = useFileListStore();

  const [fileName, setFileName] = useState(selectedFile.name);
  const [isThereDuplicate, setIsThereDuplicate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fileName === selectedFile.name) {
      setIsThereDuplicate(false);
      return;
    }

    let duplicate = files.filter((f) => f.name === fileName);
    setIsThereDuplicate(duplicate.length !== 0);
  }, [fileName]);

  const onClose = (name?: string) => {
    setFileName(name || selectedFile.name);
    closeModal();
  };

  const renameFileHandler = () => {
    setLoading(true);

    if (!selectedServer) return;

    renameFile(selectedServer.connection, {
      oldPath: `${path}/${selectedFile.name}`,
      newPath: `${path}/${fileName}`,
    })
      .then(() => {
        showToast({
          title: `Renamed ${
            selectedFile.isDir ? 'folder' : 'file'
          } successfully`,
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
          title: `Failed to rename ${selectedFile.isDir ? 'folder' : 'file'}`,
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
              autoFocus
            />
            {isThereDuplicate && (
              <p className='mt-2 text-rose-300'>
                {selectedFile.isDir ? 'Folder' : 'File'} already exists, change{' '}
                {selectedFile.isDir ? 'folder name' : 'filename'}
              </p>
            )}
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
              disabled={
                loading ||
                fileName.trim().length === 0 ||
                isThereDuplicate ||
                fileName === selectedFile.name
              }
              isLoading={loading}
              onClick={renameFileHandler}
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
