// typescript import
import { PropsType as PreviewerPropsType } from './previewer';

// import
import React, { useState, useContext, useCallback } from 'react';
import { Popover, Drawer } from 'antd';

import { Sensor as SensorContext } from '@meepshop/context';

import Previewer from './previewer';
import styles from './styles/index.less';

// typescript definition
interface PropsType extends Omit<PreviewerPropsType, 'onClose'> {
  children: React.ReactElement;
}

// definition
export default React.memo(({ children, ...props }: PropsType) => {
  const { isMobile } = useContext(SensorContext);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  if (isMobile)
    return (
      <>
        {React.cloneElement(children, {
          onClick: () => setIsOpen(true),
        })}

        <Drawer
          className={styles.drawer}
          placement="left"
          width="80%"
          closable={false}
          destroyOnClose
          visible={isOpen}
          onClose={onClose}
        >
          <Previewer {...props} onClose={onClose} />
        </Drawer>
      </>
    );

  return (
    <Popover
      placement="bottomRight"
      trigger="hover"
      overlayClassName={styles.popover}
      content={<Previewer {...props} onClose={onClose} />}
    >
      {children}
    </Popover>
  );
});
