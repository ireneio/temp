// typescript import
import { ComponentProps } from './constants';

// import
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import { useTranslation } from '@meepshop/locales';

import styles from './styles/footer.less';

// typescript definition
interface PropsType extends Pick<ComponentProps, 'step'> {
  selectedLength: number;
  current: number;
  total: number;
  changeProductsPage: (current: number) => void;
  setStep: (step: ComponentProps['step']) => void;
  confirm: () => void;
  clear: () => void;
}

// definition
export default React.memo(
  ({
    selectedLength,
    current,
    total,
    changeProductsPage,
    setStep,
    step,
    confirm,
    clear,
  }: PropsType) => {
    const { t } = useTranslation('products-selector');
    const [showTip, setShowTip] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const endPage = Math.ceil(total / 15);

    useEffect(() => {
      if (showTip && !timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          setShowTip(false);
          timeoutRef.current = null;
        }, 3000);
      }
    }, [showTip]);

    return (
      <div className={styles.root}>
        <div className={`${styles.tip} ${showTip ? styles.visible : ''}`}>
          <div>
            <ExclamationCircleOutlined />

            {t('limit-tip')}
          </div>
        </div>

        {step !== 'sort' ? null : (
          <Button onClick={() => setStep('search')}>
            <LeftOutlined />
            {t('go-to-search')}
          </Button>
        )}

        <div className={styles.selected}>
          <span className={selectedLength > 10 ? styles.highlight : ''}>
            {selectedLength}
          </span>
          <span>/10</span>
          <span>{t('chosen')}</span>
          {!selectedLength || step === 'sort' ? null : (
            <span className={styles.clear} onClick={clear}>
              {t('clear')}
            </span>
          )}
        </div>

        {step !== 'search' ? null : (
          <div className={styles.pagination}>
            <LeftOutlined
              className={current === 0 ? styles.disabled : ''}
              onClick={() => {
                if (current !== 0) changeProductsPage(current - 1);
              }}
            />
            <div>
              <span>{current + 1}</span>
              <span>/</span>
              <span>{endPage}</span>
            </div>
            <RightOutlined
              className={current === endPage - 1 ? styles.disabled : ''}
              onClick={() => {
                if (current + 1 !== endPage) changeProductsPage(current + 1);
              }}
            />
          </div>
        )}

        {step !== 'search' ? (
          <Button
            type="primary"
            onClick={() => {
              if (selectedLength > 10) setShowTip(true);
              else confirm();
            }}
          >
            {t('confirm')}
          </Button>
        ) : (
          <Button type="primary" onClick={() => setStep('sort')}>
            {t('check')}
            <RightOutlined />
          </Button>
        )}
      </div>
    );
  },
);
