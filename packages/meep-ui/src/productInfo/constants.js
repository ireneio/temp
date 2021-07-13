import PropTypes from 'prop-types';

import { ID_TYPE, LOCALE_TYPE } from 'constants/propTypes';

export const VARIANT_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
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

export const ORDERABLE = 'ORDERABLE';
export const OUT_OF_STOCK = 'OUT_OF_STOCK';
export const LIMITED = 'LIMITED';
export const NO_VARIANTS = 'NO_VARIANTS';

export const ORDERABLE_TYPE = PropTypes.oneOf([
  ORDERABLE,
  OUT_OF_STOCK,
  LIMITED,
  NO_VARIANTS,
]);
