const fsp = require('fs-promise');


/*
 * 获得文件内容
 */
function read(dirpath) {
  return fsp.stat(dirpath)
  .then(() => {
    return fsp.readFile(dirpath, 'utf8');
  })
  .then(content => {
    return JSON.parse(content);
  })
  .catch(err => {
    return Promise.reject(err);
  });
}

/**
 * 创建导出目录docs
 */
function mkDir(dirpath) {
  return fsp.stat(dirpath).then(() => {
    return Promise.resolve(dirpath);
  }).catch(() => {
    return fsp.mkdirs(dirpath);
  });
}

module.exports = {
  read,
  mkDir,
};
