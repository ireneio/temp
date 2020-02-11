// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { CurrencyType } from '@store/currency';

// import
import React from 'react';
import gql from 'graphql-tag';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@store/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import currencyContext from '@store/currency';

import styles from './styles/totalSheet.less';

// graphql typescript
import {
  totalSheetFragment as totalSheetFragmentType,
  totalSheetFragment_activityInfo as totalSheetFragmentActivityInfo,
} from './__generated__/totalSheetFragment';

// graphql import
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  order: totalSheetFragmentType;
}

// definition
// TODO: add to cart and checkout
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
      id
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
      _ => _,
    ) as totalSheetFragmentActivityInfo[];

    return filterActivityInfo.reduce(
      (result, { id, plugin, discountPrice, title }) => {
        const {
          i18n: { language },
        } = this.props;

        // filter
        if (!discountPrice || plugin === 'freeShipping') return result;

        const activity = result.find(
          ({ id: activityId }) => activityId === id,
        ) as { discountPrice: number } | undefined;

        // first add
        if (!activity) {
          switch (plugin) {
            case 'usePoints':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: t('sheet.reward'),
                },
              ];

            case 'productCoupon':
            case 'orderCoupon':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: t('sheet.coupon'),
                },
              ];

            default:
              return [
                ...result,
                {
                  id,
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

        {this.generateActivityInfo(t).map(({ id, title, discountPrice }) => (
          // TODO: should not be null
          <div key={id || 'null id'}>
            <div>{title}</div>
            <div>{c(-1 * discountPrice)}</div>
          </div>
        ))}

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
  withContext(currencyContext)(TotalSheet),
);
