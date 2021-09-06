import * as Api from 'api';
import uuid from 'uuid/v4';

import getLink from './getLink';
import getJustifyContent from './getJustifyContent';
import parseIframe from './parseIframe';
import parseGoogleMap from './parseGoogleMap';

/**
 * 暫時由前端join與filter各個module欄位
 * 希望以後後端直接處理...
 */

export default function modifyWidgetDataInClient(widgets = [], query, page) {
  // FIXME: prevent malformed widget data
  if (!Array.isArray(widgets)) return [];
  const mWidgets = widgets.map(widget => {
    if (widget.widgets == null) {
      switch (widget.module) {
        /* 產品列表 */
        case 'products': {
          const {
            id,
            contentWidth,
            params,
            alignItems,
            alignment,
            cartButton,
            justifyContent,
            padding,
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
            id,
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
            type,
            popUpGalleryView,
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
            thumbsPosition: carouselInfo ? carouselInfo.thumbsPosition : 'none',
          };
        }
        /* 產品資訊 */
        case 'product-info': {
          return {
            id: uuid(),
            module: widget.module,
            contentWidth: widget.contentWidth,
            showButton: widget.showButton,
            drawerOnMobile: widget.drawerOnMobile ?? false,
            unfoldedVariantsOnMobile: widget.unfoldedVariantsOnMobile ?? true,
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

        case 'product-video':
          return {
            ...widget,
            ratio: {
              '16:9': 'Ratio16to9',
              '4:3': 'Ratio4to3',
              '16:10': 'Ratio16to10',
            }[widget.ratio],
          };

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
            alignment: widget.alignment,
            contentWidth: widget.contentWidth,
            newWindow: widget.newWindow,
            files: widget.files,
            customTracking: widget.customTracking,
            alt: widget.alt,
          };
        }
        /* 語法嵌入 */
        case 'iframe': {
          return {
            id: uuid(),
            module: widget.module,
            htmlCode: widget.htmlCode || '',
          };
        }
        /* 地圖 */
        case 'googlemap': {
          return {
            id: uuid(),
            module: widget.module,
            width: widget.width,
            height: widget.height,
            href:
              parseGoogleMap(widget.href) ||
              'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.592760581696!2d121.51357035073431!3d25.013950245169866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9ea5f5c8e0d%3A0x6dda897a7281e0e3!2z6YGU6IqZ5aau!5e0!3m2!1szh-TW!2stw!4v1464849891494',
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
            alt: widget.alt,
          };
        }
        /* 分隔線 */
        case 'divider': {
          const { width, height, alignment, radius, background } = widget;

          return {
            id: uuid(),
            module: widget.module,
            width: width < 1 ? 1 : Math.round(width),
            height: height < 1 ? 1 : Math.round(height),
            justifyContent: getJustifyContent(alignment),
            borderRadius: radius < 0 ? 0 : radius || 0,
            background: !background ? null : background,
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
            width: widget.contentWidth,
            ratio: {
              '16:9': 'Ratio16to9',
              '4:3': 'Ratio4to3',
              '16:10': 'Ratio16to10',
            }[widget.aspect],
            href:
              parseIframe(widget.href) ||
              'https://www.youtube.com/watch?v=L8FK64bLJKE&feature=youtu.be',
          };
        }
        /* 臉書按讚 */
        case 'social-thumbs': {
          return {
            id: uuid(),
            module: widget.module,
            href:
              getLink(widget.socialMediaInfo.share.url) ||
              'https://www.google.com.tw',
            justifyContent: getJustifyContent(
              widget.socialMediaInfo.alignItems,
            ),
          };
        }
        /* 臉書牆 */
        case 'facebook-wall': {
          return {
            id: uuid(),
            module: widget.module,
            href: getLink(widget.href) || 'https://www.facebook.com/meepshop',
            justifyContent: getJustifyContent(widget.alignment),
            showPosts: Boolean(widget.show_posts),
            showFacepile: Boolean(widget.show_facepile),
            smallHeader: Boolean(widget.small_header),
            hideCover: Boolean(widget.hide_cover),
            hideCta: Boolean(widget.hide_cta),
          };
        }
        /* 一頁式購物車 */
        case 'landing-page': {
          return {
            id: uuid(),
            module: widget.module,
            contentWidth: widget.width,
            redirectPage: widget.landingInfo.redirectPage || '/',
            addition: widget.landingInfo.addition,
            shippableCountries: widget.landingInfo.shippableCountries || [],
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
          const socialMediaTypes = [
            'NONE',
            'CIRCLE',
            'CIRCLE_FILLED',
            'ORIGIN',
          ];
          const toBoolean = value => value || value === null || false;
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
            socialMediaType: socialMediaTypes[iconStyle] || socialMediaTypes[0],
            justifyContent: {
              left: 'FLEX_START',
              center: 'CENTER',
              right: 'FLEX_END',
            }[alignItems || 'left'],
            color: color || '#757575',
            showFacebook: toBoolean(enableFacebook),
            showLine: toBoolean(enableLine),
            showWechat: toBoolean(enableWechat),
            showTwitter: toBoolean(enableTwitter),
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
            alt: widget.alt,
          };
        }
        /* 文字 */
        case 'draft-text': {
          return {
            id: uuid(),
            module: widget.module,
            content: widget.value || '',
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
        /* 智慧轉換 */
        case 'smart-conversion': {
          const { smartConversionModule } = page;
          return {
            ...widget,
            ...smartConversionModule,
          };
        }
        default:
          return widget;
      }
    }
    return {
      id: uuid(),
      widgets: modifyWidgetDataInClient(widget.widgets, query, page),
    };
  });
  return mWidgets;
}
