// typescript import
import { ModalFuncProps } from 'antd';

// import
import React, { useRef, useCallback } from 'react';
import { Modal } from 'antd';

import styles from '../styles/useSuccess.less';

// typescript definition
interface OptionsType extends Omit<ModalFuncProps, 'title' | 'content'> {
  img: string;
  title: string;
  content: (
    modalRef: React.RefObject<ReturnType<typeof Modal.success> | undefined>,
  ) => React.ReactNode;
}

// definition
export default (options: OptionsType): (() => void) => {
  const modalRef = useRef<ReturnType<typeof Modal.success>>();

  return useCallback(() => {
    const { img, title, content, className, ...rest } = options;

    modalRef.current = Modal.success({
      ...rest,
      width: '100%',
      title: null,
      icon: null,
      className: `${styles.root} ${className || ''}`,
      content: (
        <>
          <img src={img} alt="success" />

          <div className={styles.title}>{title}</div>

          <div className={styles.content}>{content(modalRef)}</div>
        </>
      ),
    });
  }, [options]);
};
