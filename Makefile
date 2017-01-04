test-unit:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js --single-run

test-unit-watch:
	env NODE_ENV=test node_modules/.bin/babel-node node_modules/.bin/karma start config/karma.js

test-system:
	sh scripts/test_system.sh

test-ci: test-unit test-system
