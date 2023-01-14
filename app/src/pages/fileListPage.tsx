import React from 'react';
import { Header } from '@/components/fileList/header';
import { ServerCheckerWrapper } from '@/components/serverCheckerWrapper';

export const FileListPage: React.FC = () => {
  return (
    <ServerCheckerWrapper>
      <Header />
    </ServerCheckerWrapper>
  );
};
