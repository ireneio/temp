// typescript import
import { AffixProps } from 'antd/lib/affix';

// import
import React, { useState, useContext } from 'react';
import { Affix } from 'antd';

import { CollapsedContext } from '@admin/wrapper';

import styles from './styles/index.less';

// definition
export default React.memo(({ children, ...props }: AffixProps) => {
  const collapsed = useContext(CollapsedContext);
  const [isAffixed, setIsAffixed] = useState(false);

  return (
    <Affix
      {...props}
      className={`${isAffixed ? styles.root : ''} ${
        collapsed ? styles.collapsed : ''
      }`}
      onChange={affixed => setIsAffixed(affixed || false)}
    >
      {children}
    </Affix>
  );
});
