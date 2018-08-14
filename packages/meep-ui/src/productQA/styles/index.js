import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

export const modifyAntdStyle = colors => ({
  width: '70%',

  '.ant-list': {
    margin: '0px 0px 20px',
  },

  '.ant-list-item': {
    borderBottom: `1px solid ${colors[3]}`,
  },

  '.ant-list-item > .ant-list-item-extra-wrap': {
    width: '100%',
  },

  '.ant-list-item-meta-description > pre': {
    color: '#000000',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },

  'textarea.ant-input': {
    resize: 'none',
  },

  '.ant-form-item-control:not(.has-error) textarea.ant-input': {
    border: `1px solid ${colors[5]}`,
  },

  mediaQueries: {
    [PHONE_MEDIA.replace(/@media /, '')]: {
      '.ant-list-item': {
        display: 'block',
      },
    },
  },
});

export const replay = colors => ({
  color: colors[4],
  cursor: 'pointer',
  userSelect: 'none',
});

export const arrowRightIcon = {
  verticalAlign: 'text-top',
};

export const replayContent = colors => ({
  margin: '10px 0px 0px',
  padding: '12px 18px',
  background: transformColor(colors[4]).alpha(0.1),
});

export const buttonRoot = {
  textAlign: 'center',
  margin: '0px 0px 20px',
};

export const resetButton = colors => ({
  margin: '5px',
  color: colors[4],
  borderColor: colors[4],
});

export const submitButton = colors => ({
  margin: '5px',
  color: colors[2],
  borderColor: colors[4],
  backgroundColor: colors[4],
});
