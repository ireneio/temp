ROOT=$(shell pwd)
BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
BABEL_OPTION=$(shell if ! test -d ./lib; then echo "--delete-dir-on-start"; fi)
OPTION=$(shell if test -d ./lib; then echo "--since $(shell cat ~/.meepshop.lerna-cache)"; fi)

babel-all:
	@$(call babel-build,$(BABEL_OPTION),--concurrency 16 $(OPTION))

babel-changed:
	@$(call babel-build,$(BABEL_OPTION),--parallel --since $(BRANCH))

clean:
	rm -rf ./node_modules
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log
	rm -rf **/__generated__

define babel-build
  yarn lerna exec \
		"babel src -d lib --root-mode upward --verbose -x .js,.ts,.tsx $(1)" \
		--stream \
		--exclude-dependents \
		--ignore @meepshop/mock-types \
		--ignore @meepshop/next-store \
		--ignore @meepshop/next-admin \
		$(2)
	ln -snf $(ROOT)/meepshop/types/lib/bin/index.js ./node_modules/.bin/types
	ln -snf $(ROOT)/packages/generate/lib/bin/index.js ./node_modules/.bin/generate
	ln -snf $(ROOT)/packages/storybook/lib/bin/index.js ./node_modules/.bin/storybook
endef
