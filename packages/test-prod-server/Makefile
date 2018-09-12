PATCH_FILES=$(shell ls ./patches | sed "s/\+.*.patch//g")

patch-modules:
	@for patch in $(PATCH_FILES); do \
		rm -rf ../store/node_modules/temp-$$patch; \
		mv ../store/node_modules/$$patch ../store/node_modules/temp-$$patch; \
		cp -r ./node_modules/$$patch ../store/node_modules/$$patch; \
		done

recovery-patch-modules:
	@for patch in $(PATCH_FILES); do \
		rm -rf ../store/node_modules/$$patch; \
		mv ../store/node_modules/temp-$$patch ../store/node_modules/$$patch; \
		done

test-ci:
	@make patch-modules
	npm run test -- -p " \
		/, \
		/products, \
		/pages/一頁式購物車, \
		/pages/圖片元件, \
		/pages/圖片文字元件, \
		/pages/輪播元件" \
		--member-paths " \
		/orders" \
		--email ting@meepshop.com \
		--password 123456 \
		nextstoretest.stage.meepcloud.com
	@make recovery-patch-modules
