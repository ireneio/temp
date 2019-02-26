dev:
	@make copy-style-less
	@$(call babel-build, -w)

prod:
	@make copy-style-less
	@$(call babel-build)

clean:
	rm -rf ./lib

copy-style-less:
	test -e ./lib || mkdir ./lib
	test -e ./lib/constants || mkdir ./lib/constants
	cp ./src/constants/styles.less ./lib/constants

define babel-build
  babel src -d lib \
		--config-file ../../babel.config.js \
		--verbose \
		$(1)
endef
