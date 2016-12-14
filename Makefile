start:
	rm -rf ./docs.json
	ln -s ./example/docs/docs.json ./docs.json
	NODE_ENV=development webpack-dev-server --config ./config/webpack.js
