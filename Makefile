BABEL_PACKAGES=--scope @meepshop/meep-ui
BABEL_IGNORE_PACKAGES=--scope @meepshop/store

babel-all:
	@make babel-clean
	@npm run lerna -- exec \
		--parallel \
		--stream \
		"babel src -d lib --config-file ../../babel.config.js" \
		${BABEL_PACKAGES}

babel-prod:
	@NODE_ENV=production make babel-all
	@npm run lerna -- run prod \
		--stream \
		--parallel \
		${BABEL_PACKAGES}

babel-clean:
	rm -rf ./lib ./packages/**/lib

prod:
	@make babel-prod
	@npm run lerna -- run prod \
		--stream \
		--parallel \
		${BABEL_IGNORE_PACKAGES}

release:
	@npm run lerna -- publish \
		--skip-npm \
		--skip-git \
		--repo-version ${VERSION} \
		${RELEASE_SCOPE}
	@npm run lerna-changelog && \
		echo "\nContinue or exit with 'ctrl + c'..." && \
		read -p ""
	@vim CHANGELOG.md && \
		git add . && \
		git commit -m "chore(release): v${VERSION} [skip ci]" && \
		git tag -a v${VERSION} -m "v${VERSION}" && \
		git push origin master --follow-tags

clean-all:
	@make babel-clean
	rm -rf ./node_modules ./packages/**/node_modules
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log
	rm -rf ./packages/**/src/.next
