import getConfig from 'next/config';
import * as Api from 'api';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

/**
 * 暫時由前端join與filter各個module欄位
 * 希望以後後端直接處理...
 */

export default async function modifyWidgetDataInServer(
  widgets = [],
  XMeepshopDomain,
  query,
  cookie,
) {
  if (!widgets) return [];
  const mWidgets = await Promise.all(
    widgets.map(async widget => {
      if (widget.widgets == null) {
        switch (widget.module) {
          /* 產品列表 */
          case 'products': {
            const {
              id,
              module,
              contentWidth,
              params: {
                ids,
                includedAllTags,
                limit,
                offset,
                price,
                search,
                sort,
                tags,
              },
              alignItems,
              alignment,
              cartButton,
              justifyContent,
              padding,
              pagination,
              productWidth,
              showDescription,
              showPrice,
              showTitle,
              showSort,
            } = widget;
            const products = await Api.getProductList({
              isServer: true,
              XMeepshopDomain,
              cookie,
              ids: query.ids || ids,
              includedAllTags: query.includedAllTags || includedAllTags,
              limit: query.limit || limit,
              offset: query.offset || offset,
              price: query.price || price,
              search: query.search || search,
              sort: query.sort || sort,
              tags: query.tags || tags,
            });
            return {
              id,
              module,
              contentWidth,
              products,
              params: {
                ids: query.ids || ids,
                includedAllTags: query.includedAllTags || includedAllTags,
                limit: query.limit || limit,
                offset: query.offset || offset,
                price: query.price || price,
                search: query.search || search,
                sort: query.sort || sort,
                tags: query.tags || tags,
              },
              showSort,
              alignment,
              justifyContent,
              alignItems,
              showTitle,
              showDescription,
              showPrice,
              cartButton,
              productWidth,
              padding,
              pagination,
            };
          }
          /* 產品組合 */
          case 'product': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              showButton: widget.showButton,
            };
          }
          /* 產品主圖 */
          case 'product-carousell': {
            const { id, module, contentWidth, carouselInfo } = widget;

            return {
              id,
              module,
              contentWidth,
              autoPlay: carouselInfo ? carouselInfo.autoPlay : false,
              thumbsPosition: carouselInfo
                ? carouselInfo.thumbsPosition
                : 'none',
            };
          }
          /* 產品資訊 */
          case 'product-info': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              showButton: widget.showButton,
            };
          }
          /* 產品照片集 */
          case 'product-collections': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              align: widget.align || 'original',
              title: widget.title,
              files: [],
              width: widget.width,
            };
          }
          /* 產品語法嵌入 */
          case 'product-html': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
            };
          }
          /* 商品問答 */
          case 'product-service': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              productId: query.pId,
            };
          }
          /* 圖片 */
          case 'image': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              alignment: widget.alignment,
              newWindow: widget.newWindow,
              files: widget.files,
            };
          }
          /* 語法嵌入 */
          case 'iframe': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              htmlCode: widget.htmlCode || '',
            };
          }
          /* 地圖 */
          case 'googlemap': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              href: widget.href,
              width: widget.width,
              height: widget.height,
            };
          }
          /* 輪播圖 */
          case 'carousel': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              htmlCode: widget.htmlCode,
              enableAutoplay: widget.enableAutoplay,
              enableIndicators: widget.enableIndicators,
              enableControls: widget.enableControls,
              pauseWhenHover: widget.pauseWhenHover,
              files: widget.files,
            };
          }
          /* 分隔線 */
          case 'divider': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              background: widget.background,
              width: widget.width,
              height: widget.height,
              alignment: widget.alignment,
              radius: widget.radius,
            };
          }
          /* 直播留言 */
          case 'liveVideoComments': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              liveVideo: widget.liveVideo,
            };
          }
          /* 影片嵌入 */
          case 'video-core': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              aspect: widget.aspect,
              href: widget.href,
            };
          }
          /* 臉書按讚 */
          case 'social-thumbs': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              alignment: widget.socialMediaInfo.alignItems,
              href: widget.socialMediaInfo.share.url,
            };
          }
          /* 臉書牆 */
          case 'facebook-wall': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              href: widget.href,
              alignment: widget.alignment,
              showPosts: !!widget.showPosts,
              showFacepile: !!widget.showFacepile,
              smallHeader: !!widget.smallHeader,
              hideCover: !!widget.hideCover,
              hideCta: !!widget.hideCta,
            };
          }
          /* 一頁式購物車 */
          case 'landing-page': {
            const { tradeNo, shipmentTemplate } = query;
            const productId = widget.params && widget.params.ids;
            let orderInfo;
            if (shipmentTemplate && tradeNo) {
              let data = {};
              try {
                const res = await fetch(
                  `${API_HOST}/external/${shipmentTemplate}/getInfo/${tradeNo}`,
                );
                /* api server removes form info in 10 secends */
                if (res.status === 200) {
                  data = await res.json();
                } else {
                  throw new Error('Form information has been removed.');
                }
              } catch (error) {
                console.warn(error);
              }
              orderInfo = {
                info: data.info, // The form infomation filled by user before choosing store.
                CVSAddress: data.CVSAddress,
                CVSStoreID: data.CVSStoreID,
                CVSStoreName: data.CVSStoreName,
              };
            }
            let productData = null;
            if (productId) {
              const { data } = await Api.getProduct({
                id: productId,
                isServer: true,
                XMeepshopDomain,
              });
              [productData] = data.computeProductList.data;
            }
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.width,
              redirectPage: widget.landingInfo.redirectPage || '/',
              addition: widget.landingInfo.addition,
              countries: widget.landingInfo.countries || [],
              required: widget.landingInfo.required,
              productData,
              agreedMatters: widget.landingInfo.agreedMatters,
              paymentFilter: widget.landingInfo.paymentId || [],
              shipmentFilter: widget.landingInfo.shipmentId || [],
              orderInfo,
            };
          }
          /* 社群分享 */
          case 'social-media': {
            return {
              id: widget.id,
              module: widget.module,
              href: widget.socialMediaInfo.share.url,
              alignment: widget.socialMediaInfo.alignItems,
            };
          }
          /* 圖文 */
          case 'imagetext': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              button: widget.button,
              description: widget.description,
              header: widget.header,
              overlayBackgroundColor: widget.overlayBackgroundColor,
              position: widget.position,
              textColor: widget.textColor,
              showOverlay: widget.showOverlay,
              files: widget.files,
            };
          }
          /* 文字 */
          case 'draft-text': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              value: widget.value || '',
            };
          }
          /* 折扣活動 */
          case 'activity': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              background: widget.background,
              value: widget.value,
              // activity join in reselector
            };
          }
          case 'menu': {
            return {
              id: widget.id,
              module: widget.module,
              contentWidth: widget.contentWidth,
              menuId: widget.menuId,
            };
          }
          default:
            return widget;
        }
      }
      return {
        widgets: await modifyWidgetDataInServer(
          widget.widgets,
          XMeepshopDomain,
          query,
          cookie,
        ),
      };
    }),
  );
  return mWidgets;
}
