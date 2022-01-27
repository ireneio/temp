// TODO remove
const antInputClassName = [
  '.ant-cascader-picker .ant-cascader-input.ant-input',
  '.ant-select .ant-select-selection--single',
  '.ant-input:not([type=password]):not(textarea)',
  '.ant-input-number',
  '.ant-input-password',
  '.ant-input',
];

const antClassName = [
  '.ant-cascader-picker .ant-cascader-input.ant-input',
  '.ant-select .ant-select-selection--single',
  '.ant-input:not([type=password]):not(textarea)',
  '.ant-input-number',
  '.ant-input-password',
];

export const modifyAntdStyle = colors => ({
  [antInputClassName
    .map(className => `.ant-form-item-control:not(.has-error) ${className}`)
    .join(', ')]: {
    color: colors[3],
  },

  [antClassName
    .map(className => `.ant-form-item-control:not(.has-error) ${className}`)
    .join(', ')]: {
    border: `1px solid ${colors[5]}`,
  },

  [antClassName.join(', ')]: {
    width: '100%',
    height: '32px',
    fontSize: '16px',
    resize: 'none',
  },

  'textarea.ant-input': {
    resize: 'none',
  },

  '.ant-btn': {
    fontSize: '16px',
    color: colors[2],
    background: colors[4],
    borderColor: colors[4],
  },

  '.ant-spin-dot-item': {
    background: colors[4],
  },

  '.ant-checkbox + span': {
    padding: '0px 0px 0px 8px',
    userSelect: 'none',
  },

  '.ant-collapse, .ant-collapse>.ant-collapse-item>.ant-collapse-header, .ant-collapse-content': {
    color: 'inherit',
  },
});

export const formItem = {
  margin: '0px',
  padding: '7px 3px',
  width: '100%',
};
