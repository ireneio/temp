import PropTypes from 'prop-types';

import { ID_TYPE } from 'constants/propTypes';

export const WIDTH_TYPE = PropTypes.oneOf(
  [].constructor.apply({}, new Array(10)).map((_, index) => (index + 1) * 10),
);

export const COMPONENTWIDTH_TYPE = PropTypes.oneOf([
  0, // not use RWD
  120,
  240,
  300,
]);

export const PADDING_TYPE = PropTypes.oneOf([0, 5, 10, 20, 30, 40, 50]);

export const WIDGETSETTING_TYPE = PropTypes.shape({
  width: WIDTH_TYPE.isRequired,
  componentWidth: COMPONENTWIDTH_TYPE,
  padding: PADDING_TYPE.isRequired,
  level: PropTypes.number.isRequired,
});

export const BLOCKS_TYPE = {
  isRequired: (prevProps, propName, componentName) => {
    const value = prevProps[propName];

    if (value && value.length === 0) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`[]\`.`,
      );
    }

    return PropTypes.checkPropTypes(
      {
        blocks: PropTypes.arrayOf(
          PropTypes.shape({
            id: ID_TYPE,
            width: WIDTH_TYPE,
            componentWidth: COMPONENTWIDTH_TYPE.isRequired,
            padding: PADDING_TYPE.isRequired,
          }).isRequired,
        ).isRequired,
      },
      prevProps,
      'blocks',
      componentName,
    );
  },
};
