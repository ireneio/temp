import React from 'react';

import { contextProvider } from 'context';

const { enhancer } = contextProvider('storeSetting');

@enhancer
export default class GlobalStyles extends React.PureComponent {
  render() {
    const { colors } = this.props;

    return (
      <style>
        {`
          h1, h2, h3, h4, h5, h6, span, .ant-form: {
            color: ${colors[3]};
          }

          button > span {
            color: inherit;
          }

          pre {
            font-family: inherit;
            font-size: inherit;
          }

          .ant-cascader-picker-label {
            color: rgba(0,0,0,.65);
          }
        `}
      </style>
    );
  }
}
