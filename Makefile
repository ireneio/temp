ROOT=$(shell pwd)
BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
WATCH=""
OPTION=""

migration:
	@for workspace in meepshop admin store packages; do \
		for filePath in $(shell find ./$$workspace -name __generated__ -type d); do \
			rm -rf $$filePath; \
		  done; \
		done
	@node migration.js $(shell git grep -rl __generated__ meepshop admin store packages)
	@echo "TODO: should remove migration"

babel-all:
	@$(call babel-build,$(WATCH),--concurrency 16 $(OPTION))

babel-changed:
	@$(call babel-build,$(WATCH),--parallel --exclude-dependents --since $(BRANCH))

clean:
	rm -rf ./node_modules
	rm -rf ./store/**/lib ./admin/**/lib ./meepshop/**/lib ./packages/**/lib
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log
	rm -rf **/__generated__

release:
	@node -r dotenv/config ./node_modules/.bin/lerna-changelog && \
		echo "\nPlease copy above logs and edit in CHANGELOG.md. Exit with 'ctrl + c'..." && \
		read -p ""
	@vim CHANGELOG.md && \
		git add CHANGELOG.md && \
		git commit -m "chore(root): add CHANGELOG.md"
	@yarn lerna version

define babel-build
  yarn lerna exec \
		"babel src -d lib --delete-dir-on-start --root-mode upward --verbose -x .js,.ts,.tsx $(1)" \
		--stream \
		--include-dependencies \
		--ignore @meepshop/mock-types \
		--ignore @meepshop/store \
		--ignore @admin/server \
		$(2)
	ln -snf $(ROOT)/meepshop/types/lib/bin/index.js ./node_modules/.bin/types
	ln -snf $(ROOT)/meepshop/locales/lib/bin/index.js ./node_modules/.bin/locales
	ln -snf $(ROOT)/packages/generate/lib/bin/index.js ./node_modules/.bin/generate
	ln -snf $(ROOT)/packages/storybook/lib/bin/index.js ./node_modules/.bin/storybook
endef
