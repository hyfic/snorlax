import React from 'react';
import { Header } from '@/components/fileList/header';
import { ServerCheckerWrapper } from '@/components/serverCheckerWrapper';
import { Files } from '@/components/fileList/files';

export const FileListPage: React.FC = () => {
  return (
    <div>
      <ServerCheckerWrapper>
        <Header />
        <Files />
      </ServerCheckerWrapper>
    </div>
  );
};
