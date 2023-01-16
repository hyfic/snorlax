import React, { useEffect } from 'react';
import { useFileListStore } from '@/store/filelist.store';
import { useServerStore } from '@/store/server.store';
import { useFilesStore } from '@/store/files.store';
import { FileType } from '@/types/file.type';
import { File } from './file';
import { Flex } from '@chakra-ui/react';
import { SelectedFile } from './selectedFile';

export const Files: React.FC = () => {
  const { path, searchQuery } = useFileListStore();
  const { files, loadFiles, loading } = useFilesStore();
  const { selectedServer } = useServerStore();

  useEffect(() => {
    if (!selectedServer) return;
    loadFiles(selectedServer.connection, path);
  }, [path, selectedServer]);

  return (
    <Flex mt={10} w='full'>
      <div className='w-full'>
        {loading && <p className='text-app-text2 font-medium'>Loading ...</p>}
        <FileList
          files={files.filter((file) =>
            file.name
              .toLowerCase()
              .trim()
              .includes(searchQuery.toLowerCase().trim())
          )}
          loading={loading}
        />
      </div>
      <SelectedFile />
    </Flex>
  );
};

interface FileListProps {
  loading: boolean;
  files: FileType[];
}

export const FileList: React.FC<FileListProps> = ({ loading, files }) => {
  const { selectedFile } = useFilesStore();

  return (
    <>
      {!loading && files.length == 0 && (
        <p className='text-app-text2 font-medium'>No files</p>
      )}
      <div
        className={`w-full grid gap-5 ${
          selectedFile ? 'grid-cols-5' : 'grid-cols-6'
        }`}
      >
        {files.map((file, idx) => (
          <File key={idx} file={file} />
        ))}
      </div>
    </>
  );
};
