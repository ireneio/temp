// typescript import
import { PlanType } from './hooks/usePlans';
import { SelectedPlanType } from './hooks/usePayment';

// import
import React, { useState } from 'react';
import { Popover, Icon, Button } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { planBlueBackground, planGoldBackground } from '@meepshop/images';

import styles from './styles/planDetail.less';

// graphql typescript
import { StoreBillPlanItemFeeTypeEnum } from '../../../__generated__/admin';

// typescript definition
interface PropsType {
  data: PlanType | null;
  setPlan: (input: SelectedPlanType) => void;
}

type ItemType = 'avlProductNum' | 'space' | 'freeDataGB' | 'orderFeeRate';

// definition
export default React.memo(({ data, setPlan }: PropsType) => {
  const { t, i18n } = useTranslation('plan-setting');
  const [feeType, setFeeType] = useState<StoreBillPlanItemFeeTypeEnum>(
    'MONTHLY' as StoreBillPlanItemFeeTypeEnum,
  );

  return (
    <div
      className={styles.root}
      style={{
        background: `url("${
          data?.id === 'gold' ? planGoldBackground : planBlueBackground
        }") #ffffff no-repeat`,
      }}
    >
      {data?.id !== 'gold' ? null : (
        <div className={styles.popular}>{t('plan.most-popular-choice')}</div>
      )}

      <div className={styles.name}>
        {data?.name[i18n.language === 'zh_TW' ? 'zh_TW' : 'en_US']}
      </div>

      <div className={styles.fee}>
        USD
        <span>
          {data?.[`${feeType.toLowerCase()}Fee` as 'monthlyFee' | 'yearlyFee']}
        </span>
        /{t(`plan.${feeType.toLowerCase()}`)}
      </div>

      {data?.id === 'bronze' ? (
        <>
          <Popover
            overlayClassName={styles.popover}
            content={
              <>
                <Icon type="star" theme="filled" />
                <div>{t('plan.yearly-payment-tips')}</div>
              </>
            }
          >
            <div
              className={`${styles.switch} ${
                feeType === 'YEARLY' ? styles.yearly : ''
              }`}
            >
              {['MONTHLY', 'YEARLY'].map(
                (type: StoreBillPlanItemFeeTypeEnum) => (
                  <div
                    key={type}
                    className={`${feeType === type ? styles.selected : ''}`}
                    onClick={() => setFeeType(type)}
                  >
                    {t(`plan.${type.toLowerCase()}-payment`)}
                  </div>
                ),
              )}
            </div>
          </Popover>

          {feeType !== 'YEARLY' ? null : (
            <div className={styles.save}>
              {`${t('plan.save')} USD＄`}
              {(data?.monthlyFee * 12 - data?.yearlyFee).toFixed(1)}
            </div>
          )}
        </>
      ) : (
        <div className={styles.yearlyOnly}>{t('plan.yearly-payment-only')}</div>
      )}

      {['avlProductNum', 'space', 'freeDataGB', 'orderFeeRate'].map(item => (
        <div
          key={item}
          className={`${styles.item} ${
            item === 'orderFeeRate' && data?.[item] === '0%' ? styles.free : ''
          }`}
        >
          {data?.[item as ItemType]}
          <span>{t(`plan.${item}`)}</span>
        </div>
      ))}

      {data?.id === 'bronze' ? (
        <Button
          className={styles.upgradePlan}
          onClick={() => setPlan({ ...data, feeType })}
          size="large"
        >
          {t('plan.upgrade-plan')}
        </Button>
      ) : (
        <a
          href="https://meepshop.com/consultant-reservation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Popover
            overlayClassName={styles.popover}
            content={
              <>
                <Icon type="star" theme="filled" />
                <div>{t('plan.appointment-tips')}</div>
              </>
            }
          >
            <Button
              className={`${styles.appointment} ${
                data?.id === 'gold' ? styles.gold : ''
              }`}
              size="large"
            >
              {t('plan.appointment')}
            </Button>
          </Popover>
        </a>
      )}
    </div>
  );
});
