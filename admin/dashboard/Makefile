dev:
	@$(call babel-build, -w)

prod:
	@$(call babel-build)

clean:
	rm -rf ./lib

define babel-build
  babel src -d lib \
		--config-file ../../babel.config.js \
		--verbose \
		$(1)
endef
