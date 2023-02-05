import { FileType } from '@/types/file.type';
import { ReactComponent } from '@/types/react.type';
import { useServerStore } from '@/store/server.store';
import { useFilePageStore } from '@/store/filepage.store';
import { deleteFile } from '@/api/file.api';
import { useFilesStore } from '@/store/files.store';
import { showToast } from '@/utils/showToast';
import { PermissionWrapper } from '../permissionWrapper';

interface Props {
  selectedFile: FileType;
  afterDelete?: () => void;
}

export const DeleteWrapper: ReactComponent<Props> = ({
  children,
  selectedFile,
  afterDelete,
}) => {
  const { selectedServer } = useServerStore();
  const { path } = useFilePageStore();
  const { deleteFile: deleteFileFromStore } = useFilesStore();

  const deleteFileHandler = () => {
    if (!selectedServer || !selectedFile) return;

    deleteFile(selectedServer?.connection, path, selectedFile?.name)
      .then(() => {
        deleteFileFromStore(selectedFile);
        showToast({
          title: 'Deleted file successfully',
          status: 'success',
        });

        if (afterDelete) {
          afterDelete();
        }
      })
      .catch((err) => {
        showToast({
          title: 'Failed to delete file',
          description: err?.response?.data?.message || err?.message,
          duration: 5000,
          status: 'error',
        });
      });
  };

  return (
    <PermissionWrapper
      description="Are you sure you want to delete this file ? This action can't be undone."
      placeholder={`Delete ${selectedFile.isDir ? 'folder' : 'file'}`}
      onClick={deleteFileHandler}
    >
      {children}
    </PermissionWrapper>
  );
};
