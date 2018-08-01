build-tool:
	@npm run babel -- tool -d lib/__tool__ \
		--config-file ../../babel.config.js \
		--verbose
	@npm run babel -- src/constants -d lib/constants \
		--config-file ../../babel.config.js \
		--verbose

dev:
	rm -rf ./lib && mkdir ./lib
	@make prod
	@npm run babel -- src -d lib \
		--config-file ../../babel.config.js \
		--verbose \
		-w

prod:
	test -e ./lib/constants/ || mkdir ./lib/constants
	cp ./src/constants/styles.less ./lib/constants

clean:
	rm -rf ./.storybook/.cache/
	rm -rf ./src/**/__story__/.cache
	rm -rf ./src/**/__tests__/.cache
