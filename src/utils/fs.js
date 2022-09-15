import { resolveFile } from './file';

class FileSystem{
  activeFile (item) {
    this.activeKey = item.path;
    const fileItem = this.files[item.path];
    fileItem && this.actives.add(fileItem);
  };
  updateFile (path, context) {
    if (this.files[path]) {
      this.files[path].target = context;
    }
  };
  reloadFile() {
    // hack 触发file对象对应的依赖组件重新刷新
    this.files = { ...this.files };
  };
  resetFile () {
    this.files = {};
    this.actives = new Set();
    this.activeKey = '';
  };
  removeFile(perfix) {
    const item = this.files[perfix];
    item && delete this.files[perfix];
    this.removeActiveItem(item);
  };
  removeActiveItem(item)  {
    this.actives.delete(item);
  };
 removeFolder (perfix) {
    for (const key in this.files) {
      const file = this.files[key];
      if (file.path.startsWith(perfix)) {
        // should check path props, in fileTree.tsx can change the filename
        delete this.files[key];
        this.removeActiveItem(file);
      }
    }
  };
  saveToLs(path, content) {
    // 数据写入stroge, 只有ctrl + s 的时候才会保存， onchange参数写入内存，没必要每次都保存到硬盘， 做持久化存储
    resolveFile(
      path,
      content,
      (
        url,
        other,
      ) => {
        this.files[path] = {
          url,
          target: content,
          path,
          ...other,
        };
      },
    );
  };
}

// loadZipFile('/test.zip', fs, () => {
//   fs.activeFile(fs.files['/index.vue']);
// });
// window.fs = fs
export default FileSystem;
