#!/bin/bash

start:
	rm -rf ./docs.json
	ln -s ./example/docs/docs.json ./docs.json
	NODE_ENV=development webpack-dev-server --config ./config/webpack.js

release:
	npm run build #打包
	node ./index.js #文档
	node_modules/.bin/release #发布

release-npm:
	dir=tmp/npm

	rm -rf $dir
	mkdir $dir

	for pattern in CHANGELOG.md \
	  README.md \
	  index.js \
	  package.json \
		generateDocsjson.js \
		lib/* \
	  dist/*
	do
	  cp -r "$pattern" "$dir"
	done

	find "$dir" -type f -name "test.js" -delete
	cd "$dir" || exit
	npm publish
	cd - || exit
	rm -rf "$dir"
