import { create } from 'zustand';

interface FilePageStore {
  pathName: string;
  path: string;
  searchQuery: string;
  setPath: (path: string) => void;
  setSearchQuery: (searchQuery: string) => void;
}

export const useFilePageStore = create<FilePageStore>((set) => ({
  pathName: 'home',
  path: '/',
  searchQuery: '',
  setPath: (path) => {
    let paths = path.split('/');
    set({
      path,
      pathName: paths[paths.length - 1] || 'home',
      searchQuery: '', // clearing search field
    });
  },
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
