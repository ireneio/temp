// import
import React from 'react';
import { Modal, Form, Select, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useGetExportFormatList from './hooks/useGetExportFormatList';
import useFieldsChange from './hooks/useFieldsChange';
import useExportOrder from './hooks/useExportOrder';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  ids: string[];
  onClose: () => void;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ ids, onClose }: PropsType) => {
  const { t } = useTranslation('order-export');
  const [form] = Form.useForm();
  const exportFormatList = useGetExportFormatList();
  const fieldsChange = useFieldsChange(form);
  const exportOrder = useExportOrder(ids);

  return (
    <Form form={form} onFieldsChange={fieldsChange} onFinish={exportOrder}>
      <Modal
        className={styles.root}
        visible
        closable={false}
        onCancel={onClose}
        footer={
          <>
            <Button key="cancel" onClick={onClose}>
              {t('cancel')}
            </Button>
            <FormItem dependencies={['exportFormatId', 'fileType']} noStyle>
              {({ submit, getFieldValue }) => (
                <Button
                  onClick={submit}
                  disabled={
                    !getFieldValue(['exportFormatId']) ||
                    !getFieldValue(['fileType'])
                  }
                  type="primary"
                >
                  {t('ok')}
                </Button>
              )}
            </FormItem>
          </>
        }
      >
        <h3> {t('title')}</h3>
        <p className={styles.orders}>
          {t('selected-orders', { selectedOrders: ids.length })}
        </p>

        <div className={styles.item}>
          <p className={styles.title}>{t('export-format.title')}</p>
          <FormItem noStyle name={['exportFormatId']}>
            <Select
              placeholder={t('export-format.placeholder')}
              options={exportFormatList.map(value => ({
                label: value.name,
                value: value.id,
              }))}
            />
          </FormItem>

          <FormItem noStyle dependencies={['exportFormatId']}>
            {({ getFieldValue }) =>
              getFieldValue(['exportFormatId']) !== 'ECPAY_ORDER' ? null : (
                <p className={styles.description}>
                  {t('export-format.ecpay-order-export-description')}
                </p>
              )
            }
          </FormItem>

          <FormItem noStyle dependencies={['exportFormatId']}>
            {({ getFieldValue }) =>
              getFieldValue(['exportFormatId']) !== 'TCAT_ORDER' ? null : (
                <p className={styles.description}>
                  {t('export-format.tcat-order-export-description')}
                </p>
              )
            }
          </FormItem>
        </div>

        <div className={styles.item}>
          <p className={styles.title}>{t('fileType.title')}</p>
          <FormItem noStyle dependencies={['exportFormatId']}>
            {({ getFieldValue }) => (
              <FormItem noStyle name={['fileType']}>
                <Select
                  placeholder={t('fileType.placeholder')}
                  disabled={getFieldValue(['exportFormatId']) === 'TCAT_ORDER'}
                  options={[
                    { value: 'csv', text: 'CSV' },
                    { value: 'xlsx', text: 'Excel (XLSX)' },
                  ].map(value => ({
                    label: value.text,
                    value: value.value,
                  }))}
                />
              </FormItem>
            )}
          </FormItem>

          <FormItem noStyle dependencies={['exportFormatId']}>
            {({ getFieldValue }) =>
              getFieldValue(['exportFormatId']) !== 'TCAT_ORDER' ? null : (
                <p className={styles.description}>
                  {t('fileType.tcat-order-csv')}
                </p>
              )
            }
          </FormItem>
        </div>

        <p className={styles.title}>{t('fileName.title')}</p>
        <FormItem className={styles.item} name={['fileName']}>
          <Input placeholder={t('fileName.placeholder')} />
        </FormItem>
      </Modal>
    </Form>
  );
});
