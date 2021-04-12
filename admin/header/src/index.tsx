// import
import React, { useState, useContext, useRef } from 'react';
import { Affix, Icon } from 'antd';

import Link from '@meepshop/link';
import { CollapsedContext } from '@admin/wrapper';
import Switch from '@meepshop/switch';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  title: React.ReactNode;
  prevTitle?: string;
  backTo?: string;
  disableAffix?: boolean;
  buttons?: React.ReactNode;
  children?: React.ReactNode;
}

// definition
export default React.memo(
  ({
    title,
    prevTitle,
    backTo,
    buttons,
    disableAffix,
    children: content,
  }: PropsType) => {
    const collapsed = useContext(CollapsedContext);
    const rootRef = useRef(null);
    const [isAffixed, setIsAffixed] = useState(false);

    return (
      <div
        className={`${styles.root} ${disableAffix ? styles.disableAffix : ''}`}
        ref={rootRef}
      >
        <Switch
          isTrue={!disableAffix}
          render={children => (
            <Affix
              className={`${isAffixed ? styles.affix : ''} ${
                collapsed ? styles.collapsed : ''
              }`}
              onChange={affixed => setIsAffixed(affixed || false)}
              target={() => rootRef.current}
            >
              <>{children}</>
            </Affix>
          )}
        >
          <div className={styles.header}>
            <h1>
              {!backTo ? null : (
                <Link href={backTo}>
                  <a href={backTo}>
                    <Icon className={styles.leftIcon} type="left" />

                    {prevTitle}
                  </a>
                </Link>
              )}

              {title}
            </h1>

            {buttons}
          </div>
        </Switch>
        <div className={styles.content}>{content}</div>
      </div>
    );
  },
);
