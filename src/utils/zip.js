import JSZip from 'jszip'
import {loadLib}  from './index'

import {  getFileType, isResource } from './file'
export const loadZipFile = async function (
  url,
  fs,
  cb
) {
  const zipBuffer = await loadFileBuffer(url);
  const zipFile = await JSZip.loadAsync(zipBuffer);
  const { files } = zipFile;
  // const materialInfo = files['/material.json']
  // let depVersion = null;
  fs.resetFile();
  // if (materialInfo) {
  //   // 解析出依赖的版本
  //   const materialStr = new TextDecoder().decode(
  //     materialInfo._data.compressedContent,
  //   );
  //   // depVersion = JSON.parse(materialStr);
  // }
  for (const key in files) {
    const element = files[key];
    if (!element.dir) {
      let { compressedContent } = (element )._data;
      const fileType = getFileType(key).type;
      if (isResource(fileType)) {
        //  buffer => file => url
        fs.saveToLs(key, compressedContent);
      } else {
        const context = new TextDecoder().decode(compressedContent);
        if (key.startsWith('/lib/')) {
          // 库
          // const libName = getFileType(key).name;
          // const lib = depVersion.dependencies[libName];
          // depStore.addDep(libName, lib);
          loadLib( context );
        } else {
          // 代码
          fs.saveToLs(key, context);
        }
      }
    }
  }
  cb && cb();
};
export const loadFileBuffer = function (url){
  const req = new Request(url, { method: 'GET' });
  return new Promise((resolve) => {
    fetch(req).then((res) => resolve(res.arrayBuffer()));
  });
};
