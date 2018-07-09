import { PHONE_MEDIA } from 'constants/media';

export const root = {
  width: '48%',
  maxWidth: 240,
  position: 'relative',
  fontSize: '16px',
  textAlign: 'left',
  backgroundColor: '#fff',
  margin: '0 30px 30px 0',
  boxSizing: 'border-box',
  display: 'inline-block',
  verticalAlign: 'top',
  [PHONE_MEDIA]: {
    flexShrink: 0,
    margin: '0 0 30px 0',
    alignSelf: 'flex-start',
  },
};

export const modalStyle = colors => ({
  top: '60px',
  '.ant-modal-content': {
    backgroundColor: colors[0],
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
  },
  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      top: '0',
      margin: '0',
      padding: '0',
      height: '100vh',
      '.ant-modal-content': {
        borderRadius: '0',
        height: '100%',
      },
      '.ant-modal-header': {},
      '.ant-modal-body': {
        borderRadius: '0',
        height: 'calc(100% - 55px)',
      },
    },
  },
});

export const productImage = {
  width: '100%',
  cursor: 'pointer',
};

export const productText = {
  padding: 15,
};

export const productTitle = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginBottom: 15,
};

export const productPrice = {
  fontSize: '18px',
};

export const addButton = {
  width: '100%',
  height: 35,
  textAlign: 'center',
  lineHeight: '35px',
  cursor: 'pointer',
};

export const modal = {
  height: '100%',
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
