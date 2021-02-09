import PropTypes from 'prop-types';

export const ADDITION_TYPE = PropTypes.arrayOf(
  PropTypes.oneOf([
    'quantity',
    'gender',
    'birthday',
    'invoice',
    'notes',
    // TODO need to remove
    'deliveryDate',
    'deliveryTime',
  ]).isRequired,
);

export const REQUIRED_TYPE = PropTypes.arrayOf(
  PropTypes.oneOf(['gender', 'birthday', 'notes']).isRequired,
);
