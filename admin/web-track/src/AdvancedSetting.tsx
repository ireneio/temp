// import
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Switch, message, Button, InputNumber } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/advancedSetting.less';

// graphql typescript
import { updateAdRetentionMilliseconds as updateAdRetentionMillisecondsType } from './__generated__/updateAdRetentionMilliseconds';
import { advancedSettingFragment as advancedSettingFragmentType } from './fragments/__generated__/advancedSettingFragment';

// typescript definition
interface PropsType {
  store: advancedSettingFragmentType | null;
}

// definition
export default React.memo(({ store }: PropsType) => {
  const { t } = useTranslation('web-track');

  const storeId = store?.id;
  const adRetentionMillisecondsEnabled =
    store?.setting?.adRetentionMillisecondsEnabled;
  const defaultAdRetentionMilliseconds =
    store?.setting?.adRetentionMilliseconds || 5000;

  const [editMode, setEditMode] = useState(false);
  const [adRetentionMilliseconds, setAdRetentionMilliseconds] = useState(
    defaultAdRetentionMilliseconds,
  );

  const [updateAdRetentionMilliseconds] = useMutation<
    updateAdRetentionMillisecondsType
  >(
    gql`
      mutation updateAdRetentionMilliseconds($updateStoreList: [UpdateStore]) {
        updateStoreList(updateStoreList: $updateStoreList) {
          id
          setting {
            adRetentionMilliseconds
            adRetentionMillisecondsEnabled
          }
        }
      }
    `,
    {
      update: () => {
        message.success(t('save-success'));
      },
    },
  );

  return (
    <div className={styles.root}>
      <Switch
        defaultChecked={adRetentionMillisecondsEnabled}
        onChange={value => {
          updateAdRetentionMilliseconds({
            variables: {
              updateStoreList: {
                id: storeId,
                setting: {
                  adRetentionMillisecondsEnabled: value,
                  adRetentionMilliseconds,
                },
              },
            },
          });
          setEditMode(false);
        }}
      />

      <div>
        <div>
          {t('retention-milliseconds-track.title')}
          <Tooltip
            arrowPointAtCenter
            placement="bottomLeft"
            overlayStyle={{ maxWidth: '440px' }}
            title={
              <>
                <div>{t('retention-milliseconds-track.tip-1')}</div>
                <div>{t('retention-milliseconds-track.tip-2')}</div>
              </>
            }
          />
        </div>

        <div>{t('retention-milliseconds-track.description')}</div>

        {!editMode ? (
          <Button onClick={() => setEditMode(true)}>
            {t('retention-milliseconds-track.setting')}：
            {adRetentionMilliseconds / 1000}s
          </Button>
        ) : (
          <div>
            {t('retention-milliseconds-track.setting')}
            <InputNumber
              min={1}
              max={1200}
              placeholder={t('retention-milliseconds-track.input-seconds')}
              value={adRetentionMilliseconds / 1000}
              onChange={value =>
                setAdRetentionMilliseconds((value || 1) * 1000)
              }
            />
            <Button
              type="primary"
              onClick={() => {
                updateAdRetentionMilliseconds({
                  variables: {
                    updateStoreList: {
                      id: storeId,
                      setting: {
                        adRetentionMilliseconds,
                      },
                    },
                  },
                });
                setEditMode(false);
              }}
            >
              {t('save')}
            </Button>

            <Button
              onClick={() => {
                setAdRetentionMilliseconds(defaultAdRetentionMilliseconds);
                setEditMode(false);
              }}
            >
              {t('cancel')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});
