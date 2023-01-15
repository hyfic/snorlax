import { create } from 'zustand';

interface FileListStore {
  pathName: string;
  path: string;
  view: 'grid' | 'view';
  setPath: (path: string) => void;
  setView: (view: 'grid' | 'view') => void;
}

export const useFileListStore = create<FileListStore>((set) => ({
  pathName: 'home',
  path: '/',
  view: 'grid',
  setPath: (path) => {
    let paths = path.split('/');
    set({
      path,
      pathName: paths[paths.length - 1] || 'home',
    });
  },
  setView: (view) => set({ view }),
}));
