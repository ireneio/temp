// TODO remove
import transformColor from 'color';

import { PHONE_MEDIA } from 'constants/media';

export const root = colors => ({
  display: 'flex',
  background: colors[0],
  [PHONE_MEDIA]: {
    display: 'block',
    padding: '60px 0px 0px',
  },
});

/** phone size style */
export const phoneSizeHeader = colors => ({
  display: 'none',
  [PHONE_MEDIA]: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100vw',
    background: colors[4],
    zIndex: 10,
  },
});

export const headerButton = {
  padding: '15px',
  cursor: 'pointer',
};

export const headerIcon = {
  width: '30px',
  height: '30px',
};

export const phoneSizeInfo = {
  display: 'none',
  [PHONE_MEDIA]: {
    display: 'block',
    fontSize: '20px',
  },
};

export const phoneSizeWrapper = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '12px 0px 40px',
  padding: '20px 0px',
  borderTop: '1px solid #cccccc',
  borderBottom: '1px solid #cccccc',
  fontSize: '16px',
  fontWeight: 500,
};

/** default style */
export const fields = {
  display: 'flex',
  flexGrow: 1,
};

export const wrapper = {
  margin: '40px auto',
  width: '60%',
  [PHONE_MEDIA]: {
    width: 'calc(100% - 25px * 2)',
  },
};

const antClassName = [
  '.ant-cascader-picker .ant-cascader-input.ant-input',
  '.ant-select .ant-select-selection--single',
  '.ant-input:not([type=password])',
  '.ant-input-number',
  '.ant-input-password',
];
export const modifyAntdStyle = colors => ({
  [antClassName
    .map(className => `.ant-form-item-control:not(.has-error) ${className}`)
    .join(', ')]: {
    border: `1px solid ${colors[5]}`,
  },

  [antClassName.join(', ')]: {
    width: '100%',
    fontSize: '16px',
    resize: 'none',
  },

  '.ant-input-search button': {
    color: colors[2],
    background: colors[4],
    borderColor: colors[4],
  },

  '.ant-checkbox + span': {
    padding: '0px 0px 0px 8px',
    userSelect: 'none',
  },

  '.ant-collapse, .ant-collapse>.ant-collapse-item>.ant-collapse-header, .ant-collapse-content': {
    color: 'inherit',
  },
});

export const block = {
  margin: '0px 0px 60px',
};

export const title = {
  fontSize: '18px',
  margin: '0px 0px 5px',
  padding: '0px 3px',
};

export const formItem = {
  margin: '0px',
  padding: '7px 3px',
  width: '100%',
};

export const points = colors => ({
  margin: '13px 0px 0px',
  padding: '14px 16px',
  background: transformColor(colors[5]).alpha(0.15),
  color: colors[2],
  borderRadius: '2px',
});

export const submitButtonRoot = {
  width: '150px',
  [PHONE_MEDIA]: {
    display: 'none',
  },
};

export const submitButton = colors => ({
  width: '100%',
  height: '50px',
  color: colors[2],
  borderColor: colors[4],
  background: colors[4],
});
