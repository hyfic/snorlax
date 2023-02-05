import React, { useEffect } from 'react';
import EmptyFolder from '@/assets/empty_folder.svg';
import { useFilePageStore } from '@/store/filepage.store';
import { useServerStore } from '@/store/server.store';
import { useFilesStore } from '@/store/files.store';
import { FileType } from '@/types/file.type';
import { File } from './file';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { SelectedFile } from './selectedFile';
import { FiUpload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { UploadFileWrapper } from './uploadFileWrapper';

export const Files: React.FC = () => {
  const { path, searchQuery } = useFilePageStore();
  const { files, loadFiles, loading } = useFilesStore();
  const { selectedServer } = useServerStore();

  useEffect(() => {
    if (!selectedServer) return;
    loadFiles(selectedServer.connection, path);
  }, [path, selectedServer]);

  return (
    <Flex mt={10} w='full'>
      <div className='w-full'>
        {loading && (
          <div className='h-[75vh] w-full flex flex-col items-center justify-center'>
            <Spinner />
          </div>
        )}
        {!loading && (
          <FileList
            files={files.filter((file) =>
              file.name
                .toLowerCase()
                .trim()
                .includes(searchQuery.toLowerCase().trim())
            )}
            loading={loading}
          />
        )}
      </div>
      <SelectedFile />
    </Flex>
  );
};

interface FileListProps {
  loading: boolean;
  files: FileType[];
}

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.005,
      staggerChildren: 0.005,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const FileList: React.FC<FileListProps> = ({ loading, files }) => {
  return (
    <>
      {!loading && files.length == 0 && (
        <div className='h-[75vh] w-full flex flex-col items-center justify-center'>
          <img src={EmptyFolder} alt='no files' className='w-24' />
          <h2 className='text-xl font-medium text-app-text'>
            No files in this directory !
          </h2>
          <div className='mt-2 w-full px-60 flex justify-center'>
            <p className='text-app-text opacity-60 text-center'>
              Maybe you can upload some files.
            </p>
          </div>
          <UploadFileWrapper>
            <Button
              mt={5}
              leftIcon={<FiUpload />}
              className='text-app-text bg-app-accent transition-all duration-200 hover:bg-app-accent/80'
            >
              Upload file
            </Button>
          </UploadFileWrapper>
        </div>
      )}
      <motion.div
        variants={container}
        className='w-full grid gap-5 grid-cols-3 md:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8'
        initial='hidden'
        animate='visible'
      >
        {files.map((file, idx) => (
          <motion.div key={idx} variants={item}>
            <File file={file} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
