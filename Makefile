BRANCH=$(shell git branch | grep \* | cut -d ' ' -f2)
WATCH=""

## docker-compose
API=https://api.stage.meepcloud.com
TYPE="store"
COMPOSE=""
IP=$(shell ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | awk '{print $1}')

## do not modify
API_WITHOUT_PROTOCOL=$(subst http://,,$(subst https://,,$(API)))
ADMIN_HOST=$(shell test $(TYPE) = "store" && echo "" || echo "localhost")
EXTERNAL_COMPOSE=$(shell test $(COMPOSE) = "" && echo "$(TYPE)" || echo "$(COMPOSE)")

run-docker-compose:
	@API=$(API) \
		API_WITHOUT_PROTOCOL=$(API_WITHOUT_PROTOCOL) \
		DOMAIN=$(DOMAIN) \
		ADMIN_HOST=$(ADMIN_HOST) \
		IP=${IP} \
		docker-compose -f ./docker-compose/basic.yml -f ./docker-compose/$(EXTERNAL_COMPOSE).yml up

babel-all:
	@$(call babel-build)

babel-changed:
	@$(call babel-build, $(WATCH), --since $(BRANCH))

APOLLO_TYPE=mock-types
apollo-watch:
	@$(call apollo,$(APOLLO_TYPE),--watch)

tsc-basic:
	@$(call apollo,mock-types)
	@$(call apollo,meepshop)
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
		--parallel \
		--stream \
		--include-dependencies \
		--ignore @meepshop/store \
		--ignore @meepshop/mock-types \
		--ignore @admin/server \
		$(2)
endef
