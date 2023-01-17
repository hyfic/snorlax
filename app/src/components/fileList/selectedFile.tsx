import React, { useEffect, useState } from 'react';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';
import { useFilesStore } from '@/store/files.store';
import { FileIcon } from 'react-file-icon';
import { getFileIcon } from '@/utils/icon';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { FiDownload } from 'react-icons/fi';
import { useFileListStore } from '@/store/filelist.store';
import { useServerStore } from '@/store/server.store';
import { FileInfoType } from '@/types/file.type';
import { getFileInfo } from '@/api/file.api';
import {
  Button,
  Divider,
  Flex,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

export const SelectedFile: React.FC = () => {
  const { selectedFile, setSelectedFile } = useFilesStore();
  const { path } = useFileListStore();
  const { selectedServer } = useServerStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [fileInfo, setFileInfo] = useState<FileInfoType | null>(null);

  useEffect(() => {
    if (!selectedFile || !selectedServer) return;

    getFileInfo(selectedServer.connection, path, selectedFile.name)
      .then(({ data }) => {
        setFileInfo(data);
      })
      .catch(console.log);
  }, [selectedFile]);

  return !selectedFile ? null : (
    <>
      <div className='ml-5'>
        <div className='w-60 bg-app-dark1 px-5 py-8 rounded-lg flex items-center justify-center'>
          <div className='h-fit w-2/3 relative'>
            <FileIcon
              foldColor={'#343B50'}
              color={'#2A3146'}
              gradientColor={'#2A3146'}
            />
            <div className='absolute top-0 w-full h-full flex items-center justify-center'>
              <img
                src={getFileIcon(selectedFile.name.toLowerCase()).iconPath}
                alt=''
                className='w-2/3'
              />
            </div>
          </div>
        </div>
        <div className='mt-2 w-60 bg-app-dark3 border border-app-dark4 p-3 rounded-lg'>
          <p className='font-medium text-app-text'>{selectedFile.name}</p>
          <Flex mt={3} alignItems='center'>
            <Tooltip
              label='Add to favorites'
              className='bg-app-dark3 border border-app-dark4 text-app-text'
            >
              <IconButton
                aria-label='Favorite'
                variant='ghost'
                className='hover:bg-app-dark4'
                icon={<AiOutlineHeart className='text-xl text-app-text' />}
              />
            </Tooltip>
            <Tooltip
              label='Preview / Download'
              className='bg-app-dark3 border border-app-dark4 text-app-text'
            >
              <IconButton
                aria-label='Preview file'
                variant='ghost'
                className='hover:bg-app-dark4'
                icon={<HiOutlineEye className='text-xl text-app-text' />}
                onClick={onOpen}
              />
            </Tooltip>
            <Tooltip
              label='Close viewer'
              className='bg-app-dark3 border border-app-dark4 text-app-text'
            >
              <IconButton
                aria-label='Favorite'
                variant='ghost'
                className='hover:bg-app-dark4'
                icon={<IoMdClose className='text-xl text-app-text' />}
                onClick={() => setSelectedFile(null)}
              />
            </Tooltip>
          </Flex>
          {fileInfo && (
            <>
              <Divider my={3} className='border-app-text border-opacity-20' />
              <h2 className='text-app-text font-medium'>File Size</h2>
              <p className='text-app-text2'>{prettyBytes(fileInfo.size)}</p>
              <Divider my={3} className='border-app-text border-opacity-20' />
              <h2 className='text-app-text font-medium'>Last modified</h2>
              <p className='text-app-text2'>
                {moment(fileInfo.lastModified).format('lll')}
              </p>
            </>
          )}
          <Divider my={3} className='border-app-text border-opacity-20' />
          <a
            href={`${selectedServer?.connection}/file/download?path=${
              path + '/' + selectedFile.name
            }&name=${selectedFile.name}`}
            download={selectedFile.name}
          >
            <Button
              leftIcon={<FiDownload />}
              className='w-full text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Download
            </Button>
          </a>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='full'>
        <ModalOverlay />
        <ModalContent className='bg-app-dark3'>
          <div className='relative w-full h-screen p-10 pt-16'>
            <Button
              leftIcon={<IoMdClose className='text-lg text-app-text' />}
              className='absolute right-10 top-3 bg-app-dark4 hover:bg-app-dark4/60'
              onClick={onClose}
            >
              Close preview
            </Button>
            <iframe
              src={`${selectedServer?.connection}/storage/${path}/${selectedFile.name}`}
              className='w-full h-full bg-app-dark2'
              allowFullScreen={true}
            >
              No preview
            </iframe>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
