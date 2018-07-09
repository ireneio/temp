import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

const buttonStyle = {
  display: 'block',
  minWidth: '150px',
  height: '60px',
};
export const modifyAntdStyle = colors => ({
  '.ant-table-tbody > tr > td': {
    padding: '20px 10px',
    borderBottom: `1px solid ${colors[5]}`,
  },

  '.ant-table-tbody > tr:hover > td': {
    background: colors[5],
  },

  '.ant-table-body > table > colgroup > col:nth-child(1)': {
    width: '100px',
    minWidth: '100px',
  },

  '.not-break': {
    wordBreak: 'keep-all',
    whiteSpace: 'nowrap',
  },

  '#pay-now': {
    ...buttonStyle,
    color: colors[2],
    borderColor: colors[1],
    background: colors[1],
  },

  '#pay-latter': {
    ...buttonStyle,
    margin: '0px 0px 15px 0px',
    color: colors[2],
    background: 'rgba(0, 0, 0, 0)',
    borderColor: colors[2],
  },

  mediaQueries: {
    [PHONE_MEDIA.replace(/@media /, '')]: {
      '.ant-table-tbody > tr > td': {
        padding: '15px 6px',
      },

      '.ant-table-body > table > colgroup > col': {
        width: 'initial !important',
        height: 'initial !important',
      },

      '.ant-table-body > table > colgroup > col:nth-child(1)': {
        width: '72px',
        minWidth: '72px',
      },

      '.hide-in-phone': {
        display: 'none',
      },

      '#pay-now, #pay-latter': {
        flexGrow: 1,
        margin: '0px',
        minWidth: 'initial',
        width: '100%',
        background: 'white',
        borderColor: colors[1],
        borderRadius: '0px',
        borderWidth: '2px 0px 0px',
      },

      '#pay-latter': {
        borderWidth: '2px 2px 0px 0px',
      },
    },
  },
});

export const container = {
  width: '100%',
  padding: '50px 10%',
  [PHONE_MEDIA]: {
    padding: '30px 20px',
  },
};

export const root = {
  background: '#fafafa',
  color: '#666666',
};

export const infoRoot = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  lineHeight: '28px',
};

export const modify = {
  width: '200px',
  lineHeight: '60px',
  borderRadius: '1px',
  background: '#ffffff',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.05)',
  fontSize: '17px',
  textAlign: 'center',
  cursor: 'pointer',
  [PHONE_MEDIA]: {
    width: '110px',
    lineHeight: '40px',
  },
};

export const editIcon = colors => ({
  margin: '0px 5px 0px 0px',
  width: '20px',
  height: '20px',
  fill: colors[4],
});

export const imgWrapper = {
  width: '80px',
  height: '80px',
  background: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  [PHONE_MEDIA]: {
    width: '60px',
    height: '60px',
  },
};

export const img = {
  maxWidth: '100%',
  maxHeight: '100%',
};

export const phoneSpec = {
  display: 'none',
  [PHONE_MEDIA]: {},
};

export const hideInPhone = {
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const activityRoot = {
  color: '#979797',
  margin: '10px 0px 0px',
};

export const artivity = {
  padding: '2px 0px 2px 22px',
};

export const tagIcon = {
  margin: '0px 5px',
};

export const giftError = colors => ({
  color: transformColor(colors[3]).alpha(0.5),
});

export const orderShowTotal = {
  padding: '30px 10px',
};

export const orderDetail = colors => ({
  display: 'flex',
  background: colors[4],
  color: colors[2],
  lineHeight: '25px',
  [PHONE_MEDIA]: {
    display: 'block',
    padding: '30px 20px 80px',
  },
});

export const orderDetailTitle = colors => ({
  margin: '0px 0px 20px 0px',
  fontSize: '18px',
  color: transformColor(colors[2]).alpha(0.5),
});

export const orderItem = {
  flexGrow: 1,
  [PHONE_MEDIA]: {
    margin: '0px 0px 40px',
  },
};

export const buttonRoot = {
  [PHONE_MEDIA]: {
    display: 'flex',
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    margin: '0px',
    width: '100vw',
  },
};

export const arrowRightIcon = {
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'inline-block',
    margin: '0px 0px 0px 16px',
  },
};
