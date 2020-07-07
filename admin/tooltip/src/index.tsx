// typescript import
import { AbstractTooltipProps } from 'antd/lib/tooltip';

// import
import React from 'react';
import { Tooltip, Icon } from 'antd';

import styles from './styles/index.less';

// typescript definition
interface PropsType extends Omit<AbstractTooltipProps, 'children'> {
  title: React.ReactNode;
  iconClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

// definition
export default React.memo(
  ({ iconClassName, onClick, ...restProps }: PropsType) => (
    <Tooltip {...restProps}>
      <Icon
        className={`${styles.icon} ${iconClassName || ''}`}
        type="question-circle-o"
        onClick={onClick}
      />
    </Tooltip>
  ),
);
