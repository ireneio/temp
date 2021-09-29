// import
import React from 'react';
import { Form, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/recipient.less';

// graphql typescript
import { recipientFragment as recipientFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  order: recipientFragmentType;
  checking: boolean;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ order, checking }: PropsType) => {
  const { t } = useTranslation('member-order-apply');

  return (
    <div className={checking ? styles.checking : styles.root}>
      {checking ? null : <h3>{t('replaceRecipient.title')}</h3>}

      {[
        {
          initialValue: order.shipmentInfo?.list?.[0]?.recipient?.name || '',
          name: ['replaceRecipient', 'name'],
        },
        {
          initialValue: order.shipmentInfo?.list?.[0]?.recipient?.mobile || '',
          name: ['replaceRecipient', 'mobile'],
        },
        {
          initialValue: order.address?.fullAddress || '',
          name: ['replaceRecipient', 'address', 'streetAddress'],
        },
      ].map(({ name, initialValue }) => {
        const key = name.join('.');

        return (
          <React.Fragment key={key}>
            <FormItem
              initialValue={initialValue}
              name={name}
              hidden={checking}
              noStyle
            >
              <Input placeholder={t(key)} />
            </FormItem>

            {!checking ? null : (
              <FormItem shouldUpdate noStyle>
                {({ getFieldValue }) => (
                  <p>
                    {t(key)}：{getFieldValue(name)}
                  </p>
                )}
              </FormItem>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
});
