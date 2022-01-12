// import
import React, { useContext } from 'react';
import { UpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/backToTop.less';

// definition
export default React.memo(() => {
  const colors = useContext(ColorsContext);

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
