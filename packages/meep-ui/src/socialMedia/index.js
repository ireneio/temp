import React from 'react';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import { DEFAULT_URL, BRANDS } from './constants';
import styles from './styles/index.less';

export default class SocialMedia extends React.PureComponent {
  static propTypes = {
    /** props */
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
  };

  static defaultProps = {
    /** props */
    href: null,
  };

  render() {
    const { href, alignment } = this.props;

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        {Object.keys(BRANDS).map(brand => {
          const { url, Icon } = BRANDS[brand];

          return (
            <a
              key={brand}
              href={`${url}${href?.replace(/^\/\//, 'http://') || DEFAULT_URL}`}
              className={`${styles.shareButton} ${styles[brand]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    );
  }
}
