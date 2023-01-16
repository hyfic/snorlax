import { getDirectory } from '@/api/file.api';
import { create } from 'zustand';
import { FileType } from '@/types/file.type';
import { showToast } from '@/utils/showToast';

interface FilesStore {
  files: FileType[];
  selectedFile: FileType | null;
  loading: boolean;
  setSelectedFile: (selectedFile: FileType | null) => void;
  loadFiles: (connection: string, path: string) => void;
}

export const useFilesStore = create<FilesStore>((set) => ({
  files: [],
  selectedFile: null,
  loading: false,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  loadFiles(connection, path) {
    set({ loading: true, files: [] });
    getDirectory(connection, path)
      .then(({ data }) => set({ files: data || [] }))
      .catch((err) => {
        set({ files: [] });
        showToast({
          title: 'Failed to load files',
          description: err?.message,
          status: 'error',
          duration: 5000,
        });
      })
      .finally(() => set({ loading: false }));
  },
}));
