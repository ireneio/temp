// import
import React, { useState, useContext, useRef, useEffect } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Colors as ColorsContext,
  Sensor as SensorContext,
} from '@meepshop/context';
import { useTranslation, useGetLanguage } from '@meepshop/locales';

import styles from './styles/expandedRow.less';

// graphql typescript
import { useProductsColumnsLineItemFragment as useProductsColumnsLineItemFragmentType } from '@meepshop/types/gqls/store';

// definition
export default React.memo(
  ({ record }: { record: useProductsColumnsLineItemFragmentType }) => {
    const { t } = useTranslation('cart');
    const getLanguage = useGetLanguage();
    const { isMobile } = useContext(SensorContext);
    const colors = useContext(ColorsContext);
    const [expanded, setExpanded] = useState(true);
    const [showSwitch, setShowSwitch] = useState(false);
    const shipments =
      record.applicableShipments
        ?.map(shipment => getLanguage(shipment.title))
        .join('、') || '';
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!showSwitch && divRef.current) {
        const rect = divRef.current.getBoundingClientRect();

        if (rect.height > 22) setShowSwitch(true);
      }
    }, [showSwitch]);

    useEffect(() => {
      if (isMobile) setExpanded(false);
    }, [isMobile]);

    return (
      <>
        <div
          className={`${styles.row} ${expanded ? styles.expanded : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <div ref={divRef} className={showSwitch ? styles.switch : ''}>
            <span>
              {isMobile
                ? t('applicableShipments-mobile')
                : t('applicableShipments')}
            </span>
            <span>{shipments}</span>
          </div>

          {!isMobile ? (
            <>
              {!showSwitch ? (
                <div />
              ) : (
                <div>{expanded ? <UpOutlined /> : <DownOutlined />}</div>
              )}
            </>
          ) : (
            <div>{expanded ? t('collapse') : t('expand')}</div>
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.row} {
                color: ${colors[3]};
                background-color: ${transformColor(colors[3]).alpha(0.05)};
              }
            `,
          }}
        />
      </>
    );
  },
);
