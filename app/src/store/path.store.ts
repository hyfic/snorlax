import { create } from 'zustand';

interface PathStore {
  pathName: string;
  path: string;
  setPath: (path: string) => void;
}

export const usePathStore = create<PathStore>((set) => ({
  pathName: 'home',
  path: '/',
  setPath: (path) => {
    let paths = path.split('/');
    set({
      path,
      pathName: paths[paths.length - 1] || 'home',
    });
  },
}));
