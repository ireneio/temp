BABEL_PACKAGES=@meepshop/meep-ui
BABEL_IGNORE_PACKAGES=@meepshop/store

babel-all:
	@make babel-clean
	@npm run lerna -- exec --parallel \
		--scope ${BABEL_PACKAGES} \
		"babel src -d lib --config-file ../../babel.config.js"

babel-clean:
	rm -rf ./lib ./packages/**/lib

prod:
	@NODE_ENV=production make babel-all
	@npm run lerna -- run prod --scope ${BABEL_PACKAGES} --stream --parallel
	@npm run lerna -- run prod --scope ${BABEL_IGNORE_PACKAGES} --stream --parallel

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
