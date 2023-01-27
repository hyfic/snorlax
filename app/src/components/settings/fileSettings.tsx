import React from 'react';
import { useFileListStore } from '@/store/filelist.store';
import { Select } from '@chakra-ui/react';

export const FileSettings: React.FC = () => {
  const { view, setView } = useFileListStore();

  return (
    <div>
      <div>
        <h1 className='text-2xl font-semibold'>Files</h1>
        <p className='text-app-text opacity-50 mt-1'>
          Manage the display of files.
        </p>
      </div>
      <div className='mt-5'>
        <p className='font-medium'>File view</p>
        <Select
          mt={2}
          w='fit-content'
          variant='filled'
          className='bg-app-dark3'
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value='grid'>Grid</option>
          <option value='list'>List</option>
        </Select>
      </div>
    </div>
  );
};
