import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@store/utils/lib/i18n';

import DraftText from 'draftText';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as styles from './styles/description';
import { PRODUCT_TYPE, VARIANT_TYPE, ACTIVITY_TYPE } from './constants';

const Description = ({
  t,
  i18n,
  productData,
  variantInfo,
  mode,
  activityData,
  colors,
  transformCurrency,
  isLogin,
  memberSeePrice,
}) => (
  <div style={styles.root(colors)}>
    {!productData.title ? null : (
      <h1 style={styles.title}>
        {productData.title[i18n.language] || productData.title.zh_TW}
      </h1>
    )}
    {mode === 'detail' && variantInfo.sku && (
      <div style={styles.sku}>{variantInfo.sku}</div>
    )}
    {mode === 'detail' && (
      <DraftText
        value={
          productData.description[i18n.language] ||
          productData.description.zh_TW
        }
        style={styles.description}
      />
    )}
    {activityData && (
      <div style={styles.activities}>
        {activityData.map(activity =>
          !activity.title ? null : (
            <div
              key={activity.title[i18n.language] || activity.title.zh_TW}
              style={styles.activityTag(colors)}
            >
              {activity.title[i18n.language] || activity.title.zh_TW}
            </div>
          ),
        )}
      </div>
    )}
    {
      <div style={styles.price}>
        <div>
          {mode === 'detail' &&
          variantInfo.listPrice &&
          (!memberSeePrice ||
            productData.showUserPrice?.showListPrice ||
            isLogin === ISUSER) ? (
            <span style={styles.otherPrice}>
              {t('list-price')}

              <s style={styles.strike}>
                {transformCurrency(variantInfo.listPrice)}
              </s>
            </span>
          ) : null}
          {mode === 'detail' &&
          variantInfo.suggestedPrice &&
          (!memberSeePrice ||
            productData.showUserPrice?.showSuggestedPrice ||
            isLogin === ISUSER) ? (
            <span style={styles.otherPrice}>
              {t('suggested-price')}

              <s style={styles.strike}>
                {transformCurrency(variantInfo.suggestedPrice)}
              </s>
            </span>
          ) : null}
        </div>
        {variantInfo.totalPrice ? (
          <div style={styles.thePrice}>
            {memberSeePrice && isLogin !== ISUSER
              ? t('member-see-price')
              : transformCurrency(variantInfo.totalPrice)}
          </div>
        ) : null}
      </div>
    }
  </div>
);

/* eslint-disable react/no-typos */
Description.propTypes = {
  t: PropTypes.func.isRequired,
  productData: PRODUCT_TYPE.isRequired,
  activityData: ACTIVITY_TYPE,
  variantInfo: VARIANT_TYPE.isRequired,
  mode: PropTypes.oneOf(['list', 'detail']).isRequired,
  transformCurrency: PropTypes.func.isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  memberSeePrice: PropTypes.bool.isRequired,
};
/* eslint-enable react/no-typos */

Description.defaultProps = {
  activityData: null,
};

export default withTranslation('product-info')(radium(Description));
