// typescript import
import { I18nPropsType } from '@meepshop/locales';
import { CurrencyType } from '@meepshop/context';

// import
import React from 'react';
import gql from 'graphql-tag';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/totalSheet.less';

// graphql typescript
import {
  totalSheetFragment as totalSheetFragmentType,
  totalSheetFragment_activityInfo as totalSheetFragmentActivityInfo,
} from '@meepshop/types/gqls/store';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  order: totalSheetFragmentType;
}

// definition
export const totalSheetFragment = gql`
  fragment totalSheetFragment on Order {
    id

    priceInfo {
      productPrice
      shipmentFee
      paymentFee
      adjust
      total
    }

    activityInfo {
      activityId: id
      plugin
      discountPrice
      title {
        ...localeFragment
      }
    }
  }
  ${localeFragment}
`;

class TotalSheet extends React.PureComponent<PropsType> {
  private generateActivityInfo = memoizeOne((t: I18nPropsType['t']) => {
    const {
      order: { activityInfo },
    } = this.props;

    if (!activityInfo) return [];

    const filterActivityInfo = activityInfo.filter(
      Boolean,
    ) as totalSheetFragmentActivityInfo[];

    return filterActivityInfo.reduce(
      (result, { activityId, plugin, discountPrice, title }) => {
        const {
          i18n: { language },
        } = this.props;

        // filter
        if (!discountPrice || plugin === 'freeShipping') return result;

        const activity = result.find(
          ({ activityId: targetId }) => targetId === activityId,
        ) as { discountPrice: number } | undefined;

        // first add
        if (!activity) {
          switch (plugin) {
            case 'usePoints':
              return [
                ...result,
                {
                  activityId,
                  discountPrice,
                  title: t('sheet.reward'),
                },
              ];

            case 'productCoupon':
            case 'orderCoupon':
              return [
                ...result,
                {
                  activityId,
                  discountPrice,
                  title: t('sheet.coupon'),
                },
              ];

            default:
              return [
                ...result,
                {
                  activityId,
                  discountPrice,
                  title: title?.[language] || title?.zh_TW,
                },
              ];
          }
        }
        // count discountPrice
        activity.discountPrice += discountPrice;
        return result;
      },
      [],
    );
  });

  private checkShipmentFee(shipmentFee: number): string {
    const {
      t,
      c,

      order: { activityInfo },
    } = this.props;

    if (!activityInfo) return c(shipmentFee);

    return activityInfo.find(activity => activity?.plugin === 'freeShipping')
      ? t('sheet.free-shipment')
      : c(shipmentFee);
  }

  public render(): React.ReactNode {
    const {
      /** HOC */
      t,
      c,

      /** props */
      order: { priceInfo },
    } = this.props;
    const productPrice = priceInfo?.productPrice || 0;
    const shipmentFee = priceInfo?.shipmentFee || 0;
    const paymentFee = priceInfo?.paymentFee || 0;
    const adjust = priceInfo?.adjust || 0;
    const total = priceInfo?.total || 0;

    return (
      <div className={styles.root}>
        <div>
          <div>{t('sheet.product')}</div>

          <div>{c(productPrice)}</div>
        </div>

        {this.generateActivityInfo(t).map(
          ({ activityId, title, discountPrice }) => (
            // SHOULD_NOT_BE_NULL
            <div key={activityId || 'null id'}>
              <div>{title}</div>
              <div>{c(-1 * discountPrice)}</div>
            </div>
          ),
        )}

        <div>
          <div>{t('sheet.shipment')}</div>

          <div>{this.checkShipmentFee(shipmentFee)}</div>
        </div>

        {!paymentFee ? null : (
          <div>
            <div>{t('sheet.payment')}</div>

            <div>
              {`${paymentFee < 0 ? '-' : ''} ${c(Math.abs(paymentFee))}`}
            </div>
          </div>
        )}

        {!adjust ? null : (
          <div>
            <div>{t('sheet.adjustment')}</div>

            <div>{`${adjust < 0 ? '-' : '+'} ${c(Math.abs(adjust))}`}</div>
          </div>
        )}

        <div className={styles.total}>
          <div>{t('sheet.total')}</div>

          <div>{c(total)}</div>
        </div>
      </div>
    );
  }
}

export default withTranslation('member-order')(
  withContext(CurrencyContext)(TotalSheet),
);
