export const imageExtensions = [
  'jpeg',
  'jpg',
  'gif',
  'svg',
  'png',
  'bmp',
  'tiff',
  'ico',
];

export const isImage = (fileName: string) => {
  let fileNameSplit = fileName.split('.');
  let ext = fileNameSplit[fileNameSplit.length - 1];

  return imageExtensions.includes(ext);
};
