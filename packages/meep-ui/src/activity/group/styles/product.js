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
      padding: '0',
      height: '100%',
      width: '100% !important',
      maxWidth: 'initial !important',

      '.ant-modal-content': {
        borderRadius: '0',
        height: '100%',
      },
      '.ant-modal-header': {},
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
