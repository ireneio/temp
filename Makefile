BABEL_PACKAGES=--scope @meepshop/meep-ui
BABEL_IGNORE_PACKAGES=--scope @meepshop/store

babel-all:
	@make babel-clean
	@npm run lerna -- exec \
		--parallel \
		--stream \
		"babel src -d lib --config-file ../../babel.config.js" \
		${BABEL_PACKAGES}

babel-clean:
	rm -rf ./lib ./packages/**/lib

prod:
	@NODE_ENV=production make babel-all
	@npm run lerna -- run prod --stream --parallel ${BABEL_PACKAGES}
	@npm run lerna -- run prod --stream --parallel ${BABEL_IGNORE_PACKAGES}

release:
	@npm run lerna -- publish --skip-npm --skip-git --repo-version ${VERSION}
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
