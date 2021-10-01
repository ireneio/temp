// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/goodDeal.less';

// graphql typescript
import { goodDealFragment as goodDealFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  storeGoodDealSettings: goodDealFragmentType;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(
  ({ storeGoodDealSettings: { corporationId, apiKey } }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <>
        <div className={styles.horizontal}>
          {['corporationId', 'apiKey'].map(
            (key: 'corporationId' | 'apiKey') => (
              <div key={key}>
                <div className={styles.title}>{t(`goodDeal.${key}.title`)}</div>

                <FormItem
                  name={['goodDeal', key]}
                  initialValue={
                    {
                      corporationId,
                      apiKey,
                    }[key]
                  }
                  rules={[{ required: true, message: t('required') }]}
                  validateTrigger="onBlur"
                  preserve
                >
                  <Input placeholder={t(`goodDeal.${key}.placeholder`)} />
                </FormItem>
              </div>
            ),
          )}
        </div>

        <div className={styles.caution}>
          {t('goodDeal.alert.0')}

          <span>service@meepshop.com</span>

          {t('goodDeal.alert.1')}
        </div>
      </>
    );
  },
);