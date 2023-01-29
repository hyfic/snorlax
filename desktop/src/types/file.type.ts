export interface FileType {
  name: string;
  isDir: boolean;
}

export interface FileInfoType {
  name: string;
  isDir: boolean;
  size: number;
  lastModified: number;
}
