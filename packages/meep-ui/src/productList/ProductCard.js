import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';
import Image from 'image';
import DraftText from 'draftText';

import ProductLoader from './ProductLoader';
import { PRODUCT_TYPE } from './constants';
import * as styles from './styles';
import * as LOCALE from './locale';

const ProductCard = ({
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

  colors,
  isLogin,
  transformLocale,
  transformCurrency,
  memberSeePrice,
}) => (
  <StyleRoot>
    <div
      style={[
        styles.list,
        {
          textAlign: alignment,
          justifyContent,
          alignItems,
        },
      ]}
    >
      {products instanceof Promise || !products ? (
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
          const image =
            product.galleryInfo.mainId || product.galleryInfo.media[0];
          const variantInfo = product.variants[0] || {};
          const orderable =
            product.variants.reduce(
              (prev, variant) => prev + (variant.stock || 0),
              0,
            ) > 0;

          return (
            <div
              key={product.id}
              style={[
                {
                  width: productWidth,
                  margin: padding / 2,
                },
                styles.productCard(colors, isGrid),
              ]}
            >
              <div style={styles.productImage}>
                <Image
                  image={image}
                  href={`/product/${product.id}`}
                  contentWidth={100}
                  alignment="center"
                  newWindow={false}
                  ratio={1}
                />
              </div>

              {showTitle && (
                <div style={styles.productTitle}>
                  {transformLocale(product.title)}
                </div>
              )}

              {showDescription && transformLocale(product.description) && (
                <div style={styles.productDescription(colors)}>
                  <DraftText
                    value={transformLocale(product.description)}
                    plainText
                  />
                </div>
              )}
              {showPrice && (
                <div style={styles.productPrice}>
                  {variantInfo.listPrice &&
                  (!memberSeePrice || product.showUserPrice?.showListPrice) ? (
                    <div style={styles.otherPrice(colors)}>
                      <span>
                        {transformLocale(LOCALE.LIST_PRICE)}
                        <s style={styles.strike}>
                          {transformCurrency(variantInfo.listPrice)}
                        </s>
                      </span>
                    </div>
                  ) : null}
                  {variantInfo.suggestedPrice &&
                  (!memberSeePrice ||
                    product.showUserPrice?.showSuggestedPrice) ? (
                    <div style={styles.otherPrice(colors)}>
                      <span>
                        {transformLocale(LOCALE.SUGGESTED_PRICE)}
                        <s style={styles.strike}>
                          {transformCurrency(variantInfo.suggestedPrice)}
                        </s>
                      </span>
                    </div>
                  ) : null}
                  {variantInfo.totalPrice ? (
                    <div style={styles.thePrice}>
                      {memberSeePrice && isLogin !== ISUSER
                        ? transformLocale(LOCALE.MEMBER_SEE_PRICE)
                        : transformCurrency(variantInfo.totalPrice)}
                    </div>
                  ) : null}
                </div>
              )}
              {cartButton && !(memberSeePrice && isLogin !== ISUSER) && (
                <button
                  key={`${product.id}-button`}
                  type="button"
                  data-id={product.id}
                  disabled={!orderable}
                  style={styles.productAddToCart(colors)}
                  onClick={handleModalOpen}
                >
                  {transformLocale(
                    orderable ? LOCALE.ADD_TO_CART : LOCALE.SOLD_OUT,
                  )}
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
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  transformLocale: PropTypes.func.isRequired,
  transformCurrency: PropTypes.func.isRequired,
  memberSeePrice: PropTypes.bool.isRequired,
};
/* eslint-enable react/no-typos */

ProductCard.defaultProps = {
  products: null,
};

export default radium(ProductCard);
