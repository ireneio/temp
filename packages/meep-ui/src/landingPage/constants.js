import PropTypes from 'prop-types';

export const CHECK_USER_EMAIL = `
  query checkUserEmailInLandingPage($email: String) {
    checkUserInfo(search: {
      filter: {
        and: [{
          type: "exact"
          field: "email"
          query: $email
        }, {
          type: "exact"
          field: "type"
          query: "shopper"
        }]
      }
    }) {
      exists
    }
  }
`;

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
