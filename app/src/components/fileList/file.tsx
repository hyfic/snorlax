import React from 'react';
import FolderIcon from '@/assets/folder.svg';
import { FileType } from '@/types/file.type';
import { FileIcon } from 'react-file-icon';
import { useFileListStore } from '@/store/filelist.store';
import { Tooltip } from '@chakra-ui/react';
import { useFilesStore } from '@/store/files.store';
import { getFileIcon } from '@/utils/icon';

interface Props {
  file: FileType;
}

export const File: React.FC<Props> = ({ file }) => {
  const { path, setPath } = useFileListStore();
  const { setSelectedFile } = useFilesStore();

  const handleFileClick = () => {
    if (file.isDir) {
      setSelectedFile(null);
      setPath(path + `${path === '/' ? '' : '/'}` + file.name);
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <Tooltip
      label={file.name}
      className='bg-app-dark3 border border-app-dark4 text-app-text'
    >
      <a href='#top' className='w-full'>
        <div
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
            <p className='truncate text-center text-app-text2 font-medium'>
              {file.name}
            </p>
          </div>
        </div>
      </a>
    </Tooltip>
  );
};
