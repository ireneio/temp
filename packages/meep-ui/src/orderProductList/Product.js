import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { notification } from 'antd';
import radium from 'radium';
import { MdClose as RemoveIcon } from 'react-icons/md';
import { FaTag as TagIcon } from 'react-icons/fa';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import Thumbnail from '@meepshop/thumbnail';

import cartFragment from 'layout/cart/fragment';
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
            <Mutation
              mutation={gql`
                mutation removeProductFromCartMutation($search: [ChangeCart]) {
                  changeCartList(changeCartList: $search) {
                    ...cartFragment
                  }
                }

                ${cartFragment}
              `}
            >
              {removeProductFromCartMutation => (
                <RemoveIcon
                  style={styles.removeIcon(colors)}
                  onClick={async () => {
                    updateCart(true);
                    await removeProductFromCartMutation({
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
            </Mutation>
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
                  <TagIcon style={styles.tagIcon} />

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
