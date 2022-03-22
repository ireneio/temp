// typescript import
import { ModalFuncProps } from 'antd';

// import
import React, { useCallback } from 'react';
import { Modal } from 'antd';

import styles from '../styles/useSuccess.less';

// typescript definition
interface OptionsType extends Omit<ModalFuncProps, 'title' | 'content'> {
  image: string;
  title: string;
  content: React.ReactNode;
}

// definition
export default (): ((options: OptionsType) => void) =>
  useCallback(({ image, title, content, className, ...options }) => {
    Modal.success({
      ...options,
      width: '100%',
      title: null,
      icon: null,
      className: `${styles.root} ${className || ''}`,
      content: (
        <>
          <img src={image} alt="success" />

          <div className={styles.title}>{title}</div>

          <div className={styles.content}>{content}</div>
        </>
      ),
    });
  }, []);
