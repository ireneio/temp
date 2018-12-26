import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import { GALLERY_TYPE, LOCALE_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';

import * as styles from './styles';

@enhancer
@radium
export default class ProductCollection extends React.PureComponent {
  static propTypes = {
    transformLocale: PropTypes.func.isRequired,
    galleries: GALLERY_TYPE.isRequired,
    align: PropTypes.oneOf(['original', 'side']).isRequired,
    title: LOCALE_TYPE.isRequired,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 70,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  render() {
    const { transformLocale, galleries, align, title, width } = this.props;
    const { isMobile } = this.state;
    const images = galleries?.[1]?.images;
    const productName = transformLocale(title);

    if (!images) return null;

    return (
      <StyleRoot style={styles.root(align)}>
        {images
          .filter(image => image && image.src)
          .map(image => (
            <div key={image.fileId} style={styles.imgWrapper(align)}>
              <div style={styles.img}>
                <Image
                  image={image.src}
                  contentWidth={isMobile ? 100 : width || 70}
                  alignment="center"
                  newWindow={false}
                  alt={productName}
                />
              </div>
            </div>
          ))}
      </StyleRoot>
    );
  }
}
