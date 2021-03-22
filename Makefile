ROOT=$(shell pwd)
BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
BABEL_OPTION=$(shell if ! test -d ./lib; then echo "--delete-dir-on-start"; fi)
OPTION=$(shell if test -d ./lib; then echo "--since $(shell cat ~/.meepshop.lerna-cache)"; fi)

migrate-code:
	@for workspace in meepshop admin store packages; do \
		for filePath in $(shell find ./$$workspace -name __generated__ -type d); do \
			rm -rf $$filePath; \
		  done; \
		done
	@echo "TODO: remove migration/types.js after PRs which number less than 1373 have already been merged."
	@node ./migration/types.js $(shell git grep -rl __generated__ meepshop admin store packages)
	@echo "TODO: remove migration/locales.js after PRs which number less then 1455 have already been merged."
	@node ./migration/locales.js $(shell git grep -rl @meepshop/utils/lib/i18n . ':!./migration/**' ':!Makefile')
	@echo "TODO: remove migration/namespacesRequired.js after PRs which number less then 1456 have already been merged."
	@node ./migration/namespacesRequired.js $(shell git grep -rin namespacesRequired . ':!Makefile' ':!*.md' ':!**/__tests__/**' ':!meepshop/locales' ':!**/_app.js' ':!**/_app.tsx' | grep -v 'namespacesRequired: \[]' | grep -v 'namespacesRequired: string\[]' | grep -v 'namespacesRequired?: string\[]' | grep -v import | grep -v 'namespacesRequired,' | grep -v "\[\'@meepshop/locales/namespacesRequired\']")

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
	ln -snf $(ROOT)/meepshop/locales/lib/bin/index.js ./node_modules/.bin/locales
	ln -snf $(ROOT)/packages/generate/lib/bin/index.js ./node_modules/.bin/generate
	ln -snf $(ROOT)/packages/storybook/lib/bin/index.js ./node_modules/.bin/storybook
endef
