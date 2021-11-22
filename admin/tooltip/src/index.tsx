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
  onlyLink?: boolean;
}

// definition
export default React.memo(
  ({
    overlayClassName,
    iconClassName,
    onClick,
    children,
    title,
    onlyLink,
    ...restProps
  }: PropsType) => (
    <Tooltip
      overlayClassName={`${styles.overlay} ${
        typeof title === 'string' ? styles.small : ''
      } ${onlyLink ? styles.onlyLink : ''} ${overlayClassName || ''}`}
      title={title}
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
