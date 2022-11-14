import {getExt} from "src/utils/utils";
import {FileProperty} from "src/graphql/types";

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

function formatBytes(a: number,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}`}

export function formatFilesSize(files: FileProperty[]) {
  return formatBytes(files.reduce((cum, cur) => cum + cur.size,0));
}
