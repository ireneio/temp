import * as R from 'ramda';
import * as Utils from 'utils';
import { MEMBER_ITEMS_TMPL } from 'template';

const getJoinedModule = (
  widgets,
  {
    query = {},
    menus,
    localeItemsTemplate,
    currencyItemsTemplate,
    product,
    cart,
    activities,
    storeApps,
    stockNotificationList,
    wishList,
  },
) => {
  const mWidgets = widgets.map(widget => {
    if (widget.widgets == null) {
      switch (widget.module) {
        case 'menu': {
          const { menuId } = widget;
          let menu =
            R.find(R.propEq('id', menuId))(menus) ||
            R.find(R.propEq('menuType', menuId))(menus);
          let menuPages = Utils.getIn(['pages'])(menu) || [];
          if (menuPages.length > 0) {
            menuPages = menuPages.map(menuPage => {
              let newMenuPage = menuPage;
              if (menuPage.action === 6) {
                // insert locale items into locale menu(action = 6)
                newMenuPage = R.assocPath(
                  ['pages'],
                  localeItemsTemplate,
                  menuPage,
                );
              } else if (menuPage.action === 7) {
                // insert currency items into currency menu(action = 7)
                newMenuPage = R.assocPath(
                  ['pages'],
                  currencyItemsTemplate,
                  menuPage,
                );
              } else if (menuPage.action === 8) {
                // insert member items into member menu(action = 8)
                newMenuPage = R.assocPath(
                  ['pages'],
                  MEMBER_ITEMS_TMPL,
                  menuPage,
                );
              }
              return newMenuPage;
            });
          }
          menu = R.assocPath(['pages'], menuPages, menu);
          return {
            ...widget,
            menu,
          };
        }
        case 'activity': {
          return {
            ...widget,
            activity: activities.find(activity => activity.id === widget.value),
            wishList: wishList.map(wishItem => ({ productId: wishItem.id })),
            stockNotificationList,
            cart,
          };
        }
        case 'products': {
          return {
            ...widget,
            params: {
              ids: query.ids || widget.params.ids,
              includedAllTags:
                query.includedAllTags || widget.params.includedAllTags,
              limit: +query.limit || +widget.params.limit,
              offset: +query.offset || +widget.params.offset,
              price: query.price || widget.params.price,
              search: query.search || widget.params.search,
              sort: query.sort || widget.params.sort,
              tags: query.tags || widget.params.tags,
            },
            cart,
            wishList,
            stockNotificationList,
          };
        }
        case 'product': {
          const isInWishList = !!wishList.find(({ id }) => product.id === id);
          return {
            ...widget,
            productData: product,
            galleryInfo: product.galleryInfo,
            cart,
            activityData: product.activities,
            stockNotificationList,
            isInWishList,
          };
        }
        case 'product-info': {
          const isInWishList = !!wishList.find(({ id }) => product.id === id);
          return {
            ...widget,
            productData: product,
            cart,
            activityData: product.activities,
            stockNotificationList,
            isInWishList,
            edition: 'detail',
          };
        }
        case 'product-carousell': {
          return {
            ...widget,
            galleryInfo: product.galleryInfo,
          };
        }
        case 'product-collections': {
          return {
            ...widget,
            files: product.contentGalleryInfo.media,
            title: product.title,
          };
        }
        case 'product-html': {
          return {
            ...widget,
            htmlCode: (product.info && product.info.zh_TW) || '',
          };
        }
        case 'product-service': {
          return {
            ...widget,
            productId: query.pId,
          };
        }
        default:
          return widget;
      }
    }
    return {
      widgets: getJoinedModule(widget.widgets, {
        query,
        menus,
        localeItemsTemplate,
        currencyItemsTemplate,
        product,
        cart,
        activities,
        storeApps,
        stockNotificationList,
        wishList,
      }),
    };
  });
  return mWidgets;
};

export default getJoinedModule;
