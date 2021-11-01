// typescript import
import { NextPage } from 'next';

// import
import React, { useContext, useEffect } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button } from 'antd';

import Tooltip from '@admin/tooltip';
import { AdTrackContext } from '@admin/ad-track';
import { useTranslation } from '@meepshop/locales';
import { meepshopLogo, loginBackground } from '@meepshop/images';

import useValidateCname from './hooks/useValidateCname';
import useApplicantInitiatesStore from './hooks/useApplicantInitiatesStore';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: boolean;
}

// definition
const { Item: FormItem } = Form;
const { Option } = Select;

const SetUpStore: NextPage<PropsType> = React.memo(() => {
  const { t } = useTranslation('set-up-store');
  const adTrack = useContext(AdTrackContext);
  const validateCname = useValidateCname();
  const { loading, applicantInitiatesStore } = useApplicantInitiatesStore();

  useEffect(() => {
    adTrack.custom('點擊', '月租註冊_驗證成功', '月租註冊');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      className={styles.root}
      style={{ backgroundImage: `url('${loginBackground}')` }}
      onFinish={applicantInitiatesStore}
    >
      <div className={styles.wrapper}>
        <img src={meepshopLogo} alt="Meepshop" />

        <div>{t('title')}</div>
        <div>{t('description')}</div>

        <div className={styles.label}>
          {t('cname.label')}
          <Tooltip title={t('cname.tooltip')} />
        </div>

        <FormItem
          name={['cname']}
          rules={[
            {
              required: true,
              message: t('cname.error'),
            },
            {
              pattern: /^[a-z0-9-]{4,20}$/,
              message: t('cname.error'),
            },
            {
              validator: validateCname,
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <Input
            placeholder={t('cname.placeholder')}
            size="large"
            suffix=".new.meepshop.com"
          />
        </FormItem>

        <div className={styles.label}>
          {t('currency.label')}
          <Tooltip title={t('currency.tooltip')} />
        </div>

        <FormItem name={['currency']} initialValue="TWD">
          <Select size="large">
            {['TWD', 'JPY', 'USD', 'VND', 'EUR'].map(key => (
              <Option key={key} value={key}>
                {key} {t(`currency.${key}`)}
              </Option>
            ))}
          </Select>
        </FormItem>

        <Button loading={loading} type="primary" size="large" htmlType="submit">
          {t('create-store')}
        </Button>

        <span>
          <ExclamationCircleOutlined />
          {t('can-not-change-after-setting')}
        </span>
      </div>
    </Form>
  );
});

SetUpStore.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default SetUpStore;
