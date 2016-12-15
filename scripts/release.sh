#!/bin/bash

#打包
npm run build
#生成文档
node ./index.js
#生成新的tag
cqGit
#发布npm包
./release_npm.sh
