import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/index.less';

const Thumb = ({ imgUrl }) => (
  <div className={styles.wrapper}>
    <div
      className={styles.image}
      style={{ backgroundImage: `url(//${imgUrl}?w=80)` }}
    />
  </div>
);

Thumb.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

export default Thumb;
