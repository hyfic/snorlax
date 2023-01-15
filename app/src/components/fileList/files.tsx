import React, { useEffect, useState } from 'react';
import { usePathStore } from '@/store/path.store';
import { useServerStore } from '@/store/server.store';
import { FileType } from '@/types/file.type';
import { getDirectory } from '@/api/file.api';
import { File } from './file';
import { showToast } from '@/utils/showToast';

export const Files: React.FC = () => {
  const { path, setPath } = usePathStore();
  const { selectedServer } = useServerStore();

  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedServer) return;

    setLoading(true);

    getDirectory(selectedServer?.connection, path)
      .then(({ data }) => setFiles(data))
      .catch((err) => {
        showToast({
          title: 'Failed to load files',
          description: err?.message,
          status: 'error',
          duration: 5000,
        });
      })
      .finally(() => setLoading(false));
  }, [path, selectedServer]);

  return (
    <div className='mt-5 w-full'>
      {loading && <p className='text-app-text2 font-medium'>Loading ...</p>}
      {!loading && files.length == 0 && (
        <p className='text-app-text2 font-medium'>No files</p>
      )}
      <div className='mt-10 w-full grid grid-cols-6 gap-5'>
        {files.map((file, idx) => (
          <File key={idx} file={file} />
        ))}
      </div>
    </div>
  );
};
