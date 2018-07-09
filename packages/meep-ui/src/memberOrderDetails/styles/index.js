import color from 'color';
import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  width: '100%',
  wordBreak: 'break-all',
  color: colors[3],
});

export const wrapper = {
  maxWidth: '1056px',
  margin: 'auto',
  padding: '40px 0',
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

  mediaQueries: {
    [PHONE_MEDIA.substring(7)]: {
      '.show-on-mobile': {
        display: 'block',
      },

      '.hide-on-mobile': {
        display: 'none',
      },

      '.fade-on-mobile': {
        color: color(colors[3])
          .alpha(0.5)
          .string(),
      },

      '.ant-table': {
        borderRadius: 'none',
        borderTop: '1px solid #e8e8e8',
      },

      '.ant-table-thead': {
        display: 'none',
      },

      '.ant-table-thead > tr > th, .ant-table-tbody > tr > td': {
        padding: '10px',
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
  [PHONE_MEDIA]: {
    padding: '0px',
  },
};

export const totalSheet = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '16px',
  fontSize: '15px',
  [PHONE_MEDIA]: {
    padding: '15px',
  },
};

export const sheetItem = {
  width: '350px',
  display: 'flex',
  justifyContent: 'space-between',
  [PHONE_MEDIA]: {
    width: '100%',
  },
};

export const total = {
  marginTop: '20px',
};

export const totalEmphasized = {
  fontSize: '20px',
};

export const subtitle = {
  fontSize: '16px',
  padding: '0px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [PHONE_MEDIA]: {
    padding: '0 15px',
    marginBottom: '20px',
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
  width: '80px',
  height: '80px',
  [PHONE_MEDIA]: {
    width: '60px',
    height: '60px',
  },
};

export const blocks = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '0px 70px',
  [PHONE_MEDIA]: {
    padding: '0 15px',
  },
};

export const block = {
  width: '48%',
  maxWidth: '422px',
  padding: '25px 0',
  [PHONE_MEDIA]: {
    width: '100%',
    maxWidth: 'unset',
  },
};

export const blockTitle = {
  fontSize: '18px',
  marginBottom: '10px',
  letterSpacing: '1px',
};

export const blockStatus = colors => ({
  display: 'inline-block',
  color: colors[2],
  backgroundColor: colors[4],
  padding: '4px 10px',
  marginBottom: '10px',
});

export const blockDescription = colors => ({
  minHeight: '120px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 10px',
  color: colors[3],
  backgroundColor: color(colors[4])
    .alpha(0.1)
    .string(),
});

export const shipmentLink = colors => ({
  display: 'inline-block',
  border: `1px solid ${colors[3]}`,
  padding: '2px 5px',
  borderRadius: '5px',
  marginLeft: '10px',
});

export const hr = colors => ({
  height: '1px',
  border: 'none',
  margin: '10px 0',
  backgroundColor: colors[5],
});
