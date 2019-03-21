import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { close as RemoveIcon } from 'react-icons/md';
import { tag as TagIcon } from 'react-icons/fa';

import { enhancer } from 'layout/DecoratorsRoot';
import Thumb from 'thumb';
import {
  ID_TYPE,
  COLOR_TYPE,
  LOCALE_TYPE,
  PURCHASE_ITEMS_TYPE,
  GALLERY_IMAGE_TYPE,
} from 'constants/propTypes';

import Select from './Select';
import * as LOCALE from './locale';
import * as styles from './styles/product';

@enhancer
@radium
export default class Product extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    removeCartItems: PropTypes.func.isRequired,

    /** props */
    error: PropTypes.string,
    mainImage: GALLERY_IMAGE_TYPE.isRequired,
    specs: PropTypes.arrayOf(
      PropTypes.shape({
        title: LOCALE_TYPE.isRequired,
      }).isRequired,
    ),
    cartId: ID_TYPE.isRequired,
    productId: ID_TYPE.isRequired,
    type: PropTypes.oneOf(['product', 'gift']).isRequired,
    stock: PURCHASE_ITEMS_TYPE.isRequired,
    title: LOCALE_TYPE.isRequired,
    activityInfo: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        title: LOCALE_TYPE.isRequired,
      }).isRequired,
    ),
    onChange: PropTypes.func.isRequired,
    productHasError: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
    activityInfo: null,
    specs: null,
  };

  render() {
    const {
      colors,
      transformLocale,
      removeCartItems,
      type,
      error,
      mainImage,
      activityInfo,
      specs,
      cartId,
      productId,
      stock,
      title,
      onChange,
      productHasError,
      ...props
    } = this.props;

    return (
      <tr
        style={styles.root(
          productHasError && error && type === 'product',
          colors,
        )}
      >
        <td style={styles.imgBlock}>
          {type !== 'product' ? null : (
            <RemoveIcon
              style={styles.removeIcon(colors)}
              onClick={() => {
                onChange({ cartId, quantity: 0 });
                removeCartItems([{ cartId }]);
              }}
            />
          )}

          {!mainImage?.src ? (
            <div style={styles.img} />
          ) : (
            <div style={{ height: '100%' }}>
              <Thumb imgUrl={mainImage.src} />
            </div>
          )}
        </td>

        <td style={[styles.item, styles.title]}>
          {transformLocale(title)}

          {!specs ? null : (
            <div style={styles.spec}>
              {specs
                .map(({ title: specTitle }) => transformLocale(specTitle))
                .join('/')}
            </div>
          )}

          {!activityInfo ? null : (
            <div style={styles.activity(colors)}>
              {activityInfo.map(({ title: activityTitle }) => (
                <>
                  <TagIcon style={styles.tagIcon} />

                  {transformLocale(activityTitle)}
                </>
              ))}
            </div>
          )}
        </td>

        {type === 'product' ? (
          <Select
            {...props}
            stock={stock}
            productId={productId}
            cartId={cartId}
            error={error}
            onChange={onChange}
            productHasError={productHasError}
          />
        ) : (
          <td style={[styles.item, styles.gift(error, colors)]} colSpan="2">
            {transformLocale(
              LOCALE[
                stock <= 0 || error ? 'GIFT_EXCHANGE_IS_COMPLETED' : 'GIFT'
              ],
            )}
          </td>
        )}
      </tr>
    );
  }
}
