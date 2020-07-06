import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';
import Image from 'image';
import DraftText from 'draftText';

import ProductLoader from './ProductLoader';
import { PRODUCT_TYPE } from './constants';
import * as styles from './styles';
import lessStyles from './styles/card.less';

const ProductCard = ({
  isDefaultProducts,
  products,
  limit,
  isGrid,
  handleModalOpen,

  alignment,
  justifyContent,
  alignItems,
  productWidth,
  padding,
  showTitle,
  showDescription,
  showPrice,
  cartButton,
  type,

  colors,
  isLogin,
  t,
  i18n,
  transformCurrency,
  memberSeePrice,
  isUsingCache,
}) => (
  <StyleRoot>
    <div
      style={[
        styles.list(padding),
        {
          textAlign: alignment,
          justifyContent,
          alignItems,
        },
      ]}
    >
      {!products || products.then ? (
        <ProductLoader
          limit={limit}
          productWidth={productWidth}
          isGrid={isGrid}
          alignment={alignment}
          padding={padding}
          showTitle={showTitle}
          showDescription={showDescription}
          showPrice={showPrice}
          cartButton={cartButton}
          colors={colors}
        />
      ) : (
        products.data.map(product => {
          const {
            id,
            title,
            description,
            coverImage,
            variants,
            showUserPrice,
          } = product;
          const variant = variants[0] || {};
          const orderable =
            variants.reduce((prev, { stock }) => prev + (stock || 0), 0) > 0;
          const productListImagePopUpEnabled = type === 'pop-up';

          return (
            <div
              key={id}
              style={[
                {
                  width: productWidth,
                  margin: padding / 2,
                },
                styles.productCard(colors, isGrid),
              ]}
            >
              {isDefaultProducts ? (
                <div className={lessStyles.default}>
                  <div>{t('product-building')}</div>
                  {React.createElement(coverImage)}
                </div>
              ) : (
                <div
                  style={styles.productImage}
                  {...(productListImagePopUpEnabled
                    ? { onClick: () => handleModalOpen(id) }
                    : {})}
                >
                  <Image
                    image={coverImage || { scaledSrc: placeholderThumbnail }}
                    href={productListImagePopUpEnabled ? '' : `/product/${id}`}
                    contentWidth={100}
                    alignment="center"
                    newWindow={false}
                    ratio={1}
                    isUsingCache={isUsingCache}
                    alt={title[i18n.language] || title.zh_TW}
                  />
                </div>
              )}

              {showTitle && (
                <div style={styles.productTitle}>
                  {title[i18n.language] || title.zh_TW}
                </div>
              )}

              {showDescription &&
                (description[i18n.language] || description.zh_TW) && (
                  <div style={styles.productDescription(colors)}>
                    <DraftText
                      value={description[i18n.language] || description.zh_TW}
                      plainText
                    />
                  </div>
                )}

              {showPrice && (
                <div style={styles.productPrice}>
                  {variant.listPrice &&
                  (!memberSeePrice ||
                    showUserPrice?.showListPrice ||
                    isLogin === ISUSER) ? (
                    <div style={styles.otherPrice(colors)}>
                      <span>
                        {t('list-price')}

                        <s style={styles.strike}>
                          {transformCurrency(variant.listPrice)}
                        </s>
                      </span>
                    </div>
                  ) : null}
                  {variant.suggestedPrice &&
                  (!memberSeePrice ||
                    showUserPrice?.showSuggestedPrice ||
                    isLogin === ISUSER) ? (
                    <div style={styles.otherPrice(colors)}>
                      <span>
                        {t('suggested-price')}

                        <s style={styles.strike}>
                          {transformCurrency(variant.suggestedPrice)}
                        </s>
                      </span>
                    </div>
                  ) : null}
                  {variant.totalPrice ? (
                    <div style={styles.thePrice}>
                      {memberSeePrice && isLogin !== ISUSER
                        ? t('member-see-price')
                        : transformCurrency(variant.totalPrice)}
                    </div>
                  ) : null}
                </div>
              )}
              {cartButton && !(memberSeePrice && isLogin !== ISUSER) && (
                <button
                  key={`${id}-button`}
                  type="button"
                  disabled={!orderable || isDefaultProducts}
                  style={styles.productAddToCart(colors)}
                  onClick={() => handleModalOpen(id)}
                >
                  {t(orderable ? 'add-to-cart' : 'sold-out')}
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  </StyleRoot>
);

/* eslint-disable react/no-typos */
ProductCard.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(PRODUCT_TYPE),
  }),
  limit: PropTypes.number.isRequired,
  isGrid: PropTypes.bool.isRequired,
  handleModalOpen: PropTypes.func.isRequired,
  alignment: PropTypes.string.isRequired,
  justifyContent: PropTypes.string.isRequired,
  alignItems: PropTypes.string.isRequired,
  productWidth: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showDescription: PropTypes.bool.isRequired,
  showPrice: PropTypes.bool.isRequired,
  cartButton: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['original', 'pop-up']).isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  t: PropTypes.func.isRequired,
  transformCurrency: PropTypes.func.isRequired,
  memberSeePrice: PropTypes.bool.isRequired,
  isUsingCache: PropTypes.bool.isRequired,
};
/* eslint-enable react/no-typos */

ProductCard.defaultProps = {
  products: null,
};

export default withTranslation('product-list')(radium(ProductCard));
