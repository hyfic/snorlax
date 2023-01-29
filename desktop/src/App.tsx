import React from 'react';
import { AppLayout } from './components/appLayout';
import { Paths } from './utils/paths';
import { FileListPage } from './pages/fileListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsPage } from './pages/settingsPage';
import { ServerPage } from './pages/serverPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path={Paths.fileList} element={<FileListPage />} />
          <Route path={Paths.server} element={<ServerPage />} />
          <Route path={Paths.settings} element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
