#!/bin/bash

#打包
npm run build
#生成文档
node ./index.js
#发布npm包
./release_npm.sh
./node_modules/.bin/changelog -t v0.0.0 -m '\\[config\\]|\\[feature\\]|[\\document\\]|\\[refact\\]|\\[bug\\]'
