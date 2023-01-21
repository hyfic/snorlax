import React, { useEffect, useState } from 'react';
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
  Progress,
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
  const [isThereDuplicate, setIsThereDuplicate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onClose = () => {
    setFile(null);
    setFileName('');
    setIsThereDuplicate(false);
    setProgress(0);
    closeModal();
  };

  const handleFileUpload = () => {
    setLoading(true);

    if (!selectedServer || !file) return;

    uploadFile(
      selectedServer.connection,
      path,
      file,
      fileName,
      (progressEvent) => {
        const { loaded, total } = progressEvent;
        if (!total) return;
        let percent = Math.floor((loaded * 100) / total);
        if (percent < 100) {
          setProgress(percent);
        }
      }
    )
      .then(() => {
        showToast({
          title: 'Uploaded file successfully',
          status: 'success',
        });
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

  useEffect(() => {
    let duplicate = files.filter((f) => f.name === fileName);
    setIsThereDuplicate(duplicate.length !== 0);
  }, [fileName]);

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
            {file && (
              <Input
                variant='filled'
                placeholder='File name'
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                disabled={loading}
              />
            )}
            {isThereDuplicate && (
              <p className='my-2 text-rose-300'>
                File already exists, change filename
              </p>
            )}
            <Button
              mt={file ? 2 : 0}
              w='full'
              className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
              onClick={() => imageInputRef.current.click()}
              disabled={loading}
            >
              {file?.name ? 'Change file' : 'Select a file'}
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
                setFileName(file.name);
              }}
            />
            {progress !== 0 && (
              <Progress
                value={progress}
                size='xs'
                mt={5}
                className='rounded-full'
                color='#5993E2'
              />
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
              disabled={loading || file == null || isThereDuplicate}
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
