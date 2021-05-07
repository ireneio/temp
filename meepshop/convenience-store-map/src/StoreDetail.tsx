// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { convenienceStoreMapStore } from '@meepshop/images';

import useCheckStoreDisabled from './hooks/useCheckStoreDisabled';
import indexStyles from './styles/index.less';
import styles from './styles/storeDetail.less';

// graphql typescript
import {
  storeDetailFragment as storeDetailFragmentType,
  ConvenienceStoreShipmentTypeEnum as ConvenienceStoreShipmentTypeEnumType,
} from '@meepshop/types/gqls/meepshop';

// typescript definition
interface PropsType {
  shipmentType: ConvenienceStoreShipmentTypeEnumType;
  store: storeDetailFragmentType | null;
  reselectStore: () => void;
  confirmStore: (store: {}) => void;
}

// definition
export default React.memo(
  ({ shipmentType, store, reselectStore, confirmStore }: PropsType) => {
    const { t } = useTranslation('convenience-store-map');
    const checkStoreDisabled = useCheckStoreDisabled(shipmentType);

    if (!store) {
      return (
        <div className={`${styles.root} ${!store ? styles.hidden : ''}`}>
          <div className={styles.noData}>
            <img src={convenienceStoreMapStore} alt="Store Detail" />
            <div>{t('pleaseSearchStore')}</div>
          </div>
        </div>
      );
    }

    const {
      type,
      storeNumber,
      famiServiceNumber,
      name,
      address,
      phones,
      ecpayStoreNumber,
      ezshipStoreNumber,
    } = store;

    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: ${styles.screenSmMax}) {
              #meepshop .${indexStyles.modalWrap} .ant-modal-body { overflow: hidden; }
              }
            `,
          }}
        />

        <div className={`${styles.root} ${!storeNumber ? styles.hidden : ''}`}>
          <div>
            <iframe
              className={styles.map}
              title="google map"
              src={`https://www.google.com/maps?q=${encodeURI(
                address,
              )}&ie=UTF8&output=embed`}
              height={type === 'FAMI' ? '194px' : '218px'}
              allowFullScreen
            />
            <div className={styles.details}>
              <div>
                <div>{t('storeNumber')}：</div>
                <div>{storeNumber}</div>
              </div>
              {type !== 'FAMI' ? null : (
                <div>
                  <div>{t('storeServiceNumber')}：</div>
                  <div>{famiServiceNumber}</div>
                </div>
              )}
              <div>
                <div>{t('storeName')}：</div>
                <div>{name}</div>
              </div>
              <div>
                <div>{t('storeAddress')}：</div>
                <div>{address}</div>
              </div>
              <div>
                <div>{t('storePhone')}：</div>
                <div>{phones.join(', ')}</div>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            className={checkStoreDisabled(store) ? styles.disabledButton : ''}
            disabled={checkStoreDisabled(store)}
            onClick={() =>
              confirmStore({
                CVSStoreName: name,
                CVSAddress: address,
                CVSStoreID:
                  shipmentType === 'EZSHIP'
                    ? ezshipStoreNumber
                    : ecpayStoreNumber,
                cvsType: type,
                cvsCode: storeNumber,
              })
            }
          >
            {checkStoreDisabled(store) ? t('unableToShip') : t('confirmStore')}
          </Button>
          <Button size="large" onClick={reselectStore}>
            {t('reselectStore')}
          </Button>
        </div>
      </>
    );
  },
);
