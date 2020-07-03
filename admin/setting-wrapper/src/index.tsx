// import
import React, { useState, useContext, useRef } from 'react';
import { Affix, Icon } from 'antd';

import Link, { useRouter } from '@meepshop/link';
import { CollapsedContext } from '@admin/wrapper';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  title: string;
  buttons?: React.ReactNode;
  children?: React.ReactNode;
}

// definition
export default React.memo(({ title, buttons, children }: PropsType) => {
  const { pathname } = useRouter();
  const collapsed = useContext(CollapsedContext);
  const rootRef = useRef(null);
  const [isAffixed, setIsAffixed] = useState(false);

  return (
    <div className={styles.root} ref={rootRef}>
      <Affix
        className={`${isAffixed ? styles.affix : ''} ${
          collapsed ? styles.collapsed : ''
        }`}
        onChange={affixed => setIsAffixed(affixed || false)}
        target={() => rootRef.current}
      >
        <div className={styles.header}>
          <h1>
            {pathname === '/setting' ? null : (
              <Link href="/setting">
                <a href="/setting">
                  <Icon className={styles.leftIcon} type="left" />
                </a>
              </Link>
            )}

            {title}
          </h1>

          {buttons}
        </div>
      </Affix>

      <div className={styles.content}>{children}</div>
    </div>
  );
});
