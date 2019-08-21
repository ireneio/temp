import { PHONE_MEDIA } from 'constants/media';

export const infoStyle = colors => ({
  color: colors[3],

  // ant-select
  '.ant-select': {
    minWidth: '60px',
  },
  '.ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active': {
    boxShadow: 'none',
  },
  '.ant-select-selection': {
    backgroundColor: 'transparent',
    color: colors[3],
    borderColor: colors[5],
    height: 'unset',
    margin: '0 6px 6px 0',
  },
  '.ant-select-selection__rendered': {
    overflow: 'hidden',
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
    whiteSpace: 'unset',
    wordBreak: 'break-all',
  },
  '.ant-select-dropdown-menu-item:hover': {
    backgroundColor: colors[4],
  },
  '.ant-select-dropdown-menu-item-selected, .ant-select-dropdown-menu-item-selected:hover': {
    backgroundColor: colors[4],
  },
  '.ant-select-selection-selected-value': {
    whiteSpace: 'unset',
    wordBreak: 'break-all',
    width: '100%',
    textAlign: 'center',
  },

  // ant-modal
  '.ant-modal-content': {
    backgroundColor: colors[0],
  },
  '.ant-modal-footer': {
    borderTop: 'none',
  },
  '.ant-modal-footer .ant-btn': {
    backgroundColor: 'transparent',
    borderColor: colors[5],
    color: colors[3],
  },
  '.ant-modal-footer .ant-btn-primary': {
    backgroundColor: colors[4],
    borderColor: colors[4],
    color: colors[3],
  },
});

export const root = mode => ({
  width: '100%',
  paddingBottom: mode === 'detail' ? '60px' : '0px',
});

export const wrapper = mode => ({
  ...(mode === 'detail'
    ? {
        padding: '60px 20px 0',
        [PHONE_MEDIA]: {
          maxWidth: '500px',
          margin: 'auto',
          padding: '15px 15px 0',
        },
      }
    : {
        padding: '10px 25px 0',
        [PHONE_MEDIA]: {
          maxWidth: '500px',
          margin: 'auto',
          padding: '10px 15px 0',
        },
      }),
});
