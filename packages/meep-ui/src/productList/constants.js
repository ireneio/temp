import PropTypes from 'prop-types';
import { ID_TYPE, LOCALE_TYPE } from 'constants/propTypes';

export const VARIANT_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
  maxPurchaseLimit: PropTypes.number.isRequired,
  minPurchaseItems: PropTypes.number.isRequired,
  listPrice: PropTypes.number,
  suggestedPrice: PropTypes.number,
  retailPrice: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  totalPrice: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
});

export const PRODUCT_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      id: ID_TYPE.isRequired,
      title: LOCALE_TYPE,
    }).isRequired,
  ),
  description: LOCALE_TYPE.isRequired,
  status: PropTypes.oneOf([0, 1]).isRequired,
  title: LOCALE_TYPE.isRequired,
  variants: PropTypes.arrayOf(VARIANT_TYPE.isRequired).isRequired,
  showUserPrice: PropTypes.shape({
    showListPrice: PropTypes.bool.isRequired,
    showSuggestedPrice: PropTypes.bool.isRequired,
  }),
});

export const SORT_OPTIONS = ids => [
  ...(ids
    ? [
        {
          text: 'SELECTIONS',
          value: 'selections',
        },
      ]
    : []),
  {
    text: 'LATEST',
    value: 'createdOn-desc',
  },
  {
    text: 'TITLE',
    value: 'title.zh_TW-asc',
  },
  {
    text: 'PRICE_ASC',
    value: 'variantInfo.firstRetailPrice-asc',
  },
  {
    text: 'PRICE_DESC',
    value: 'variantInfo.firstRetailPrice-desc',
  },
];
