BABEL_IGNORE_PACKAGES=@meepshop/store

babel-all:
	@make babel-clean
	@yarn lerna exec --parallel \
		--ignore ${BABEL_IGNORE_PACKAGES} \
		"babel src -d lib --config-file ../../babel.config.js"

babel-clean:
	rm -rf ./lib ./packages/**/lib

release:
	@npm run lerna publish --skip-npm --skip-git --repo-version ${VERSION}
	@npm run lerna-changelog && \
		read -p "Input any word..." && \
		vim CHANGELOG.md && \
		git add . && \
		git commit -m "chore(release): v${VERSION} [skip ci]" && \
		git tag -a v${VERSION} -m "v${VERSION}"

clean-all:
	@make babel-clean
	rm -rf ./node_modules ./packages/**/node_modules
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log
	rm -rf ./packages/**/src/.next
