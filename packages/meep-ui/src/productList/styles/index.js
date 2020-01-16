import color from 'color';
import { PHONE_MEDIA } from 'constants/media';

export const listStyle = (colors, isGrid) => ({
  // ant-pagination
  '.ant-pagination-item': {
    backgroundColor: 'transparent',
    border: `1px solid ${colors[3]}`,
  },
  '.ant-pagination-item-active': {
    borderColor: colors[4],
  },

  // ant-select
  '.ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active': {
    boxShadow: 'none',
  },
  '.ant-select-selection': {
    backgroundColor: 'transparent',
    color: colors[3],
    borderColor: colors[3],
  },
  '.ant-select-disabled .ant-select-selection': {
    borderColor: '#B3B3B3',
    color: '#5C5C5C',
    opacity: 0.4,
  },
  '.ant-select-selection__rendered': {
    marginRight: '30px',
  },
  '.ant-select-arrow': {
    color: colors[3],
  },
  '.ant-select-dropdown-menu': {
    borderRadius: '4px',
  },
  '.ant-select-dropdown-menu li': {
    backgroundColor: colors[0],
    color: colors[3],
  },
  '.ant-select-dropdown-menu-item:hover': {
    backgroundColor: colors[4],
  },
  '.ant-select-dropdown-menu-item-selected, .ant-select-dropdown-menu-item-selected:hover': {
    backgroundColor: colors[4],
  },

  // ant-spin
  '.ant-spin': {
    width: '100%',
    height: '200px',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.ant-spin-dot i': {
    backgroundColor: colors[3],
  },

  // loaders
  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      '.ant-pagination': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      '.ant-pagination-item, .ant-pagination-jump-prev, .ant-pagination-jump-next': {
        marginRight: '3px',
      },
      '.ant-pagination-prev, .ant-pagination-next': {
        margin: '0px',
        height: 'auto',
        padding: '10px',
      },
      '.loaders': {
        width: `${isGrid ? '50%' : '100%'} !important`,
        margin: '0px !important',
        padding: '10px',
      },
    },
  },
});

export const modalStyle = colors => ({
  // ant-modal
  padding: '0',

  '.ant-modal-content': {
    backgroundColor: colors[0],
    overflow: 'hidden',
  },
  '.ant-modal-header': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
  },
  '.ant-modal-title': {
    textAlign: 'center',
    color: colors[3],
  },
  '.ant-modal-close': {
    color: colors[3],
  },
  '.ant-modal-body': {
    padding: '0',
    maxHeight: '80vh',
    overflow: 'auto',
    marginBottom: '50px',
  },
  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      top: '0',
      margin: '0',
      height: '100%',
      width: '100% !important',
      maxWidth: 'initial !important',

      '.ant-modal-content': {
        borderRadius: '0',
        height: '100%',
      },
      '.ant-modal-body': {
        borderRadius: '0',
        maxHeight: 'unset',
        height: 'calc(100% - 105px)',
        paddingBottom: '50px',
        marginBottom: '0',
      },
    },
  },
});

export const root = {
  width: '100%',
  wordWrap: 'break-word',
  hyphens: 'auto',
  position: 'relative',
};

export const wrapper = {
  padding: '0px',
};

export const loading = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  cursor: 'not-allowed',
};

export const sort = showSort => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: showSort ? '20px' : '0px',
  [PHONE_MEDIA]: {
    margin: '20px 10px',
    justifyContent: 'space-between',
  },
});

export const display = {
  fontSize: '24px',
  display: 'none',
  cursor: 'pointer',
  [PHONE_MEDIA]: {
    display: 'block',
  },
};

export const list = padding => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: padding / 2,
  [PHONE_MEDIA]: {
    padding: '0px',
  },
});

export const pagination = {
  display: 'flex',
  justifyContent: 'center',
  margin: '20px',
  [PHONE_MEDIA]: {
    margin: '20px 0px',
  },
};

export const paginationItem = colors => ({
  color: colors[3],
});

export const paginationLink = {
  width: '100%',
  margin: '0',
};

export const productCard = (colors, isGrid) => ({
  color: colors[3],
  [PHONE_MEDIA]: {
    width: isGrid ? '50%' : '100%',
    margin: '0',
    padding: '10px',
  },
});

export const defaultProductImage = {
  position: 'relative',
};

export const defaultProductHint = {
  color: 'rgb(255,255,255,0.85)',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: '#000000',
  opacity: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  cursor: 'not-allowed',
  transition: 'all 0.3s ease',
  ':hover': {
    opacity: 0.65,
  },
};

export const productImage = {
  width: '100%',
  cursor: 'pointer',
  marginBottom: '10px',
};

export const productTitle = {
  marginBottom: '10px',
  fontSize: '16px',
};

export const productDescription = colors => ({
  display: '-webkit-box',
  WebkitLineClamp: '3',
  WebkitBoxOrient: 'vertical',
  maxHeight: '55px',
  overflow: 'hidden',
  fontSize: '13px',
  marginBottom: '10px',
  color: color(colors[3]).alpha(0.8),
});

export const productPrice = {
  marginBottom: '10px',
};

export const otherPrice = colors => ({
  fontSize: '12px',
  marginBottom: '2px',
  color: color(colors[3]).alpha(0.6),
});

export const strike = {
  marginLeft: '5px',
};

export const thePrice = {
  fontSize: '15px',
  fontWeight: 'bold',
};

export const productAddToCart = colors => ({
  fontSize: '13px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: `1px solid ${colors[3]}`,
  cursor: 'pointer',
  transition: '0.5s',
  padding: '6px 15px',
  outline: 'none',
  backgroundColor: 'transparent',
  ':hover': {
    backgroundColor: color(colors[3]).alpha(0.6),
  },
  ':disabled': {
    border: `1px solid ${color(colors[3]).alpha(0.4)}`,
    color: color(colors[3]).alpha(0.4),
    cursor: 'not-allowed',
  },
});
