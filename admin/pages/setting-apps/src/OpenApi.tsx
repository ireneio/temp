// import
import React, { useEffect } from 'react';
import { Button } from 'antd';
import {
  QuestionCircleOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useCopyToClipboard } from 'react-use';

import { useTranslation } from '@meepshop/locales';
import { adminSettingAppsOpenAPI_w90_h90 as adminSettingAppsOpenAPI } from '@meepshop/images';
import Switch from '@meepshop/switch';
import message from '@admin/message';
import Tooltip from '@admin/tooltip';

import Subscription from './Subscription';
import ExpirationDate from './ExpirationDate';
import styles from './styles/openApi.less';
import useStartOpenApiFeatureSubscription from './hooks/useStartOpenApiFeatureSubscription';
import useStopOpenApiFeatureSubscription from './hooks/useStopOpenApiFeatureSubscription';

// graphql typescript
import {
  openApiFragment as openApiFragmentType,
  FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType,
} from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  viewer: openApiFragmentType | null;
}

// definition
export default React.memo(({ viewer }: PropsType) => {
  const { t } = useTranslation('setting-apps');
  const [copied, copyToClipboard] = useCopyToClipboard();
  const role = viewer?.role || 'HELPER';
  const store = viewer?.store;
  const status =
    store?.featureSubscription.openApiFeatureSubscription.status ||
    ('NOT_SUBSCRIBED' as FeatureSubscriptionStatusEnumType);
  const apiKey = store?.featureSubscription.openApiFeatureSubscription.apiKey;
  const startOpenApiFeatureSubscription = useStartOpenApiFeatureSubscription(
    store?.id || null,
    status !== 'NOT_SUBSCRIBED',
  );
  const stopOpenApiFeatureSubscription = useStopOpenApiFeatureSubscription(
    store?.id || null,
  );

  useEffect(() => {
    if (copied.value)
      message.success(t('open-api.apiKey.copied', { apiKey: copied.value }));
  }, [t, copied]);

  return (
    <Subscription
      img={adminSettingAppsOpenAPI}
      status={status}
      price={
        <Tooltip title={t('open-api.price-tooltip')}>
          {t('open-api.price')}

          <QuestionCircleOutlined className={styles.icon} />
        </Tooltip>
      }
      link="#test"
      name="open-api"
    >
      <Switch
        isTrue={role === 'HELPER'}
        render={children => (
          <Tooltip
            title={t('open-api.apiKey.helper-warn.tooltip')}
            align={{ offset: [0, 14] }}
          >
            {children}
          </Tooltip>
        )}
      >
        <Button
          type={status === 'SUBSCRIBE_CONTINUING' ? 'default' : 'primary'}
          onClick={
            status !== 'SUBSCRIBE_CONTINUING'
              ? startOpenApiFeatureSubscription
              : stopOpenApiFeatureSubscription
          }
          disabled={role === 'HELPER'}
        >
          {t(`button.${status}`)}
        </Button>
      </Switch>

      <Button className={styles.instruction} href="#test">
        {t('open-api.instruction')}
      </Button>

      {status !== 'SUBSCRIBE_CANCELLING' ? null : <ExpirationDate />}

      {status === 'NOT_SUBSCRIBED' ? null : (
        <div className={`${styles.apiKey} ${styles[role]}`}>
          {role === 'MERCHANT' ? (
            <>
              <div>{t('open-api.apiKey.title')}</div>

              {apiKey}

              <Tooltip title={t('open-api.apiKey.tooltip')}>
                <CopyOutlined
                  onClick={() => {
                    if (apiKey) copyToClipboard(apiKey);
                  }}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <InfoCircleOutlined />

              {t('open-api.apiKey.helper-warn.text')}
            </>
          )}
        </div>
      )}
    </Subscription>
  );
});
