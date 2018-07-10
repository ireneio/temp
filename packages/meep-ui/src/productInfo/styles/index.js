import { PHONE_MEDIA } from 'constants/media';

export const infoStyle = colors => ({
  color: colors[3],

  // ant-select
  '.ant-select-focused .ant-select-selection, .ant-select-selection:focus, .ant-select-selection:active': {
    boxShadow: 'none',
  },
  '.ant-select-selection': {
    backgroundColor: 'transparent',
    color: colors[3],
    borderColor: colors[5],
    height: 'unset',
  },
  '.ant-select-selection__rendered': {
    overflow: 'hidden',
  },
  '.ant-select-search--inline': {
    width: 'calc(100% - 12px)',
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
  '.ant-select-selection-selected-value': {
    whiteSpace: 'unset',
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

  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      '.add-item': {
        flex: '1',
        borderRadius: '0 !important',
        marginRight: '0 !important',
      },
      '.add-wish': {
        borderRadius: '0 !important',
      },
    },
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
        padding: '10px 20px 0',
        [PHONE_MEDIA]: {
          maxWidth: '500px',
          margin: 'auto',
          padding: '10px 15px 50px',
        },
      }),
});
