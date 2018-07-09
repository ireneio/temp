export const error = productHasError => ({
  fontSize: '12px',
  lineHeight: '21px',
  color: productHasError ? '#d0011b' : '#ccc',
  textAlign: 'right',
});

export const price = {
  whiteSpace: 'nowrap',
};

export const modifyAntdStyle = colors => ({
  '.ant-select-selection--single': {
    width: '75px',
    height: '40px',
  },

  '.ant-form-item-control:not(.has-error) .ant-select-selection--single:not(:hover)': {
    border: `1px solid ${colors[5]}`,
  },

  '.ant-select-selection--single .ant-select-selection__rendered': {
    lineHeight: '38px',
  },

  '.ant-form-explain': {
    margin: '0px',
  },
});
