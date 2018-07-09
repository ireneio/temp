import PropTypes from 'prop-types';

import { ID_TYPE, LOCALE_TYPE, PURCHASE_ITEMS_TYPE } from 'constants/propTypes';
import { buildD3TreeTypes } from 'utils/buildPropTypes';

const VARIANTS_TYPE_OBJ = {
  id: ID_TYPE.isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      title: LOCALE_TYPE.isRequired,
    }).isRequired,
  ),
  minPurchaseItems: PURCHASE_ITEMS_TYPE.isRequired,
  maxPurchaseLimit: PURCHASE_ITEMS_TYPE.isRequired,
  stock: PURCHASE_ITEMS_TYPE.isRequired,
};
export const VARIANTS_TYPE = PropTypes.arrayOf(
  PropTypes.shape(VARIANTS_TYPE_OBJ).isRequired,
);

export const VARIANTS_TREE_TYPE = buildD3TreeTypes(
  'variant',
  {
    title: LOCALE_TYPE.isRequired,
  },
  VARIANTS_TYPE_OBJ,
);

export const PAYMENT_QUERY_FIELDS = [
  'variant',
  'paymentId',
  'shipmentId',
  'coupon',
];
