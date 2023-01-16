import { create } from 'zustand';

interface FileListStore {
  pathName: string;
  path: string;
  view: 'grid' | 'view';
  searchQuery: string;
  setPath: (path: string) => void;
  setView: (view: 'grid' | 'view') => void;
  setSearchQuery: (searchQuery: string) => void;
}

export const useFileListStore = create<FileListStore>((set) => ({
  pathName: 'home',
  path: '/',
  view: 'grid',
  searchQuery: '',
  setPath: (path) => {
    let paths = path.split('/');
    set({
      path,
      pathName: paths[paths.length - 1] || 'home',
      searchQuery: '', // clearing search field
    });
  },
  setView: (view) => set({ view }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
