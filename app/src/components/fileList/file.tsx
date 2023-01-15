import React from 'react';
import iconsSchema from '@/utils/icons';
import FolderIcon from '@/assets/folder.svg';
import { FileType } from '@/types/file.type';
import { FileIcon } from 'react-file-icon';
import { Tooltip } from '@chakra-ui/react';

interface Props {
  file: FileType;
}

export const File: React.FC<Props> = ({ file }) => {
  return (
    <Tooltip
      label={file.name}
      className='bg-app-dark3 border border-app-dark4 text-app-text'
    >
      <div className='flex flex-col items-center cursor-pointer transition-all duration-200 hover:opacity-60 group'>
        <div className='h-fit w-16 relative'>
          <FileIcon
            foldColor={file.isDir ? '#1E2330' : '#343B50'}
            color={file.isDir ? '#1E2330' : '#2A3146'}
            gradientColor={file.isDir ? '#1E2330' : '#2A3146'}
            labelColor={file.isDir ? '#1E2330' : '#343B50'}
            labelTextColor={file.isDir ? '#1E2330' : '#EEF3FB'}
            glyphColor={file.isDir ? '#1E2330' : '#5993E2'}
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
    </Tooltip>
  );
};

const getFileIcon = (fileName: string) => {
  let nameSplit = fileName.split('.');
  let ext = nameSplit[nameSplit.length - 1];

  let iconKey =
    iconsSchema.fileNames[fileName as keyof typeof iconsSchema.fileNames] ||
    iconsSchema.fileExtensions[ext as keyof typeof iconsSchema.fileExtensions];

  let icon =
    iconsSchema.iconDefinitions[
      iconKey as keyof typeof iconsSchema.iconDefinitions
    ] || iconsSchema.iconDefinitions._file;

  return icon;
};
