import React from 'react';
import PropTypes from 'prop-types';

import { contextProvider } from 'context';
import Image from 'image';
import {
  GALLERY_TYPE,
  LOCALE_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';

import styles from './styles/index.less';

const { enhancer } = contextProvider('locale');

@enhancer
export default class ProductCollection extends React.PureComponent {
  static propTypes = {
    /** props */
    galleries: GALLERY_TYPE.isRequired,
    align: PropTypes.oneOf(['original', 'side']).isRequired,
    title: LOCALE_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
  };

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      galleries,
      align,
      title,
      contentWidth,
    } = this.props;
    const images = galleries?.[1]?.images;

    if (!images) return null;

    return (
      <div className={`${styles.root} ${styles[align]}`}>
        {images
          .filter(image => image?.src)
          .map(({ fileId, src }) => (
            <div
              key={fileId}
              className={`${styles.imgWrapper} ${styles[align]}`}
            >
              <Image
                className={styles.img}
                image={src}
                contentWidth={contentWidth}
                alt={transformLocale(title)}
                alignment="center"
                newWindow={false}
              />
            </div>
          ))}
      </div>
    );
  }
}
