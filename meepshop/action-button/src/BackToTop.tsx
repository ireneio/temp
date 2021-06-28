// import
import React, { useContext } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/backToTop.less';

// graphql typescript
import { backToTopFragment as backToTopFragmentType } from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  store: backToTopFragmentType;
}

// definition
export default React.memo(({ store }: PropsType) => {
  const colors = useContext(ColorsContext);

  const backToTopButtonEnabled =
    store?.setting?.backToTopButtonEnabled || false;

  if (!backToTopButtonEnabled) return null;

  return (
    <BackTop
      className={styles.root}
      visibilityHeight={typeof window === 'undefined' ? 0 : window.innerHeight}
    >
      <UpOutlined
        style={{
          background: colors[0],
          color: colors[3],
          boxShadow: `0 2px 10px 0 ${colors[3]}`,
        }}
      />
    </BackTop>
  );
});
