// typescript import
import { AbstractTooltipProps } from 'antd/lib/tooltip';

// import
import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

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
        <QuestionCircleOutlined
          className={`${styles.icon} ${iconClassName || ''}`}
          onClick={onClick}
        />
      )}
    </Tooltip>
  ),
);
