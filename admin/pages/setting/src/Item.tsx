// typescript import
import { ItemType } from './hooks/useItems';

// import
import React, { useState, useRef, useCallback } from 'react';
import { Tooltip } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useEffectWithCss } from '@admin/hooks';
import Link from '@meepshop/link';

import styles from './styles/item.less';

// definition
const Item = React.memo(
  ({ item, path, Icon }: ItemType): React.ReactElement => {
    const [isTouched, setTouched] = useState(false);
    const [isOverflowed, setOverflowed] = useState(false);
    const { t } = useTranslation('setting');
    const descriptionRef = useRef<HTMLDivElement>(null);
    const checkOverflowed = useCallback(() => {
      if ((descriptionRef.current?.offsetHeight ?? 0) > 40) setOverflowed(true);
    }, []);

    useEffectWithCss(checkOverflowed);

    return (
      <Link href={path}>
        <a href={path}>
          <div
            className={`${styles.item} ${isTouched ? styles.touched : ''}`}
            onClick={() => setTouched(true)}
          >
            <div>
              <Icon />
            </div>
            <div>
              <div>{t(`items.${item}.title`)}</div>
              <Tooltip
                placement="bottom"
                title={t(`items.${item}.description`)}
                overlayClassName={`${styles.tooltip} ${
                  isOverflowed ? '' : styles.invisible
                }`}
              >
                <div
                  ref={descriptionRef}
                  className={`${styles.description} ${
                    isOverflowed ? styles.overflowed : ''
                  }`}
                >
                  {t(`items.${item}.description`)}
                </div>
              </Tooltip>
            </div>
          </div>
        </a>
      </Link>
    );
  },
);

export default Item;
