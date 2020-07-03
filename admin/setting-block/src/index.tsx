// import
import React from 'react';

import styles from './styles/index.less';

// typescript definition
interface PropsType {
  title: string;
  description: string;
  children: React.ReactNode;
}

// definition
export default React.memo(({ title, description, children }: PropsType) => (
  <section className={styles.root}>
    <div>
      <h2 className={styles.title}>{title}</h2>

      <p className={styles.description}>{description}</p>
    </div>

    <div>{children}</div>
  </section>
));
