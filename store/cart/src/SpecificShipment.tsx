// import
import React, { useContext, useEffect } from 'react';
import transformColor from 'color';
import { Form } from 'antd';

import { useTranslation, useGetLanguage } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import { AlertOutlineIcon } from '@meepshop/icons';
import Select from '@meepshop/select';
import filter from '@meepshop/utils/lib/filter';
import Alert from '@store/alert';

import useSpecificShipmentOption from './hooks/useSpecificShipmentOption';
import useValidatorShipmentOptions from './hooks/useValidatorShipmentOptions';
import styles from './styles/specificShipment.less';

// graphql typescript
import { useSpecificShipmentOptionFragment as useSpecificShipmentOptionFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { useSpecificShipmentOptionFragment } from './gqls/useSpecificShipmentOption';

// typescript definition
interface PropsType {
  storeShipment: useSpecificShipmentOptionFragmentType[];
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ storeShipment }: PropsType) => {
  const { t } = useTranslation('cart');
  const colors = useContext(ColorsContext);
  const getLanguage = useGetLanguage();
  const [form] = Form.useForm();
  const { validateFields } = form;
  const options = useSpecificShipmentOption(
    filter(useSpecificShipmentOptionFragment, storeShipment),
  );
  const validatorShipmentOptions = useValidatorShipmentOptions(options);

  useEffect(() => {
    if (!options.length) validateFields(['shipment']);
  }, [options, validateFields, validatorShipmentOptions]);

  return (
    <div className={styles.root}>
      <p className={styles.blockTitle}>{t('specific-shipment.title')}</p>

      <FormItem
        name={['shipment']}
        rules={[
          {
            validator: validatorShipmentOptions,
          },
        ]}
      >
        <Select disabled={options.length === 0} options={options} />
      </FormItem>

      <FormItem noStyle dependencies={['shipment']}>
        {({ getFieldValue }) => {
          const descriptiont = getLanguage(
            storeShipment.find(({ id }) => id === getFieldValue(['shipment']))
              ?.description,
          );
          return !descriptiont ? null : (
            <p
              style={{
                color: colors[3],
                backgroundColor: transformColor(colors[3])
                  .alpha(0.08)
                  .toString(),
              }}
              className={styles.tip}
            >
              {descriptiont}
            </p>
          );
        }}
      </FormItem>

      {/* FIXME: 僅先做畫面待實作指定物流後修改細節 */}
      <Alert
        type="error"
        className={styles.alert}
        message={
          <div className={styles.errorShipment}>
            <div>
              <AlertOutlineIcon className={styles.icon} />
              {t('specific-shipment.error-shipment-1')}
              <span className={styles.number}>2</span>
              {t('specific-shipment.error-shipment-2')}
            </div>
            <div>{t('specific-shipment.check')}</div>
          </div>
        }
      />
    </div>
  );
});
