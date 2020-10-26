// import
import React from 'react';

import styles from './styles/index.less';

// graphql typescript
import { pageFragment } from './gqls/__generated__/pageFragment';

// typescript definition
interface PropsType {
  storeExperiment: pageFragment | null;
  children: React.ReactNode;
}

// definition
export default React.memo(({ storeExperiment, children }: PropsType) => (
  <div className={styles.root}>
    <div>{children}</div>

    {storeExperiment?.hiddingMeepshopMaxInFooterEnabled ? null : (
      <footer className={styles.footer}>
        <a
          href="https://meepshop.cc/8h1kG"
          target="_blank"
          rel="noopener noreferrer"
        >
          meepShop MAX 極速開店
        </a>
      </footer>
    )}
  </div>
));
