import * as Api from 'api';
import uuid from 'uuid/v4';
import getOrderInfo from './getOrderInfo';

/**
 * 暫時由前端join與filter各個module欄位
 * 希望以後後端直接處理...
 */

export default async function modifyWidgetDataInServer(widgets = [], context) {
  const { query = {} } = context;
  if (!widgets) return [];
  const mWidgets = await Promise.all(
    widgets.map(async widget => {
      if (widget.widgets == null) {
        switch (widget.module) {
          /* 產品列表 */
          case 'products': {
            const {
              contentWidth,
              params,
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
              notBeDeleted,
              type,
              popUpGalleryView,
            } = widget;
            return {
              id: uuid(),
              module: notBeDeleted ? 'products' : 'products-controlled',
              contentWidth,
              params,
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
              type,
              popUpGalleryView,
            };
          }
          /* 產品組合 */
          case 'product': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              showButton: widget.showButton,
            };
          }
          /* 產品主圖 */
          case 'product-carousell': {
            const { module, contentWidth, carouselInfo } = widget;

            return {
              id: uuid(),
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
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              showButton: widget.showButton,
            };
          }
          /* 產品照片集 */
          case 'product-collections': {
            return {
              id: uuid(),
              module: widget.module,
              align: widget.align || 'original',
              title: widget.title,
              files: [],
              contentWidth: widget.width || 70,
            };
          }
          /* 產品語法嵌入 */
          case 'product-html': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
            };
          }
          /* 商品問答 */
          case 'product-service': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              productId: query.pId,
            };
          }
          /* 圖片 */
          case 'image': {
            return {
              ...widget.files?.[0],
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              alignment: widget.alignment,
              newWindow: widget.newWindow,
              files: widget.files,
              customTracking: widget.customTracking,
            };
          }
          /* 語法嵌入 */
          case 'iframe': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              htmlCode: widget.htmlCode || '',
            };
          }
          /* 地圖 */
          case 'googlemap': {
            return {
              id: uuid(),
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
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              htmlCode: widget.htmlCode,
              enableAutoplay: widget.enableAutoplay,
              enableIndicators: widget.enableIndicators,
              enableControls: widget.enableControls,
              pauseWhenHover: widget.pauseWhenHover,
              files: widget.files,
              newWindow: widget.newWindow,
              customTracking: widget.customTracking,
            };
          }
          /* 分隔線 */
          case 'divider': {
            return {
              id: uuid(),
              module: widget.module,
              background: widget.background,
              contentWidth: widget.width,
              height: widget.height,
              alignment: widget.alignment,
              radius: widget.radius,
            };
          }
          /* 直播留言 */
          case 'liveVideoComments': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              liveVideo: widget.liveVideo,
            };
          }
          /* 影片嵌入 */
          case 'video-core': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              aspect: widget.aspect,
              href: widget.href,
            };
          }
          /* 臉書按讚 */
          case 'social-thumbs': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              alignment: widget.socialMediaInfo.alignItems,
              href: widget.socialMediaInfo.share.url,
            };
          }
          /* 臉書牆 */
          case 'facebook-wall': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              href: widget.href,
              alignment: widget.alignment,
              showPosts: !!widget.show_posts,
              showFacepile: !!widget.show_facepile,
              smallHeader: !!widget.small_header,
              hideCover: !!widget.hide_cover,
              hideCta: !!widget.hide_cta,
              adaptContainerWidth: !!widget.adapt_container_width,
            };
          }
          /* 一頁式購物車 */
          case 'landing-page': {
            const { tradeNo, shipmentTemplate } = query;
            const productId = widget.params && widget.params.ids;
            let orderInfo;
            if (shipmentTemplate && tradeNo) {
              orderInfo = await getOrderInfo(shipmentTemplate, tradeNo);
            }
            let productData = null;
            if (productId) {
              const { data } = await Api.getProduct({
                ...context,
                id: productId,
              });
              [productData] = data.computeProductList.data;
            }
            return {
              id: uuid(),
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
            const {
              alignItems,
              color,
              iconStyle,
              enableFacebook,
              enableLine,
              enableWechat,
              enableTwitter,
            } = widget.socialMediaInfo;
            return {
              id: uuid(),
              module: widget.module,
              alignItems: alignItems || 'left',
              color: color || '#757575',
              iconStyle: iconStyle || 0,
              enableFacebook: enableFacebook || enableFacebook == null || false,
              enableLine: enableLine || enableLine == null || false,
              enableWechat: enableWechat || enableWechat == null || false,
              enableTwitter: enableTwitter || enableTwitter == null || false,
            };
          }
          /* 圖文 */
          case 'imagetext': {
            return {
              id: uuid(),
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
              newWindow: widget.newWindow,
              customTracking: widget.customTracking,
            };
          }
          /* 文字 */
          case 'draft-text': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              value: widget.value || '',
            };
          }
          /* 折扣活動 */
          case 'activity': {
            return {
              id: uuid(),
              module: widget.module,
              contentWidth: widget.contentWidth,
              background: widget.background,
              value: widget.value,
              // activity join in reselector
            };
          }
          case 'menu': {
            return {
              id: uuid(),
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
        id: uuid(),
        widgets: await modifyWidgetDataInServer(widget.widgets, context),
      };
    }),
  );
  return mWidgets;
}
