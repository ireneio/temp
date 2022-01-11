// import
import React, { useState, useContext, useRef } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Affix } from 'antd';

import { OpenNewPageIcon } from '@meepshop/icons';
import Link from '@meepshop/link';
import { CollapsedContext } from '@admin/wrapper';
import Switch from '@meepshop/switch';

import styles from './styles/index.less';

// typescript definition
interface LinkType {
  text: string;
  url: string;
}

interface PropsType {
  title: React.ReactNode;
  prevTitle?: string;
  link?: LinkType;
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
    link,
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
                    <LeftOutlined className={styles.leftIcon} />

                    {prevTitle}
                  </a>
                </Link>
              )}

              <div className={styles.title}>
                {title}

                {!link ? null : (
                  <Link href={link.url} target="_blank">
                    <a href={link.url}>
                      {link.text}

                      <OpenNewPageIcon />
                    </a>
                  </Link>
                )}
              </div>
            </h1>

            {buttons}
          </div>
        </Switch>
        <div className={styles.content}>{content}</div>
      </div>
    );
  },
);
