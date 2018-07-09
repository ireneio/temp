import color from 'color';
import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  width: '100%',
  wordBreak: 'break-all',
  color: colors[3],
});

export const wrapper = {
  padding: '40px',
  [PHONE_MEDIA]: {
    padding: '40px 0',
  },
};

export const Style = colors => ({
  '.show-on-mobile': {
    display: 'none',
  },

  '.not-break': {
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
  },

  '.ant-table': {
    color: 'inherit',
  },

  '.ant-table-thead > tr > th': {
    background: 'transparent',
    fontSize: '16px',
  },

  '.ant-table-tbody > tr:hover > td': {
    backgroundColor: color(colors[4])
      .alpha(0.1)
      .string(),
  },

  '.ant-table-tbody > tr.ant-table-row-selected td': {
    backgroundColor: color(colors[4])
      .alpha(0.1)
      .string(),
  },

  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      '.hide-on-mobile': {
        display: 'none',
      },

      '.show-on-mobile': {
        display: 'block',
      },

      '.fade-on-mobile': {
        color: color(colors[3])
          .alpha(0.5)
          .string(),
      },

      '.ant-table-thead > tr > th.ant-table-selection-column, .ant-table-tbody > tr > td.ant-table-selection-column': {
        width: '30px',
        minWidth: '30px',
      },

      '.ant-table-tbody > tr > td': {
        position: 'relative',
        paddingBottom: '50px !important',
      },

      '.ant-table-body > table > colgroup > col': {
        width: 'initial !important',
        height: 'initial !important',
      },
    },
  },
});

export const table = {
  marginBottom: '15px',
  borderTop: '1px solid #e8e8e8',
  [PHONE_MEDIA]: {
    padding: '0px',
  },
};

export const subtitle = {
  fontSize: '16px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '30px',
  [PHONE_MEDIA]: {
    padding: '0 15px',
  },
};

export const imgWrapper = {
  width: '80px',
  height: '80px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  margin: 'auto',
  [PHONE_MEDIA]: {
    width: '60px',
    height: '60px',
  },
};

export const img = {
  height: '100%',
};

export const reason = step => ({
  position: 'absolute',
  zIndex: '1',
  left: '8px',
  bottom: '10px',
  width: step ? 'calc(100vw - 16px)' : 'calc(100vw - 48px)',
  whiteSpace: 'nowrap',
  overflow: 'auto',
});

export const input = {
  marginTop: '15px',
};

export const form = {
  maxWidth: '560px',
  padding: '0 30px',
  margin: '30px auto 15px',
  [PHONE_MEDIA]: {
    padding: '15px',
  },
};

export const comfirm = {
  fontSize: '16px',
  padding: '0px 30px',
  margin: '30px 0',
  [PHONE_MEDIA]: {
    padding: '0 15px',
  },
};

export const formTitle = {
  color: '#797979',
  fontSize: '20px',
  padding: '16px',
  textAlign: 'center',
  letterSpacing: '1.5px',
};

export const panel = {
  textAlign: 'center',
  marginBottom: '15px',
};

export const button = colors => ({
  margin: '8px',
  height: '45px',
  color: colors[3],
  borderColor: colors[3],
  backgroundColor: 'transparent',
});
