import { PHONE_MEDIA } from 'constants/media';

export const modifyAntdStyle = {
  '.ant-progress-circle.ant-progress-status-exception .ant-progress-text, .ant-progress-circle .ant-progress-text .anticon': {
    fontSize: '40px',
  },

  '#go-to-home-button, #other-button': {
    width: '220px',
    height: '60px',
    borderRadius: '0px',
  },

  '#go-to-home-button': {
    margin: '0px 35px 0px 0px',
    color: 'white',
    background: '#707F92',
    border: '0px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
    fontSize: '18px',
  },

  '#other-button': {
    color: '#979797',
    border: '1px solid #979797',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.05)',
    fontSize: '18px',
  },

  '#other-button:hover': {
    color: 'white',
    background: '#666666',
  },

  mediaQueries: {
    [PHONE_MEDIA.replace(/@media /, '')]: {
      '.ant-progress:not(.ant-progress-status-normal) .ant-progress-inner': {
        width: '32px !important',
        height: '32px !important',
        fontSize: '16px',
      },

      '.ant-progress-circle.ant-progress-status-exception .ant-progress-text, .ant-progress-circle .ant-progress-text .anticon': {
        fontSize: '16px',
      },

      '#go-to-home-button, #other-button': {
        margin: '0px',
        width: '50vw',
        color: 'white',
        background: '#707F92',
      },
    },
  },
};

export const root = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  width: '100vw',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

export const header = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '50px',
  background: '#707f92',
};

export const title = {
  display: 'inline-block',
  margin: '0px 0px 0px 20px',
  color: '#666666',
  fontSize: '40px',
  letterSpacing: '0.03px',
  verticalAlign: 'middle',
  [PHONE_MEDIA]: {
    fontSize: '30px',
  },
};

export const info = {
  margin: '60px 25px 0px',
  color: '#666666',
  fontSize: '22px',
  letterSpacing: '2.25px',
  lineHeight: '30px',
  [PHONE_MEDIA]: {
    margin: '35px 25px 0px',
    fontSize: '18px',
  },
};

export const buttonRoot = {
  margin: '100px 0px 0px',
  [PHONE_MEDIA]: {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    margin: '0px',
  },
};
