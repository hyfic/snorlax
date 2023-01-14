import React from 'react';
import { AppLayout } from './components/appLayout';
import { Paths } from './utils/paths';
import { FileListPage } from './pages/fileListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={Paths.fileList} element={<FileListPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
