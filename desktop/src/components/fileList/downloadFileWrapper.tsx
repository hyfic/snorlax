import { useEffect, useState } from 'react';
import { ReactComponent } from '@/types/react.type';
import { downloadDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { showToast } from '@/utils/showToast';
import { useServerStore } from '@/store/server.store';
import { useFilePageStore } from '@/store/filepage.store';
import { downloadFile } from '@/api/file.api';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  fileName: string;
}

export const DownloadFileWrapper: ReactComponent<Props> = ({
  children,
  fileName,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedServer } = useServerStore();
  const { path } = useFilePageStore();

  const [downloadLocation, setDownloadLocation] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    downloadDir().then((dir) => {
      setDownloadLocation(dir);
    });
  }, []);

  const handleFileDownload = () => {
    setLoading(true);

    if (!selectedServer) return;

    downloadFile(selectedServer.connection, path, fileName, (progressEvent) => {
      const { loaded, total } = progressEvent;
      if (!total) return;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        setProgress(percent);
      }
    })
      .then(async (res) => {
        writeBinaryFile(downloadLocation + fileName, res.data)
          .then(() => {
            showToast({
              title: 'Downloaded file successfully',
            });
          })
          .catch((err) => {
            console.log(err);
            showToast({
              title: 'Failed to download file',
            });
          });
      })
      .catch((err) => {
        console.log(err);
        showToast({
          title: 'Failed to download file',
          description: err?.response?.data?.message || err?.message,
          status: 'error',
          duration: 5000,
        });
        onClose();
      })
      .finally(() => setLoading(false));
  };

  const handleFolderSelect = () => {
    open({
      directory: true,
      defaultPath: downloadLocation,
      multiple: false,
      title: 'Select folder',
    })
      .then((val) => {
        if (typeof val == 'string') {
          setDownloadLocation(val);
          return;
        }

        setDownloadLocation('');
      })
      .catch((err) => {
        showToast({
          title: 'Failed to select folder',
          description: err?.message,
          status: 'error',
        });
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
          <ModalHeader>Download file</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tooltip
              label='Change download location'
              className='bg-app-dark3 border border-app-dark4 text-app-text'
              placement='top'
            >
              <Button
                w='full'
                className='bg-app-dark4 hover:bg-app-text2/10'
                onClick={handleFolderSelect}
              >
                {downloadLocation || 'Select download location'}
              </Button>
            </Tooltip>
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
            <Button variant='outline' mr={2} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={loading || downloadLocation.trim().length === 0}
              isLoading={loading}
              onClick={handleFileDownload}
              className='bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
