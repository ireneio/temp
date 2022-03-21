// typescript import
import { OptionsType } from './constants';

// import
import React, { useEffect, useState, useContext, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Radio, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { filter } from 'graphql-anywhere';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import {
  Colors as ColorsContext,
  Role as RoleContext,
} from '@meepshop/context';
import DraftText from '@meepshop/draft-text';

import Form from './Form';
import { SIGNUP, LOGIN, SHOPPER } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { getLogin as getLoginType } from '@meepshop/types/gqls/store';
import { ViewerTypeEnum } from '@meepshop/types/gqls/meepshop';

// graphql import
import { getLogin } from './gqls';
import { formFragment } from './gqls/form';

// definition
const { Group, Button } = Radio;

export default React.memo(() => {
  const { t } = useTranslation('login');
  const colors = useContext(ColorsContext);
  const role = useContext(RoleContext);
  const roleRef = useRef<ViewerTypeEnum | null>(role);
  const router = useRouter();
  const { data } = useQuery<getLoginType>(getLogin);
  const [options, setOptions] = useState<OptionsType>(LOGIN);

  useEffect(() => {
    if (roleRef.current === SHOPPER) {
      router.back();
      roleRef.current = null;
    }
  }, [router]);

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  const shopperLoginMessageEnabled =
    data.viewer?.store?.setting?.shopperLoginMessageEnabled || false;
  const shopperLoginMessage =
    data.viewer?.store?.setting?.shopperLoginMessage || null;

  return (
    <div className={styles.root}>
      <Group
        value={options}
        onChange={({ target }) => setOptions(target.value)}
      >
        <Button value={SIGNUP}>{t('signup')}</Button>

        <Button value={LOGIN}>{t('login')}</Button>
      </Group>

      <Form
        options={options}
        setOptions={setOptions}
        store={filter(formFragment, data.viewer?.store || null)}
      />

      {!shopperLoginMessageEnabled || !shopperLoginMessage ? null : (
        <>
          <div className={styles.hr} style={{ backgroundColor: colors[5] }} />

          <DraftText
            id={data.viewer?.store?.id || 'null-id' /* SHOULD_NOT_BE_NULL */}
            className={styles.loginMessage}
            content={shopperLoginMessage}
            __typename="DraftTextModule"
          />
        </>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
              .${
                styles.root
              } .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                border-color: ${colors[3]};
                background-color: ${colors[0]}
              }
              .${
                styles.root
              } .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child{
                border-color: ${colors[3]};
              }
              .${
                styles.root
              } .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
                background-color: ${colors[3]};
              }
              .${styles.root} .ant-radio-button-wrapper{
                background-color: ${colors[0]};
              }
              .${
                styles.root
              } .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked) span{
                color: ${transformColor(colors[3]).alpha(0.5)};
              }
              .${
                styles.root
              } .ant-radio-button-wrapper, .ant-radio-button-wrapper:first-child{
                border-color: ${transformColor(colors[3]).alpha(0.5)};
              }
            `,
        }}
      />
    </div>
  );
});
