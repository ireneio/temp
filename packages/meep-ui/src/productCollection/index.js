import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import Image from 'image';
import { URL_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import * as styles from './styles';

@enhancer
@radium
export default class ProductCollection extends React.PureComponent {
  static propTypes = {
    transformLocale: PropTypes.func.isRequired,
    files: PropTypes.arrayOf(URL_TYPE).isRequired,
    align: PropTypes.oneOf(['original', 'side']).isRequired,
    title: LOCALE_TYPE.isRequired,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 70,
  };

  render() {
    const { transformLocale, files, align, title, width } = this.props;
    const productName = transformLocale(title);

    return (
      <StyleRoot style={styles.root(align)}>
        {files.filter(url => url).map((url, index) => (
          <div
            key={
              `${productName}-${index}` // eslint-disable-line react/no-array-index-key
            }
            style={styles.imgWrapper(align)}
          >
            <div style={styles.img}>
              <Image
                files={{
                  image: url,
                }}
                contentWidth={width || 70}
                alignment="center"
                newWindow={false}
                alt={productName}
                mode="collection"
              />
            </div>
          </div>
        ))}
      </StyleRoot>
    );
  }
}
