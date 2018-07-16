import * as Api from 'api';

/**
 * 暫時由前端join與filter各個module欄位
 * 希望以後後端直接處理...
 */

export default function modifyWidgetDataInClient(widgets = [], query) {
  if (!widgets) return [];
  const mWidgets = widgets.map(widget => {
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
          const products = Api.getProductList({
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
            thumbsPosition: carouselInfo ? carouselInfo.thumbsPosition : 'none',
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
            alignment: widget.alignment,
            contentWidth: widget.contentWidth,
            newWindow: widget.newWindow,
            files: widget.files,
          };
        }
        /* 語法嵌入 */
        case 'iframe': {
          return {
            id: widget.id,
            module: widget.module,
            htmlCode: widget.htmlCode || '',
          };
        }
        /* 地圖 */
        case 'googlemap': {
          return {
            id: widget.id,
            module: widget.module,
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
        case 'videoCore': {
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
            alignment: widget.socialMediaInfo.alignItems,
            href: widget.socialMediaInfo.share.url,
          };
        }
        /* 臉書牆 */
        case 'facebook-wall': {
          return {
            id: widget.id,
            module: widget.module,
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
          return {
            id: widget.id,
            module: widget.module,
            contentWidth: widget.width,
            redirectPage: widget.landingInfo.redirectPage || '/',
            addition: widget.landingInfo.addition,
            countries: widget.landingInfo.countries || [],
            required: widget.landingInfo.required,
            productData:
              widget.params && widget.params.ids
                ? Api.getProduct({ id: widget.params.ids }).then(
                    ({ data }) => data.computeProductList.data[0],
                  )
                : null,
            agreedMatters: widget.landingInfo.agreedMatters,
            paymentFilter: widget.landingInfo.paymentId || [],
            shipmentFilter: widget.landingInfo.shipmentId || [],
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
    return { widgets: modifyWidgetDataInClient(widget.widgets, query) };
  });
  return mWidgets;
}
