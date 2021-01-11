// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import GoToButton from './GoToButton';
import BackToTop from './BackToTop';

import useActionButton from './hooks/useActionButton';
import styles from './styles/index.less';

// graphql import
import { backToTopFragment } from './gqls/backToTop';

// definition
export default React.memo(() => {
  const data = useActionButton();
  const store = data?.viewer?.store;

  if (!store) return null;

  return (
    <div className={styles.root}>
      <GoToButton goToButton={store.page?.goToButton || null} />

      <BackToTop store={filter(backToTopFragment, store)} />
    </div>
  );
});
