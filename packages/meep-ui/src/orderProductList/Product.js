import React from 'react';
import PropTypes from 'prop-types';
import { notification, Icon } from 'antd';
import radium from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import CartContext from '@meepshop/cart';
import Thumbnail from '@meepshop/thumbnail';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  LOCALE_TYPE,
  PURCHASE_ITEMS_TYPE,
} from 'constants/propTypes';

import Select from './Select';
import * as styles from './styles/product';

@withTranslation('order-product-list')
@withContext(CartContext)
@enhancer
@radium
export default class Product extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    error: PropTypes.string,
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
      /** context */
      colors,
      updateCart,

      /** props */
      t,
      i18n,
      type,
      error,
      coverImage,
      activityInfo,
      specs,
      cartId,
      productId,
      stock,
      title,
      onChange,
      productHasError,
      removeProductFromCart,
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
            <Icon
              type="close"
              style={styles.removeIcon(colors)}
              onClick={async () => {
                updateCart(true);
                await removeProductFromCart({
                  variables: {
                    search: {
                      productsInfo: {
                        deleteData: cartId,
                      },
                    },
                  },
                });

                updateCart(false);
                onChange({ cartId, quantity: 0 });
                notification.success({
                  message: t('remove-product-from-cart'),
                });
              }}
            />
          )}

          {<Thumbnail image={coverImage} />}
        </td>

        <td style={[styles.item, styles.title]}>
          {title[i18n.language] || title.zh_TW}

          {!specs ? null : (
            <div style={styles.spec}>
              {specs
                .map(
                  ({ title: specTitle }) =>
                    specTitle[i18n.language] || specTitle.zh_TW,
                )
                .join('/')}
            </div>
          )}

          {!activityInfo ? null : (
            <div style={styles.activity(colors)}>
              {activityInfo.map(({ title: activityTitle }) => (
                <>
                  <Icon type="tag" theme="filled" style={styles.tagIcon} />

                  {activityTitle[i18n.language] || activityTitle.zh_TW}
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
            {stock <= 0 || error ? t('gift-exchange-is-completed') : t('gift')}
          </td>
        )}
      </tr>
    );
  }
}
