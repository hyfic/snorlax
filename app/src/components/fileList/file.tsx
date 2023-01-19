import React from 'react';
import FolderIcon from '@/assets/folder.svg';
import { FileType } from '@/types/file.type';
import { FileIcon } from 'react-file-icon';
import { useFileListStore } from '@/store/filelist.store';
import { useFilesStore } from '@/store/files.store';
import { getFileIcon } from '@/utils/icon';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { RenameWrapper } from './renameWrapper';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { HiOutlineEye } from 'react-icons/hi2';
import { DeleteWrapper } from './deleteWrapper';

interface Props {
  file: FileType;
}

export const File: React.FC<Props> = ({ file }) => {
  const { path, setPath } = useFileListStore();
  const { setSelectedFile, selectedFile } = useFilesStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileClick = () => {
    if (file.isDir) {
      setSelectedFile(null);
      setPath(path + `${path === '/' ? '' : '/'}` + file.name);
    } else {
      setSelectedFile(file);
    }
  };

  window.oncontextmenu = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Tooltip
        label={file.name}
        className='bg-app-dark3 border border-app-dark4 text-app-text'
      >
        <a href='#top' className='w-full'>
          <div
            onContextMenu={onOpen}
            onClick={handleFileClick}
            className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:opacity-60 group'
          >
            <div className='h-fit w-16 relative'>
              <FileIcon
                foldColor={file.isDir ? '#1E2330' : '#343B50'}
                color={file.isDir ? '#1E2330' : '#2A3146'}
                gradientColor={file.isDir ? '#1E2330' : '#2A3146'}
              />
              <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                {file.isDir ? (
                  <img src={FolderIcon} className='w-full' />
                ) : (
                  <img
                    src={getFileIcon(file.name.toLowerCase()).iconPath}
                    alt=''
                    className='w-2/3'
                  />
                )}
              </div>
            </div>

            <div className='mt-3 w-full'>
              <p
                className={`truncate text-center p-1 text-app-text2 border  font-medium ${
                  selectedFile?.name === file.name
                    ? 'bg-app-dark3 border border-app-dark4 rounded-md'
                    : 'border-app-dark2'
                }`}
              >
                {file.name}
              </p>
            </div>
          </div>
        </a>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} size='xs' isCentered>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <ModalHeader>{file.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex items-center justify-center w-full mb-5 py-5 bg-app-dark2 rounded-lg'>
              <div className='h-fit w-1/3 relative'>
                <FileIcon
                  foldColor={file.isDir ? '#1E2330' : '#343B50'}
                  color={file.isDir ? '#1E2330' : '#2A3146'}
                  gradientColor={file.isDir ? '#1E2330' : '#2A3146'}
                />
                <div className='absolute top-0 w-full h-full flex items-center justify-center'>
                  {file.isDir ? (
                    <img src={FolderIcon} className='w-full' />
                  ) : (
                    <img
                      src={getFileIcon(file.name.toLowerCase()).iconPath}
                      alt=''
                      className='w-2/3'
                    />
                  )}
                </div>
              </div>
            </div>
            <Button
              leftIcon={<HiOutlineEye className='text-sm' />}
              w='full'
              className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
              onClick={() => {
                onClose();
                handleFileClick();
              }}
            >
              Open {file.isDir ? 'folder' : 'file'}
            </Button>
            <RenameWrapper selectedFile={file} afterRename={onClose}>
              <Button
                leftIcon={<FiEdit className='text-xs' />}
                w='full'
                mt={2}
                className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
              >
                Rename {file.isDir ? 'folder' : 'file'}
              </Button>
            </RenameWrapper>
            <DeleteWrapper selectedFile={file} afterDelete={() => onClose()}>
              <Button
                leftIcon={<FiTrash2 className='text-sm' />}
                w='full'
                mt={2}
                className='bg-app-dark4 transition-all duration-200 hover:bg-app-dark4/60'
              >
                Delete {file.isDir ? 'folder' : 'file'}
              </Button>
            </DeleteWrapper>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
