import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import withHook from '@store/utils/lib/withHook';
import { withTranslation, useGetLanguage } from '@meepshop/locales';
import DraftText from '@meepshop/draft-text';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as styles from './styles/description';
import lessStyles from './styles/description.less';
import { PRODUCT_TYPE, VARIANT_TYPE } from './constants';

const Description = ({
  t,
  getLanguage,
  productData,
  variant,
  mode,
  colors,
  transformCurrency,
  isLogin,
  memberSeePrice,
}) =>
  !variant ? null : (
    <div style={styles.root(colors)}>
      {!productData.title ? null : (
        <h1 style={styles.title}>{getLanguage(productData.title)}</h1>
      )}
      {mode === 'detail' && variant.sku && (
        <div style={styles.sku}>{variant.sku}</div>
      )}
      {mode === 'detail' && (
        <DraftText
          className={lessStyles.description}
          content={getLanguage(productData.description)}
        />
      )}
      {productData.applicableActivities?.length > 0 && (
        <div style={styles.activities}>
          {productData.applicableActivities.map(activity =>
            !activity.title ? null : (
              <div
                key={getLanguage(activity.title)}
                style={styles.activityTag(colors)}
              >
                {getLanguage(activity.title)}
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

export default withTranslation('product-info')(
  withHook(() => ({ getLanguage: useGetLanguage() }))(radium(Description)),
);
