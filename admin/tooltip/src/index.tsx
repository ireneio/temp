// typescript import
import { AbstractTooltipProps } from 'antd/lib/tooltip';

// import
import React from 'react';
import { Tooltip, Icon } from 'antd';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends AbstractTooltipProps {
  title: React.ReactNode;
  overlayClassName?: string;
  iconClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

// definition
export default React.memo(
  ({
    overlayClassName,
    iconClassName,
    onClick,
    children,
    ...restProps
  }: PropsType) => (
    <Tooltip
      overlayClassName={`${styles.overlay} ${overlayClassName || ''}`}
      {...restProps}
    >
      {children || (
        <Icon
          className={`${styles.icon} ${iconClassName || ''}`}
          type="question-circle"
          onClick={onClick}
        />
      )}
    </Tooltip>
  ),
);
