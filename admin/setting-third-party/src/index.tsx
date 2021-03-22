// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Form, Button, Switch, Divider } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Header from '@admin/header';
import Block from '@admin/block';

// Use to copy mixin.less
import './styles/mixin.less';

import useBlocks from './hooks/useBlocks';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import { getThirdPartySetting } from '@meepshop/types/gqls/admin';

// graphql import
import { useBlocksFragment } from './hooks/useBlocks';
import { useSaveFragment } from './hooks/useSave';

// typescript definition
interface PropsType {
  form?: FormComponentProps['form'];
  namespacesRequired: string[];
}

// definition
const query = gql`
  query getThirdPartySetting {
    viewer {
      id
      store {
        id
        ...useBlocksFragment
        ...useSaveFragment
      }
    }
  }

  ${useBlocksFragment}
  ${useSaveFragment}
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SettingThirdParty: NextPage<PropsType> = Form.create<PropsType>()(
  React.memo(({ form }: FormComponentProps) => {
    const { data } = useQuery<getThirdPartySetting>(query);
    const { t } = useTranslation('setting-third-party');

    const { loading, save } = useSave(
      form,
      filter(useSaveFragment, data?.viewer?.store || null),
    );
    const blocks = useBlocks(
      form,
      filter(useBlocksFragment, data?.viewer?.store || null),
    );
    const {
      getFieldDecorator,
      getFieldValue,
      resetFields,
      isFieldsTouched,
    } = form;

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

              <Button onClick={save} type="primary" loading={loading}>
                {t('save')}
              </Button>
            </div>
          )
        }
      >
        <Form className={styles.root} labelAlign="left">
          {blocks.map(
            (
              {
                key,
                src,
                useToggle,
                initialValue,
                useToggleDescription,
                component,
              },
              index,
            ) => (
              <React.Fragment key={key}>
                <Block
                  title={t(`${key}.title`)}
                  description={t(`${key}.description`)}
                >
                  <img src={src} alt={key} />

                  {useToggle ? (
                    <div className={styles.item}>
                      {getFieldDecorator(`${key}.status`, {
                        initialValue,
                        valuePropName: 'checked',
                      })(<Switch />)}

                      <div>
                        <h3>{t(`${key}.toggle.title`)}</h3>

                        {!useToggleDescription ? null : (
                          <p>{t(`${key}.toggle.description`)}</p>
                        )}

                        {!getFieldValue(`${key}.status`) ? null : (
                          <div className={styles.fields}>{component}</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    component
                  )}
                </Block>

                {index === blocks.length - 1 ? null : <Divider />}
              </React.Fragment>
            ),
          )}
        </Form>
      </Header>
    );
  }),
);

SettingThirdParty.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default SettingThirdParty;
