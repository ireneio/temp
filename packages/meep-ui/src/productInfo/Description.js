import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import DraftText from 'draftText';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as styles from './styles/description';
import { PRODUCT_TYPE, VARIANT_TYPE } from './constants';

const Description = ({
  t,
  i18n,
  productData,
  variant,
  mode,
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
    {mode === 'detail' && variant.sku && (
      <div style={styles.sku}>{variant.sku}</div>
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
    {productData.applicableActivities?.length > 0 && (
      <div style={styles.activities}>
        {productData.applicableActivities.map(activity =>
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
          variant.listPrice &&
          (!memberSeePrice ||
            productData.showUserPrice?.showListPrice ||
            isLogin === ISUSER) ? (
            <span style={styles.otherPrice}>
              {t('list-price')}

              <s style={styles.strike}>
                {transformCurrency(variant.listPrice)}
              </s>
            </span>
          ) : null}
          {mode === 'detail' &&
          variant.suggestedPrice &&
          (!memberSeePrice ||
            productData.showUserPrice?.showSuggestedPrice ||
            isLogin === ISUSER) ? (
            <span style={styles.otherPrice}>
              {t('suggested-price')}

              <s style={styles.strike}>
                {transformCurrency(variant.suggestedPrice)}
              </s>
            </span>
          ) : null}
        </div>
        {variant.totalPrice ? (
          <div style={styles.thePrice}>
            {memberSeePrice && isLogin !== ISUSER
              ? t('member-see-price')
              : transformCurrency(variant.totalPrice)}
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
  variant: VARIANT_TYPE.isRequired,
  mode: PropTypes.oneOf(['list', 'detail']).isRequired,
  transformCurrency: PropTypes.func.isRequired,
  isLogin: ISLOGIN_TYPE.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  memberSeePrice: PropTypes.bool.isRequired,
};
/* eslint-enable react/no-typos */

export default withTranslation('product-info')(radium(Description));
