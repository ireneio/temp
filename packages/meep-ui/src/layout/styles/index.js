// TODO remove

/**
 * @param {Object} backgroundImage - getPageList
 * @param {Array} colors -> getColorList -> themes[selected].colors
 * @param {String} background -> getPageList
 */
export const root = (backgroundImage, colors, background) => {
  const realBackground = (() => {
    const { image, used, repeat, size } = backgroundImage;

    if (used && image) {
      return `
        ${colors[0]}
        url(${`//${image}`})
        ${repeat ? 'repeat' : 'no-repeat'} top left /
        ${size ? '100%' : 'auto'} auto
      `;
    }

    return background || colors[0];
  })();

  return {
    color: colors[3],
    background: realBackground,
  };
};

export const globalStyles = colors => ({
  'h1, h2, h3, h4, h5, h6, span, .ant-form': {
    color: colors[3],
  },
  '.ant-cascader-picker-label': {
    color: 'rgba(0,0,0,.65)',
  },
  'button > span': {
    color: 'inherit',
  },
  pre: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
  },
});

export const meepshopFooter = {
  padding: '30px 0',
  textAlign: 'center',
};

export const meepshopFooterLink = {
  fontSize: '12px',
  color: '#9b9b9b',
  textDecoration: 'none',
};
