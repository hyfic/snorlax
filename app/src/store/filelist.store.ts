import { create } from 'zustand';

interface FileListStore {
  path: string;
  setPath: (path: string) => void;
}

export const useFileListStore = create<FileListStore>((set) => ({
  path: '/',
  setPath: (path) => set({ path }),
}));
