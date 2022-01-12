// typescript import
import { PropsType as GoToButtonPropsType } from './GoToButton';

// import
import React from 'react';

import GoToButton from './GoToButton';
import BackToTop from './BackToTop';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends GoToButtonPropsType {
  backToTopButtonEnabled: boolean;
}

// definition
export default React.memo(
  ({ backToTopButtonEnabled, goToButton }: PropsType) => (
    <div className={styles.root}>
      <GoToButton goToButton={goToButton} />

      {!backToTopButtonEnabled ? null : <BackToTop />}
    </div>
  ),
);
