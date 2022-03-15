export const MIME_TYPES = {
  js: 'application/javascript',
  css: 'text/css',
  apng: 'image/apng',
  pdf: 'application/pdf',
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  webm: 'audio/webm',
  wave: 'audio/wave',
  wav: 'video/wav',
  ogg: 'video/ogg',
  mp4: 'video/mp4',
  mp3: 'audio/mp3',
};
export const getFileType = function (path) {
  const splitRes = path.split('.');
  const splitLine = path.split('/');
  const filePostfix = splitRes[splitRes.length - 1];
  const name = splitLine[splitLine.length - 1];
  return {
    type: filePostfix,
    name,
  };
};
export const fileTransform = function (
  fileSys
){
  let ret = {};
  const { files } = fileSys;
  for (const item in files) {
    const val = files[item];
    if (typeof val.target === 'string') {
      // 字符串的文件
      ret[item] = val.target;
    } else {
      ret[item] = val.url;
    }
  }
  return ret;
};
export const isImgFile = function (path) {
  return ['gif', 'jpeg', 'png', 'jpg', 'bmp'].some((i) =>
    path.endsWith(`.${i}`),
  );
};
export const isResource = function (type) {
  const typeArr = type.split('.');
  const fileType = typeArr[typeArr.length - 1];
  return [
    'gif',
    'jpeg',
    'png',
    'jpg',
    'bmp',
    'img',
    'mp4',
    'mp3',
    'pdf',
    'word',
    'exal',
    'ps',
    'mov',
  ].some((i) => i === fileType);
};
export const fileAdapter = function (
  file,
  name,
  mimeType,
) {
  if (file.constructor === File) {
    return window.URL.createObjectURL(file);
  } else if (file.constructor === Uint8Array) {
    // jszip压缩后的buffer格式
    const _file = new File([file], name, {
      type: mimeType,
    });
    return window.URL.createObjectURL(_file);
  } else if (file.constructor === String) {
    return file;
  }
  return '';
};
const path2UrlMap = {}
export const resolveFile = function (
  path,
  content,
  cb,
) {
  // buffer处理图片等其他文件流， 字符串处理文本内容
  const isImg = isImgFile(path);
  const fileInfo = getFileType(path);
  const fileType = isImg ? 'img' : fileInfo.type; // 忽略图片的类型差异， 全部保存为img(方便做判断)
  const isRes = isResource(fileType); // 是资源类型生成url做预览和持久化
  let url = '';
  if (isRes) {
    url = fileAdapter(content, fileInfo.name, MIME_TYPES[fileInfo.type]);
  }
  if (fileInfo.type) {
    path2UrlMap[path] = '';
    cb &&
      cb(url, {
        type: fileType,
        compiled: true,
        result: '',
        name: fileInfo.name,
      });
  } else {
    console.error(
      `unkonw fileType in file on path ${path}, please provide a include file postfix name before upload`,
    );
  }
};
