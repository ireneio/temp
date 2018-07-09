BABEL_PACKAGES=meep-ui

babel-all:
	@make babel-clean
	@for package in $(BABEL_PACKAGES); do \
	  $(call babel-build, ./packages/$$package); \
		done

babel-clean:
	rm -rf ./lib ./packages/**/lib

clean-all:
	@make babel-clean
	rm -rf ./node_modules ./packages/**/node_modules
	rm -rf ./coverage
	rm -rf ./.eslintcache
	rm -rf ./.changelog
	rm -rf ./*.log

define babel-build
	yarn babel $(1)/src --out-dir $(1)/lib
endef
