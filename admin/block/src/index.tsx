// import
import React, { useContext } from 'react';

import { CollapsedContext } from '@admin/wrapper';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  className?: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({ className, title, description, children }: PropsType) => {
    const collapsed = useContext(CollapsedContext);

    return (
      <section
        className={`${styles.root} ${
          collapsed ? '' : styles.isNotCollapsed
        } ${className || ''}`}
      >
        <div>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.description}>{description}</div>
        </div>

        <div>{children}</div>
      </section>
    );
  },
);
