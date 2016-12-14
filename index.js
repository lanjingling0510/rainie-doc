#!/usr/bin/env node

/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

const path = require('path');
const colors = require('colors');
const childProcess = require('child_process');
const co = require('co');
const thunkify = require('thunkify');
const program = require('commander');
const generateDocsJson = require('./generateDocsJson.js');
const file = require('./lib/file.js');
const packageJson = require('./package.json');

const root = process.cwd();
// 生成文档目录
const docsPath = path.join(root, 'docs');

// 用户配置文件路径
let docJsonPath = path.join(root, 'rainie-doc.json');

program
  .version(packageJson.version)
  .description('前端自动文档页面生成工具')
  .option('-c , --config <file>', '配置文件路径')
  .parse(process.argv);

if (program.config) {
  docJsonPath = path.join(root, program.config);
}

main();

function main() {
  co(function * () {
    // 获得用户配置
    const docConfig = yield file.read(docJsonPath);
    // 创建导出目录docs
    yield file.mkDir(docsPath);
    // 生成docjson数据
    yield generateDocsJson(docConfig);
    // 复制docs resource到项目目录
    yield * copyDocsResource(docsPath);
    console.log('😁  Good Job!');
  }).catch(err => {
    console.log('😟  ' + err.message.red);
    process.exit(1);
  });
}

/**
 * 复制docs resource到项目目录
 */
function *copyDocsResource(dirpath) {
  const resourcePath = yield thunkify(getResourcePath)();
  yield thunkify(copyDir)(resourcePath, dirpath);
  console.log('✅  copy docs resource to: ./docs'.green);
}

function getResourcePath(callback) {
  const command = 'npm root -g';
  childProcess.exec(command, (err, stdout) => {
    const resource_path = path.join(stdout, 'rainie-doc/dist/*').replace(/\s/, '');
    callback(err, resource_path);
  });
}

function copyDir(src, dist, callback) {
  const command = `cp -a ${src} ${dist}`;
  childProcess.exec(command, (err, stdout) => {
    callback(err, stdout);
  });
}
