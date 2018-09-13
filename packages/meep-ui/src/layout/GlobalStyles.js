import React from 'react';

import './styles/globalStyles.less';

import { contextProvider } from 'context';

const { enhancer } = contextProvider('storeSetting');

@enhancer
export default class GlobalStyles extends React.PureComponent {
  render() {
    const { colors } = this.props;

    return (
      <style>
        {`
          h1, h2, h3, h4, h5, h6,
          span,
          a, a:hover, a:active, a:focus, a:visited,
          .ant-form {
            color: ${colors[3]};
          }
        `}
      </style>
    );
  }
}
