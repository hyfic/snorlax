import { getDirectory } from '@/api/file.api';
import { create } from 'zustand';
import { FileType } from '@/types/file.type';
import { showToast } from '@/utils/showToast';

interface FilesStore {
  files: FileType[];
  selectedFile: FileType | null;
  loading: boolean;
  setSelectedFile: (selectedFile: FileType | null) => void;
  addFile: (file: FileType) => void;
  deleteFile: (deletedFile: FileType) => void;
  renameFile: (oldName: string, newName: string) => void;
  loadFiles: (connection: string, path: string) => void;
}

export const useFilesStore = create<FilesStore>((set) => ({
  files: [],
  selectedFile: null,
  loading: false,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  addFile(file) {
    set((state) => ({
      files: [...state.files, file],
    }));
    set({ selectedFile: file.isDir ? null : file });
  },
  deleteFile(deletedFile) {
    set((state) => ({
      files: state.files.filter((file) => file.name !== deletedFile.name),
      selectedFile: null,
    }));
  },
  renameFile(oldName, newName) {
    set((state) => ({
      selectedFile: state?.selectedFile
        ? {
            name: newName,
            isDir: state.selectedFile?.isDir,
          }
        : null,
      files: state.files.map((file) => {
        if (file.name == oldName) {
          file.name = newName;
        }

        return file;
      }),
    }));
  },
  loadFiles(connection, path) {
    set({ loading: true, files: [] });
    getDirectory(connection, path)
      .then(({ data }) => set({ files: data || [] }))
      .catch((err) => {
        set({ files: [] });
        console.log(err);
        showToast({
          title: 'Failed to load files',
          description: err?.response?.data?.message || err?.message,
          status: 'error',
          duration: 5000,
        });
      })
      .finally(() => set({ loading: false }));
  },
}));
