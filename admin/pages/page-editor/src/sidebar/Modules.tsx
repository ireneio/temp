// import
import React from 'react';

import useSections from './hooks/useSections';
import styles from './styles/modules.less';

// definition
export default React.memo(() => {
  const sections = useSections();

  return (
    <div className={styles.root}>
      {sections.map(({ title, modules }) => (
        <div className={styles.section}>
          <div>{title}</div>
          <div>
            {modules.map(module => (
              <div className={styles.module}>
                <div>{module.icon}</div>
                <div>{module.title}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
