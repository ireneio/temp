import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/index.less';

export default class Iframe extends React.PureComponent {
  static propTypes = {
    /**
     * props | test
     * <div_style="color:red">iframe_with_normal_tag</div>,
     * &lt;div_style="color:blue"&gt;iframe_with_string_tag&lt;/div&gt;
     */
    htmlCode: PropTypes.string.isRequired,
  };

  render() {
    const { htmlCode } = this.props;

    return (
      <div
        className={styles.root}
        dangerouslySetInnerHTML={{
          __html: htmlCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        }}
      />
    );
  }
}
