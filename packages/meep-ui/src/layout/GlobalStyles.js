import React from 'react';

import { contextProvider } from 'context';

import './styles/globalStyles.less';

const { enhancer } = contextProvider('storeSetting');

@enhancer
export default class GlobalStyles extends React.PureComponent {
  render() {
    const { colors } = this.props;

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: `
            h1, h2, h3, h4, h5, h6,
            span,
            a, a:hover, a:active, a:focus, a:visited,
            .ant-form {
              color: ${colors[3]};
            }
          `,
        }}
      />
    );
  }
}
