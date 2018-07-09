import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import DraftText from 'draftText';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as styles from './styles/description';
import { PRODUCT_TYPE, VARIANT_TYPE, ACTIVITY_TYPE } from './constants';
import { LIST_PRICE, SUGGESTED_PRICE, MEMBER_SEE_PRICE } from './locale';

const Description = ({
  productData,
  variantInfo,
  mode,
  activityData,
  colors,
  transformLocale,
  transformCurrency,
  isLogin,
  hasStoreAppPlugin,
}) => (
  <div style={styles.root(colors)}>
    {transformLocale(productData.title) && (
      <h1 style={styles.title}>{transformLocale(productData.title)}</h1>
    )}
    {mode === 'detail' &&
      variantInfo.sku && <div style={styles.sku}>{variantInfo.sku}</div>}
    {mode === 'detail' && (
      <DraftText
        value={transformLocale(productData.description)}
        style={styles.description}
      />
    )}
    {activityData && (
      <div style={styles.activities}>
        {activityData.map(
          activity =>
            transformLocale(activity.title) && (
              <div
                key={transformLocale(activity.title)}
                style={styles.activityTag(colors)}
              >
                {transformLocale(activity.title)}
              </div>
            ),
        )}
      </div>
    )}
    {
      <div style={styles.price}>
        <div>
          {mode === 'detail' && variantInfo.listPrice ? (
            <span style={styles.otherPrice}>
              {transformLocale(LIST_PRICE)}
              <s style={styles.strike}>
                {transformCurrency(variantInfo.listPrice)}
              </s>
            </span>
          ) : null}
          {mode === 'detail' && variantInfo.suggestedPrice ? (
            <span style={styles.otherPrice}>
              {transformLocale(SUGGESTED_PRICE)}
              <s style={styles.strike}>
                {transformCurrency(variantInfo.suggestedPrice)}
              </s>
            </span>
          ) : null}
        </div>
        {variantInfo.totalPrice ? (
          <div style={styles.thePrice}>
            {hasStoreAppPlugin('memberSeePrice') && isLogin !== ISUSER
              ? transformLocale(MEMBER_SEE_PRICE)
              : transformCurrency(variantInfo.totalPrice)}
          </div>
        ) : null}
      </div>
    }
  </div>
);

/* eslint-disable react/no-typos */
Description.propTypes = {
  productData: PRODUCT_TYPE.isRequired,
  activityData: ACTIVITY_TYPE,
  variantInfo: VARIANT_TYPE.isRequired,
  mode: PropTypes.oneOf(['list', 'detail']).isRequired,
  transformLocale: PropTypes.func.isRequired,
  transformCurrency: PropTypes.func.isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  hasStoreAppPlugin: PropTypes.func.isRequired,
};
/* eslint-enable react/no-typos */

Description.defaultProps = {
  activityData: null,
};

export default radium(Description);
