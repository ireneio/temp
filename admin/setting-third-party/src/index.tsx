// typescript import
import { NextPage } from 'next';
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon, Form, Button, Switch, Divider } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import SettingWrapper from '@admin/setting-wrapper';
import SettingBlock from '@admin/setting-block';

// Use to copy mixin.less
import './styles/mixin.less';

import useBlocks from './hooks/useBlocks';
import useSave from './hooks/useSave';
import styles from './styles/index.less';

// graphql typescript
import { getThirdPartySetting } from './__generated__/getThirdPartySetting';

// graphql import
import { useBlocksFragment } from './hooks/useBlocks';

// definition
const query = gql`
  query getThirdPartySetting {
    viewer {
      id
      store {
        id
        ...useBlocksFragment
      }
    }
  }

  ${useBlocksFragment}
`;

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore FIXME: remove after use antd v4 form hook
const SettingThirdParty: NextPage = Form.create<FormComponentProps>()(
  React.memo(({ form }: FormComponentProps) => {
    const { data } = useQuery<getThirdPartySetting>(query);
    const { t } = useTranslation('setting-third-party');
    const save = useSave(form, data?.viewer?.store?.id || null);
    const blocks = useBlocks(
      form,
      !data?.viewer?.store
        ? null
        : filter(useBlocksFragment, data.viewer.store),
    );
    const {
      getFieldDecorator,
      getFieldValue,
      resetFields,
      isFieldsTouched,
    } = form;

    if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <SettingWrapper
        title={t('title')}
        buttons={
          !isFieldsTouched() ? null : (
            <div>
              <Button onClick={() => resetFields()}>{t('cancel')}</Button>

              <Button onClick={save} type="primary">
                {t('save')}
              </Button>
            </div>
          )
        }
      >
        <Form className={styles.root} labelAlign="left">
          {blocks.map(
            (
              { key, src, initialValue, useToggleDescription, component },
              index,
            ) => (
              <React.Fragment key={key}>
                <SettingBlock
                  title={t(`${key}.title`)}
                  description={t(`${key}.description`)}
                >
                  <img src={src} alt={key} />

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
                </SettingBlock>

                {index === blocks.length - 1 ? null : <Divider />}
              </React.Fragment>
            ),
          )}
        </Form>
      </SettingWrapper>
    );
  }),
);

SettingThirdParty.getInitialProps = async () => ({
  namespacesRequired: ['setting-third-party'],
});

export default SettingThirdParty;
