import {getExt} from "src/utils/utils";

export const fileType = (file: string) => {
  if(!file) return '';
  const extensionLists = {
    video: ['m4v', 'avi','mpg','mp4', 'webm', 'mkv', 'mp3'],
    image: ['jpg', 'gif', 'bmp', 'png', 'svg'],
  };

  const ext = getExt(file);

  if(extensionLists.video.includes(ext)) return 'video';

  if(extensionLists.image.includes('ext')) return 'image';

  return '';

}
