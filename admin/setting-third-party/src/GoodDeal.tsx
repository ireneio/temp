// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/goodDeal.less';

// graphql typescript
import { goodDealFragment as goodDealFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType extends FormComponentProps {
  storeGoodDealSettings: goodDealFragmentType;
}

// definition
const { Item: FormItem } = Form;

export const goodDealFragment = gql`
  fragment goodDealFragment on gooddealObjectType {
    corporationId
    apiKey
  }
`;

export default React.memo(
  ({
    form: { getFieldDecorator },
    storeGoodDealSettings: { corporationId, apiKey },
  }: PropsType) => {
    const { t } = useTranslation('setting-third-party');

    return (
      <>
        <div className={styles.horizontal}>
          {['corporationId', 'apiKey'].map(
            (key: 'corporationId' | 'apiKey') => (
              <div key={key}>
                <div className={styles.title}>{t(`goodDeal.${key}.title`)}</div>

                <FormItem>
                  {getFieldDecorator(`goodDeal.${key}`, {
                    initialValue: {
                      corporationId,
                      apiKey,
                    }[key],
                    rules: [{ required: true, message: t('required') }],
                    validateTrigger: 'onBlur',
                    preserve: true,
                  })(<Input placeholder={t(`goodDeal.${key}.placeholder`)} />)}
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
