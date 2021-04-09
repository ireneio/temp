import * as R from 'ramda';

import getIn from './getIn';
import setDefaultValueForMenuDesign from './setDefaultValueForMenuDesign';

const getJoinedModule = (
  widgets,
  { query = {}, menus, product, activities },
) => {
  const mWidgets = widgets.map(widget => {
    if (widget.widgets == null) {
      switch (widget.module) {
        case 'menu': {
          const { menuId } = widget;
          const menu =
            R.find(R.propEq('id', menuId))(menus) ||
            R.find(R.propEq('menuType', menuId))(menus) ||
            setDefaultValueForMenuDesign([]);
          const menuPages = getIn(['pages'])(menu) || [];

          return {
            ...widget,
            menu: R.assocPath(['pages'], menuPages, menu),
          };
        }

        case 'activity': {
          return {
            ...widget,
            activity: activities.find(activity => activity.id === widget.value),
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
          };

        case 'product': {
          return {
            ...widget,
            productData: product,
          };
        }
        case 'product-info': {
          return {
            ...widget,
            productData: product,
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
            product,
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
        product,
        activities,
      }),
    };
  });
  return mWidgets;
};

export default getJoinedModule;
