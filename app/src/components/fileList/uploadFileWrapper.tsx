import React, { useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { showToast } from '@/utils/showToast';
import { useFilesStore } from '@/store/files.store';
import { useServerStore } from '@/store/server.store';
import { useFileListStore } from '@/store/filelist.store';
import { uploadFile } from '@/api/file.api';
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

export const UploadFileWrapper: ReactComponent = ({ children }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const { addFile, files } = useFilesStore();
  const { selectedServer } = useServerStore();
  const { path } = useFileListStore();

  const imageInputRef = React.useRef<any>();

  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setFile(null);
    closeModal();
  };

  const handleFileUpload = () => {
    setLoading(true);

    if (!selectedServer || !file) return;

    let fileName = file.name;
    let duplicate = files.filter((f) => f.name === file.name);

    if (duplicate.length > 0) {
      fileName = duplicate[0].name;

      let split = fileName.split('.');

      if (split.length > 1) {
        let ext = split[split.length - 1];
        split.pop();
        fileName = split.join('.') + ' (1).' + ext;
      } else {
        fileName = fileName + ' (1)';
      }
    }

    uploadFile(selectedServer.connection, path, file, fileName)
      .then(({ data }) => {
        showToast({
          title: 'Uploaded file successfully',
          status: 'success',
        });
        console.log(data);
        addFile({
          name: fileName,
          isDir: false,
        });
        onClose();
      })
      .catch((err) => {
        showToast({
          title: 'Failed to upload file',
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
          <ModalHeader>Upload file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant='filled'
              placeholder='File name'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              disabled={loading}
            />
            <Button
              mt={2}
              w='full'
              className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
              onClick={() => imageInputRef.current.click()}
              disabled={loading}
            >
              {file?.name || 'Select a file'}
            </Button>

            <input
              type='file'
              ref={imageInputRef}
              className='hidden'
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  setFile(null);
                  return;
                }

                let file = e.target.files[0];
                setFile(file);
              }}
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
              disabled={loading || file == null}
              isLoading={loading}
              onClick={handleFileUpload}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Upload file
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
