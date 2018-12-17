import React from 'react';
import PropTypes from 'prop-types';

import styles from './share-link.less';

const ShareLink = ({ href, children }) => (
  <a
    className={styles.link}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

ShareLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ShareLink;
