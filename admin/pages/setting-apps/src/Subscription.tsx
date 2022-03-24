// import
import React from 'react';

import { useTranslation } from '@meepshop/locales';
import Link from '@meepshop/link';

import styles from './styles/subscription.less';

// graphql typescript
import { FeatureSubscriptionStatusEnum as FeatureSubscriptionStatusEnumType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  name: string;
  img: string;
  link: string;
  status: FeatureSubscriptionStatusEnumType;
  price: React.ReactNode;
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({ name, img, link, status, price, children }: PropsType) => {
    const { t } = useTranslation('setting-apps');

    return (
      <div className={styles.root}>
        <img src={img} alt={name} />

        <div className={styles.content}>
          <div className={styles.title}>{t(`${name}.title`)}</div>

          <div className={styles.desc}>
            {t(`${name}.desc`)}

            <Link href={link} target="_blank">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {t('detail')}
              </a>
            </Link>
          </div>

          {children}
        </div>

        <div className={`${styles.price} ${styles[status]}`}>
          {price}

          {status === 'NOT_SUBSCRIBED' ? null : (
            <span>{t(`status.${status}`)}</span>
          )}
        </div>
      </div>
    );
  },
);
