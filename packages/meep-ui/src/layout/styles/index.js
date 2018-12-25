// TODO remove

/**
 * @param {Object} backgroundImage - getPageList
 * @param {Array} colors -> getColorList -> themes[selected].colors
 * @param {String} background -> getPageList
 */
export const root = (backgroundImage, colors, background) => {
  const realBackground = (() => {
    const { files, used, repeat, size } = backgroundImage;
    const { image } = files?.[0] || {};

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

export const meepshopFooter = {
  padding: '30px 0',
  textAlign: 'center',
};

export const meepshopFooterLink = {
  fontSize: '12px',
  color: '#9b9b9b',
  textDecoration: 'none',
};
