// import
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
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
    store?.featureSubscription.openAPIFeatureSubscription.status ||
    ('NOT_SUBSCRIBED' as FeatureSubscriptionStatusEnumType);
  const apiKey = store?.featureSubscription.openAPIFeatureSubscription.apiKey;
  const startOpenApiFeatureSubscription = useStartOpenApiFeatureSubscription(
    store?.id || null,
    status !== 'NOT_SUBSCRIBED',
  );
  const stopOpenApiFeatureSubscription = useStopOpenApiFeatureSubscription(
    store?.id || null,
    apiKey,
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
        <Tooltip
          overlayClassName={styles.priceTooltip}
          title={t('open-api.price-tooltip')}
        >
          {t('open-api.price')}

          <InfoCircleOutlined className={styles.icon} />
        </Tooltip>
      }
      link="https://supportmeepshop.com/knowledgebase/open-api/"
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
          className={styles.button}
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

      <Button
        className={styles.instruction}
        href="https://studio.apollographql.com/public/open-api?variant=production"
        target="__blank"
        rel="noopener noreferrer"
      >
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
