babel-all:
	@$(call babel-build)

BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
WATCH=""
babel-changed:
	@$(call babel-build, $(WATCH), --since $(BRANCH))

postinstall:
	rm -rf ./node_modules/next/node_modules/@babel/core
	@echo "\nremove after using next@^7.x\n"

clean:
	rm -rf ./node_modules
	rm -rf ./store/**/lib ./admin/**/lib ./meepshop/**/lib
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
