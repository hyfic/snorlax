import iconsSchema from './icons';

export const getFileIcon = (fileName: string) => {
  let nameSplit = fileName.split('.');
  let ext = nameSplit[nameSplit.length - 1];

  let iconKey =
    iconsSchema.fileNames[fileName as keyof typeof iconsSchema.fileNames] ||
    iconsSchema.fileExtensions[ext as keyof typeof iconsSchema.fileExtensions];

  let icon =
    iconsSchema.iconDefinitions[
      iconKey as keyof typeof iconsSchema.iconDefinitions
    ] || iconsSchema.iconDefinitions._file;

  return icon;
};
