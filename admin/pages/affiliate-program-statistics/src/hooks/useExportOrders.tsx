// import
import React, { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal, Form, Input, Select } from 'antd';

import { useTranslation } from '@meepshop/locales';

import styles from '../styles/useExportOrders.less';

// graphql typescript
import {
  exportOrders as exportOrdersType,
  exportOrdersVariables as exportOrdersVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { exportOrders } from '../gqls/useExportOrders';

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

export default (affiliateProgramId: string): (() => void) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('affiliate-program-statistics');
  const [mutation] = useMutation<exportOrdersType, exportOrdersVariablesType>(
    exportOrders,
  );

  return useCallback(() => {
    Modal.confirm({
      title: t('export.title'),
      icon: null,
      width: 544,
      className: styles.root,
      okText: t('export.ok'),
      cancelText: t('export.cancel'),
      onOk: () =>
        mutation({
          variables: {
            input: {
              ...form.getFieldsValue(),
              filter: 'AFFILIATE_ORDER',
              affiliateProgramId,
            },
          },
        }),
      content: (
        <>
          <div className={styles.subTitle}>{t('export.subTitle')}</div>

          <Form form={form}>
            <div>{t('export.fileType.title')}</div>

            <FormItem name={['fileType']}>
              <Select placeholder={t('export.fileType.placeholder')}>
                {[
                  {
                    key: 'csv',
                    name: 'CSV',
                  },
                  {
                    key: 'xlsx',
                    name: 'Excel (XLSX)',
                  },
                ].map(({ key, name }) => (
                  <Option key={key} value={key}>
                    {name}
                  </Option>
                ))}
              </Select>
            </FormItem>

            <div>{t('export.email.title')}</div>

            <FormItem name={['email']}>
              <Input placeholder={t('export.email.placeholder')} />
            </FormItem>
          </Form>
        </>
      ),
    });
  }, [affiliateProgramId, form, t, mutation]);
};
