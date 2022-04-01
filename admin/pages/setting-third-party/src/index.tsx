// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Form, Spin, Button, Switch } from 'antd';

import { useTranslation } from '@meepshop/locales';
import filter from '@meepshop/utils/lib/filter';
import Header from '@admin/header';
import Block from '@admin/block';

// Use to copy mixin.less
import './styles/mixin.less';

import useBlocks from './hooks/useBlocks';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import { getThirdPartySetting as getThirdPartySettingType } from '@meepshop/types/gqls/admin';

// graphql import
import { getThirdPartySetting } from './gqls';
import { useBlocksFragment } from './gqls/useBlocks';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Item: FormItem } = Form;
const SettingThirdParty: NextPage<PropsType> = React.memo(() => {
  const { data } = useQuery<getThirdPartySettingType>(getThirdPartySetting);
  const { t } = useTranslation('setting-third-party');
  const [form] = Form.useForm();
  const { loading, save } = useSave(form, data?.viewer?.store?.id || null);
  const blocks = useBlocks(
    filter(useBlocksFragment, data?.viewer?.store || null),
  );

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <Form className={styles.root} form={form} onFinish={save}>
      <Header
        title={t('title')}
        prevTitle={t('common:setting')}
        backTo="/setting"
        buttons={
          <FormItem shouldUpdate noStyle>
            {({ isFieldsTouched, resetFields, submit }) =>
              !isFieldsTouched() ? null : (
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
          {blocks.map(
            ({
              key,
              src,
              useToggle,
              initialValue,
              useToggleDescription,
              component,
            }) => (
              <Block
                key={key}
                className={styles.block}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
              >
                <img src={src} alt={key} />

                {useToggle ? (
                  <div className={styles.item}>
                    <FormItem
                      name={[key, 'status']}
                      initialValue={initialValue}
                      valuePropName="checked"
                      noStyle
                    >
                      <Switch />
                    </FormItem>

                    <div>
                      <h3>{t(`${key}.toggle.title`)}</h3>

                      {!useToggleDescription ? null : (
                        <p>{t(`${key}.toggle.description`)}</p>
                      )}

                      <FormItem dependencies={[[key, 'status']]} noStyle>
                        {({ getFieldValue }) =>
                          !getFieldValue([key, 'status']) ? null : (
                            <div className={styles.fields}>{component}</div>
                          )
                        }
                      </FormItem>
                    </div>
                  </div>
                ) : (
                  component
                )}
              </Block>
            ),
          )}
        </div>
      </Header>
    </Form>
  );
});

SettingThirdParty.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingThirdParty;
