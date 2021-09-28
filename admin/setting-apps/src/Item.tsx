// typescript import
import { AppListType } from './hooks/useAppList';

// import
import React from 'react';
import { Switch } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useUpdateAppStatus from './hooks/useUpdateAppStatus';
import styles from './styles/item.less';

// definition
export default React.memo(
  ({ id, title, isInstalled, img, link }: AppListType) => {
    const { t } = useTranslation('setting-apps');
    const { loading, updateAppStatus } = useUpdateAppStatus();

    return (
      <div className={styles.item}>
        <img className={styles.img} src={img} alt={t(`${title}.title`)} />
        <div className={styles.desc}>
          <h2>
            {t(`${title}.title`)}
            <span
              className={title !== 'newsletters' ? styles.freeTag : styles.tag}
            >
              {title !== 'newsletters' ? t('free') : `US$ 0.0008 / ${t('per')}`}
            </span>
          </h2>
          <p>
            {t(`${title}.desc`)}
            {!link ? null : (
              <a
                className={styles.link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('detail')}
              </a>
            )}
          </p>
        </div>
        <Switch
          className={styles.switch}
          loading={loading}
          defaultChecked={isInstalled}
          checkedChildren={t('active')}
          unCheckedChildren={t('disable')}
          onChange={checked =>
            updateAppStatus({
              id,
              isInstalled: checked ? 1 : 0,
            })
          }
        />
      </div>
    );
  },
);
