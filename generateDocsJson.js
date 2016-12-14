/**
 * Copyright (c) 2016-present, rainie, Inc.
 * All rights reserved.
 *
 * @flow
 */

const jsdoc2md = require('jsdoc-to-markdown');
const co = require('co');
const fsp = require('fs-promise');
const file = require('./lib/file.js');
const path = require('path');
const rootPath = process.cwd();

// 默认配置
const defaultConfig = {
  'github_url': '',
  'title': '',
  'categories': [],
  'staticDocs': [],
  'logo_icon': '',
  'entry_path': '',
  'feature': '',
  'usage': ''
};

// user config
let docsConfig;
// docs.json path
const output_json_file = './docs/docs.json';

function main(config) {
  docsConfig = Object.assign({}, defaultConfig, config);
  const docsObj = {};
  return co(function * () {
    // 根据代码生成docs文档
    const docs = yield generateDocsFromSource();
    // 生成docs对象
    docsObj.docs = yield generatedDocsObj(docs);
    // docs对象插入静态markdown文档
    yield injectStaticDocs(docsObj);
    // docs对象插入feature文档
    yield injectFeature(docsObj);
    // docs对象插入usage说明
    yield injectUsage(docsObj);
    // docs对象插入其他配置
    yield injectOtherAttribute(docsObj);
    // docs对象写入文件
    yield writeDocsJson(docsObj, output_json_file);
    console.log('✅  success generate docs json to : '.green + output_json_file.green);
  });
}

/*
 * 根据代码生成docs文档
 */
function generateDocsFromSource() {
  const entry_files = docsConfig.entry_path;
  if (entry_files) {
    return jsdoc2md.getTemplateData({files: entry_files})
    .then(data => data.map(doc => ({
      type: 'jsdoc',
      urlId: doc.name,
      category: doc.category,
      title: doc.name,
      description: doc.summary,
      content: doc,
    })));
  }

  return [];
}

/*
 * 生成docs对象
 */
function generatedDocsObj(docs) {
  const groups = docsConfig.categories;

  // new docs map object
  const docsObj = groups.reduce((obj, name) => {
    obj[name] = [];
    return obj;
  }, {});

  delete docsConfig.categories;

  // insert generated docs to docs object
  return docs.reduce((obj, doc) => {
    const category = doc.category;
    if (category) {
      (obj[category] = obj[category] || []).push(doc);
    }
    return obj;
  }, docsObj);
}

/*
 * docs对象插入静态markdown文档
 */
function injectStaticDocs(docsObj) {
  const staticDocs = docsConfig.staticDocs;

  return getListOfStaticDocs(staticDocs).then((staticDocs) => {
    staticDocs.forEach((staticDoc) => {
      docsObj.docs[staticDoc.category].push(staticDoc);
    });

    delete docsConfig.staticDocs;

    return docsObj;
  });
}

/*
 * 得到静态narkdown文档数据
 */
function getListOfStaticDocs(staticDocs) {
  return Promise.all(staticDocs.map((staticDoc) => {
    return fsp.readFile(staticDoc.path)
    .then((docContent) => docContent.toString())
    .then((content) => Object.assign({
      content
    }, staticDoc));
  }));
}

/*
 * docs对象插入feature文档
 */
function injectFeature(docsObj) {
  const featureDoc = docsConfig.feature;
  if (featureDoc) {
    return fsp.readFile(featureDoc)
    .then(featureContent => {
      delete docsConfig.feature;
      docsObj.feature = featureContent.toString();
    });
  }

  return docsObj;
}

/*
 * docs对象插入usage说明
 */
function injectUsage(docsObj) {
  if (docsConfig.usage) {
    const usage = require(path.join(rootPath, docsConfig.usage));
    delete docsConfig.usage;
    docsObj.usage = usage;
  }

  return docsObj;
}

/*
 * docs对象插入其他配置
 */
function injectOtherAttribute(docsObj) {
  return file.read('./package.json')
  .then((packageJson) => {
    return Object.assign(docsObj, {
      name: packageJson.name,
      description: packageJson.description
    } , docsConfig);
  }).catch(() => {
    return Object.assign(docsObj, docsConfig);
  });
}

/*
 * docs对象写入文件
 */
function writeDocsJson(docsObj, destPath) {
  const docsJsonStr = 'var __DOCS_JSON__ = ' + JSON.stringify(docsObj);
  return fsp.writeFile(destPath, docsJsonStr);
}

module.exports = main;
