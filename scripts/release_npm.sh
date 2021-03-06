#!/bin/bash

dir=tmp/npm

rm -rf $dir
mkdir $dir

for pattern in CHANGELOG.md \
	README.md \
	index.js \
	package.json \
	lib \
	dist \
	generateDocsjson.js
do
	cp -r "$pattern" "$dir"
done

find "$dir" -type f -name "test.js" -delete
cd "$dir" || exit
npm publish
cd - || exit
rm -rf "$dir"
