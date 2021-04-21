// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Form, Button, Spin, Icon } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';
import Block from '@admin/block';

import useBlock from './hooks/useBlock';
import useUpdateStore from './hooks/useUpdateStore';
import styles from './styles/index.less';

// graphql typescript
import { getStoreSetting as getStoreSettingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getStoreSetting } from './gqls';
import { useBlockFragment } from './gqls/useBlock';

// typescript definition
interface PropsType {
  form?: FormComponentProps['form'];
  namespacesRequired: string[];
}

// definition
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SettingStorePage: NextPage<PropsType> = Form.create<PropsType>()(
  React.memo(({ form }: FormComponentProps) => {
    const { t } = useTranslation('setting-store');
    const { resetFields, isFieldsTouched } = form;
    const { data } = useQuery<getStoreSettingType>(getStoreSetting);

    const storeId = data?.viewer?.store?.id || null;
    const { loading, updateStore } = useUpdateStore(form, storeId);
    const blocks = useBlock(
      form,
      filter(useBlockFragment, data?.viewer?.store || null),
    );

    if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <Header
        title={t('title')}
        prevTitle={t('common:setting')}
        backTo="/setting"
        buttons={
          !isFieldsTouched() ? null : (
            <div>
              <Button onClick={() => resetFields()}>{t('cancel')}</Button>

              <Button onClick={updateStore} loading={loading} type="primary">
                {t('save')}
              </Button>
            </div>
          )
        }
      >
        <Form className={styles.root}>
          {blocks.map(({ key, component }) => (
            <Block
              key={key}
              title={t(`block-title.${key}`)}
              description={t(`block-title.${key}-description`)}
            >
              {component}
            </Block>
          ))}
        </Form>
      </Header>
    );
  }),
);

SettingStorePage.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingStorePage;
