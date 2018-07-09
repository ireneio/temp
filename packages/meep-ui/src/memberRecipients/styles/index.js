export const mobileWidth = '(max-width: 768px)';

export const root = {
  maxWidth: '840px',
  margin: 'auto',
  padding: '30px 0',
  [`@media ${mobileWidth}`]: {
    width: '100%',
    padding: '15px',
  },
};

export const Style = colors => ({
  '.ant-table-thead > tr > th': {
    background: 'transparent',
    fontSize: '16px',
  },
  '.ant-table-tbody > tr:hover > td': {
    background: colors[4],
  },
  '.ant-cascader-picker-label': {
    fontSize: '16px',
  },
  '.showOnMobile': {
    display: 'none',
  },
  '.nowrap': {
    whiteSpace: 'nowrap',
  },
  mediaQueries: {
    [mobileWidth]: {
      '.hideOnMobile': {
        display: 'none',
      },
      '.showOnMobile': {
        display: 'block',
      },
      '.ant-table-thead > tr > th': {
        display: 'none',
      },
    },
  },
});

export const table = {
  marginBottom: '30px',
};

export const form = {
  maxWidth: '500px',
  margin: 'auto',
};

export const action = {
  cursor: 'pointer',
};

export const recipient = {
  lineHeight: '1.4',
};

export const recipientRow = {
  display: 'flex',
  padding: '3px 0',
};

export const recipientRowTitle = {
  width: '50px',
  marginRight: 5,
  fontWeight: 'bold',
  flexShrink: 0,
};

export const button = colors => ({
  height: '45px',
  width: '100px',
  color: colors[3],
  borderColor: colors[3],
  marginRight: '16px',
  backgroundColor: 'transparent',
});
