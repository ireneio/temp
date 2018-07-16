import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './styles';

export default class Iframe extends React.PureComponent {
  static propTypes = {
    htmlCode: PropTypes.string.isRequired,
  };

  render() {
    const { htmlCode } = this.props;

    return (
      <div
        style={styles.root}
        dangerouslySetInnerHTML={{
          // eslint-disable-line react/no-danger
          __html: htmlCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        }}
      />
    );
  }
}
