import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import Image from 'image';
import { LOCALE_TYPE, CONTENT_WIDTH_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

@withTranslation('common')
export default class ProductCollection extends React.PureComponent {
  static propTypes = {
    /** props */
    align: PropTypes.oneOf(['original', 'side']).isRequired,
    title: LOCALE_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']),
  };

  static defaultProps = {
    mode: 'detail',
  };

  render() {
    const {
      /** props */
      i18n,
      galleries,
      align,
      title,
      contentWidth,
      mode,
    } = this.props;
    const images = galleries?.[1]?.images;

    if (!images) return null;

    return (
      <div
        className={`${styles.root} ${styles[align]} ${
          mode === 'list' ? styles[mode] : ''
        }`}
      >
        {images
          .filter(image => image?.scaledSrc)
          .map(({ id, ...image }) => (
            <div
              key={id}
              className={`${styles.imgWrapper} ${styles[align]} ${
                mode === 'list' ? styles[mode] : ''
              }`}
            >
              <Image
                className={styles.img}
                image={image}
                contentWidth={contentWidth}
                alt={title[i18n.language] || title.zh_TW}
                alignment="center"
                newWindow={false}
              />
            </div>
          ))}
      </div>
    );
  }
}
