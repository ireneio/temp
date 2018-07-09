export const mobileWidth = '(max-width: 768px)';

export const root = {
  maxWidth: '880px',
  margin: 'auto',
  padding: '0 30px',
  [`@media ${mobileWidth}`]: {
    padding: '15px',
  },
};

export const Style = colors => ({
  '.alignCenter': {
    textAlign: 'center',
  },
  '.nowrap': {
    whiteSpace: 'nowrap',
  },
  '.ant-table': {
    color: 'initial',
  },
  '.ant-table-thead > tr > th': {
    background: 'transparent',
    fontSize: '16px',
  },
  '.ant-table-tbody > tr:hover > td': {
    background: colors[4],
  },
  mediaQueries: {
    [mobileWidth]: {
      '.ant-table-thead > tr > th': {
        display: 'none',
      },
      '.ant-table-thead > tr > th, .ant-table-tbody > tr > td': {
        fontSize: '14px',
        padding: '10px',
      },
    },
  },
});

export const productImage = src => ({
  width: '80px',
  height: '80px',
  marginRight: '20px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
  ...(src
    ? {
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(//${src})`,
      }
    : {
        backgroundColor: '#eeeeee',
      }),
  [`@media ${mobileWidth}`]: {
    width: '60px',
    height: '60px',
  },
});

export const productText = status => ({
  ...(status ? {} : { opacity: 0.5 }),
});

export const icon = {
  fontSize: '18px',
  cursor: 'pointer',
};
