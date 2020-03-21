all: test build build-dev

build:
	tools/npm run-script build

build-dev:
	tools/npm run-script build:dev

format:
	tools/npm run-script format

test:
	tools/npm run test

coverage:
	tools/npm run coverage

publish:
	tools/npm publish --access public