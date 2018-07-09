export const mobileWidth = '(max-width: 768px)';

export const root = {
  maxWidth: '1000px',
  margin: 'auto',
  padding: '0 30px',
  [`@media ${mobileWidth}`]: {
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
  '.ant-table': {
    color: 'initial',
  },
  '.alignCenter': {
    textAlign: 'center',
  },
  mediaQueries: {
    [mobileWidth]: {
      '.hideOnMobile': {
        display: 'none',
      },
      '.ant-table-thead > tr > th, .ant-table-tbody > tr > td': {
        fontSize: '14px',
        padding: '10px',
      },
    },
  },
});

export const total = colors => ({
  width: '100%',
  borderBottom: `3px solid ${colors[5]}`,
  fontSize: '18px',
  padding: '20px 25px',
  boxSizing: 'border-box',
  [`@media ${mobileWidth}`]: {
    fontSize: '16px',
    padding: '10px',
  },
});
