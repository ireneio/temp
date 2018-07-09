import PropTypes from 'prop-types';

export const USER_TYPE = {
  id: PropTypes.string,
  name: PropTypes.string,
  gender: PropTypes.number,
  additionalInfo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  birthday: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }),
  notification: PropTypes.object,
};
