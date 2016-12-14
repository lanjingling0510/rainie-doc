#!/bin/bash

npm run build #打包
node ./index.js #文档
./release_npm.sh #发布npm包
