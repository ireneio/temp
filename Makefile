BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
WATCH=""

babel-all:
	@$(call babel-build)

babel-changed:
	@$(call babel-build, $(WATCH), --since $(BRANCH))

tsc-basic:
	@echo "- @meepshop/mock-types"
	@apollo client:codegen --target=typescript --globalTypesFile=./__generated__/mock-types.ts
	@echo "- @store/*"
	@APOLLO_TYPE=store apollo client:codegen --target=typescript --globalTypesFile=./__generated__/store.ts
	@echo "- @admin/*"
	@APOLLO_TYPE=admin apollo client:codegen --target=typescript --globalTypesFile=./__generated__/admin.ts

tsc:
	@make tsc-basic
	@tsc

tsc-watch:
	@make tsc-basic
	@tsc -w

postinstall:
	rm -rf ./node_modules/next/node_modules/@babel/core
	@echo "\nremove after using next@^7.x\n"

clean:
	rm -rf ./node_modules
	rm -rf ./store/**/lib ./admin/**/lib ./packages/**/lib
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log

release:
	@yarn lerna-changelog && \
		echo "\nContinue with any keyword or exit with 'ctrl + c'..." && \
		read -p ""
	@vim CHANGELOG.md && \
		git add CHANGELOG.md && \
		git commit -m "chore(root): add CHANGELOG.md"
	@yarn lerna version

define babel-build
  yarn lerna exec \
		"rm -rf lib && babel src -d lib --config-file ../../babel.config.js --verbose -x .js,.ts,.tsx $(1)" \
		--parallel \
		--stream \
		--include-filtered-dependencies \
		--ignore @meepshop/store \
		--ignore @meepshop/mock-types \
		--ignore @meepshop/end-to-end \
		--ignore @admin/server \
		$(2)
endef
