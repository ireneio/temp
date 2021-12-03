// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Button, Spin } from 'antd';
import { areEqual, isEmpty } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';
import Block from '@admin/block';

import useInitialValues from './hooks/useInitialValues';
import useBlock from './hooks/useBlock';
import useUpdateStore from './hooks/useUpdateStore';
import styles from './styles/index.less';

// graphql typescript
import { getStoreSetting as getStoreSettingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getStoreSetting } from './gqls';
import { useInitialValuesFragment } from './gqls/useInitialValues';
import { useBlockFragment } from './gqls/useBlock';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const SettingStorePage: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('setting-store');
  const [form] = Form.useForm();
  const { data } = useQuery<getStoreSettingType>(getStoreSetting);
  const initialValues = useInitialValues(
    form,
    filter(useInitialValuesFragment, data?.viewer?.store || null),
  );
  const { loading, updateStore } = useUpdateStore(
    data?.viewer?.store?.id || null,
    initialValues,
  );
  const blocks = useBlock(
    filter(useBlockFragment, data?.viewer?.store || null),
  );

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Form
      className={styles.root}
      form={form}
      initialValues={initialValues}
      onFinish={updateStore}
      validateTrigger="onBlur"
    >
      <Header
        title={t('title')}
        prevTitle={t('common:setting')}
        backTo="/setting"
        buttons={
          <FormItem shouldUpdate noStyle>
            {({ resetFields, submit, getFieldsValue }) =>
              isEmpty(getFieldsValue()) ||
              areEqual(initialValues, getFieldsValue()) ? null : (
                <div>
                  <Button onClick={() => resetFields()}>{t('cancel')}</Button>

                  <Button onClick={submit} loading={loading} type="primary">
                    {t('save')}
                  </Button>
                </div>
              )
            }
          </FormItem>
        }
      >
        <div className={styles.form}>
          {blocks.map(({ key, component }) => (
            <Block
              key={key}
              className={styles.block}
              title={t(`block-title.${key}`)}
              description={t(`block-title.${key}-description`)}
            >
              {component}
            </Block>
          ))}
        </div>
      </Header>
    </Form>
  );
});

SettingStorePage.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingStorePage;
