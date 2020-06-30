ROOT=$(shell pwd)
BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
WATCH=""
APOLLO_TYPE=mock-types
OPTION=""

babel-all:
	@$(call babel-build,$(WATCH),--concurrency 16 $(OPTION))

babel-changed:
	@$(call babel-build,$(WATCH),--parallel --since $(BRANCH))

apollo-watch:
	@$(call apollo,$(APOLLO_TYPE),--watch)

tsc-basic:
	@$(call apollo,mock-types)
	@$(call apollo,store)
	@$(call apollo,admin)

tsc:
	@make tsc-basic
	@tsc

tsc-watch:
	@make tsc-basic
	@tsc -w

clean:
	rm -rf ./node_modules
	rm -rf ./store/**/lib ./admin/**/lib ./packages/**/lib
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

define apollo
	echo "- $(1)"
	APOLLO_TYPE=$(1) yarn apollo client:codegen --target=typescript --globalTypesFile=./__generated__/$(1).ts $(2)
endef

define babel-build
  yarn lerna exec \
		"rm -rf lib && babel src -d lib --config-file ../../babel.config.js --verbose -x .js,.ts,.tsx $(1)" \
		--stream \
		--include-dependencies \
		--ignore @meepshop/store \
		--ignore @meepshop/mock-types \
		--ignore @admin/server \
		$(2)
	ln -snf $(ROOT)/meepshop/locales/lib/bin/index.js ./node_modules/.bin/locales
endef
