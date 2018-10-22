import { PHONE_MEDIA } from 'constants/media';

export const root = {
  padding: '40px 0px',
  width: '100%',
};

export const content = contentWidth => ({
  margin: '0px auto',
  width: `${contentWidth}%`,
  [PHONE_MEDIA]: {
    // TODO
    width: '100%',
  },
});

export const block = {
  margin: '0px 0px 40px',
};

export const title = colors => ({
  fontSize: '20px',
  letterSpacing: '0.7',
  margin: '0px 0px 20px 0px',
  padding: '10px 0px',
  borderBottom: `1px solid ${colors[5]}`,
});

export const formItem = {
  margin: '0px',
  padding: '7px 3px',
  width: '100%',
};

const antClassName = [
  '.ant-cascader-picker .ant-cascader-input.ant-input',
  '.ant-select .ant-select-selection--single',
  'input.ant-input',
  '.ant-input-number',
  'textarea.ant-input',
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

  '.ant-divider-horizontal.ant-divider-with-text:before, .ant-divider-horizontal.ant-divider-with-text:after': {
    borderTop: `1px solid ${colors[5]}`,
  },

  '.ant-collapse, .ant-collapse>.ant-collapse-item>.ant-collapse-header, .ant-collapse-content': {
    color: 'inherit',
  },
});

export const argeementText = {
  whiteSpace: 'nowrap',
  fontSize: '20px',
  borderBottom: '0px',
};

export const agreementInfo = colors => ({
  margin: '0px 3px 30px',
  padding: '15px 20px',
  height: '220px',
  fontSize: '14px',
  lineHeight: '21px',
  color: 'black',
  background: 'white',
  border: `1px solid ${colors[5]}`,
  borderRadius: '2px',
  overflow: 'scroll',
});

export const submitButton = colors => ({
  display: 'block',
  margin: '0px auto',
  width: '150px',
  height: '50px',
  color: colors[2],
  borderColor: colors[4],
  background: colors[4],
});
