import PropTypes from 'prop-types';

export const PATTERN_TYPE = PropTypes.oneOf([0, 1, 2, 3]);

export const ACTION_TYPE = PropTypes.oneOf([
  0, // empty
  1, // go to page
  2, // go to url
  3, // go to filer
  5, // show cards
  6, // change language
  7, // change currency
  8, // member
]);

export const FONTSIZE_TYPE = PropTypes.oneOf([
  ...[].constructor.apply({}, new Array(19)).map((_, index) => 12 + index),
]);

export const FONT_TYPE = PropTypes.oneOf([
  'Arial',
  'Arial Black',
  'Coming Sans MS',
  'Courier',
  'Courier New',
  '標楷體',
  'Helvetica',
  '黑體',
]);

export const DEFAULT_COLOR_WITH_PATTERN = [
  [1, 2, 4, 2, null, 4, 2, null],
  [1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, null, 2, 2, null, 2, 2],
  [1, 2, 4, 2, 4, 1, 2, 1],
];

export const PAGES_TYPE = shapeTypes => (props, propName, componentName) => {
  const { action } = props;
  const defaultPropTypes = PropTypes.arrayOf(
    PropTypes.shape(shapeTypes).isRequired,
  );

  switch (action) {
    case 6:
    case 7:
    case 8:
      return PropTypes.checkPropTypes(
        { pages: defaultPropTypes.isRequired },
        props,
        `action ${action} > pages`,
        componentName,
      );

    default:
      return PropTypes.checkPropTypes(
        { pages: defaultPropTypes },
        props,
        'pages',
        componentName,
      );
  }
};

export const HEIGHT_TYPE = PropTypes.oneOf([
  ...[].constructor.apply({}, new Array(161)).map((_, index) => 40 + index),
]);
