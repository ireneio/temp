import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '@store/utils/lib/i18n';

import Image from 'image';
import {
  GALLERY_TYPE,
  LOCALE_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';

import styles from './styles/index.less';

@withTranslation('common')
export default class ProductCollection extends React.PureComponent {
  static propTypes = {
    /** props */
    galleries: GALLERY_TYPE.isRequired,
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
          .filter(image => image?.src)
          .map(({ fileId, src }) => (
            <div
              key={fileId}
              className={`${styles.imgWrapper} ${styles[align]} ${
                mode === 'list' ? styles[mode] : ''
              }`}
            >
              <Image
                className={styles.img}
                image={src}
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
