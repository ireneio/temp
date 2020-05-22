import * as R from 'ramda';
import { MEMBER_ITEMS_TMPL } from 'template';

import getIn from './getIn';
import setDefaultValueForMenuDesign from './setDefaultValueForMenuDesign';

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
    productListCache,
  },
) => {
  const mWidgets = widgets.map(widget => {
    if (widget.widgets == null) {
      switch (widget.module) {
        case 'menu': {
          const { menuId } = widget;
          let menu =
            R.find(R.propEq('id', menuId))(menus) ||
            R.find(R.propEq('menuType', menuId))(menus) ||
            setDefaultValueForMenuDesign([]);
          let menuPages = getIn(['pages'])(menu) || [];
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

        case 'products':
          return {
            ...widget,
            params: {
              ids: query.ids || widget.params.ids,
              includedAllTags:
                query.includedAllTags || widget.params.includedAllTags,
              limit: +query.limit || +widget.params.limit,
              offset: +query.offset || +widget.params.offset,
              sort: query.sort || widget.params.sort,
              price: query.price || widget.params.price,
              search:
                query.search || (!widget.params.ids && widget.params.search),
              tags: query.tags || (!widget.params.ids && widget.params.tags),
              ...(widget.params.ids
                ? {
                    sort: 'selections',
                  }
                : {}),
            },
            cart,
            wishList,
            stockNotificationList,
            productListCache,
          };

        case 'products-controlled':
          return {
            ...widget,
            params: {
              ids: widget.params.ids,
              includedAllTags: widget.params.includedAllTags,
              limit: +widget.params.limit,
              offset: +widget.params.offset,
              sort: widget.params.sort,
              price: widget.params.price,
              ...(widget.params.ids
                ? {
                    sort: 'selections',
                  }
                : {
                    search: widget.params.search,
                    tags: widget.params.tags,
                  }),
            },
            cart,
            wishList,
            stockNotificationList,
            productListCache,
          };

        case 'product': {
          return {
            ...widget,
            productData: product,
            cart,
            stockNotificationList,
            isInWishList: !!wishList.find(
              ({ productId }) => product.id === productId,
            ),
          };
        }
        case 'product-info': {
          return {
            ...widget,
            productData: product,
            cart,
            stockNotificationList,
            isInWishList: !!wishList.find(
              ({ productId }) => product.id === productId,
            ),
            edition: 'detail',
          };
        }
        case 'product-carousell': {
          return {
            ...widget,
            coverImage: product.coverImage,
            galleries: product.galleries,
          };
        }
        case 'product-collections': {
          return {
            ...widget,
            galleries: product.galleries,
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
        productListCache,
      }),
    };
  });
  return mWidgets;
};

export default getJoinedModule;
