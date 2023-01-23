import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import { ReactComponent } from '@/types/react.type';
import { FileInfoType, FileType } from '@/types/file.type';
import { FileIcon } from 'react-file-icon';
import { getFileIcon } from '@/utils/icon';
import {
  Button,
  Divider,
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
  path: string;
  file: FileType;
  fileInfo: FileInfoType | null;
}

export const FileInfoWrapper: ReactComponent<Props> = ({
  children,
  path,
  file,
  fileInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal size='xs' isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>{file.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='h-full flex items-center justify-center w-full mb-5 py-5 bg-app-dark2 rounded-lg'>
              <div className='h-fit w-1/3 relative'>
                <FileIcon
                  foldColor='#343B50'
                  color='#2A3146'
                  gradientColor='#2A3146'
                />
                <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                  <img
                    src={getFileIcon(file.name.toLowerCase()).iconPath}
                    alt=''
                    className='w-2/3'
                  />
                </div>
              </div>
            </div>
            <div className='mt-5'>
              <h2 className='text-app-text font-medium'>Full Path</h2>
              <p className='text-app-text2'>
                {path}
                {path != '/' && '/'}
                {file.name}
              </p>
              {fileInfo && (
                <>
                  <Divider
                    my={3}
                    className='border-app-text border-opacity-20'
                  />
                  <h2 className='text-app-text font-medium'>File Size</h2>
                  <p className='text-app-text2'>{prettyBytes(fileInfo.size)}</p>
                  <Divider
                    my={3}
                    className='border-app-text border-opacity-20'
                  />
                  <h2 className='text-app-text font-medium'>Last modified</h2>
                  <p className='text-app-text2'>
                    {moment(fileInfo.lastModified).format('lll')}
                  </p>
                </>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
