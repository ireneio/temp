// typescript import
import { I18nPropsType } from '@meepshop/locales';

// import
import React from 'react';
import { Button } from 'antd';

import { withTranslation } from '@meepshop/locales';

import StoreIcon from './StoreIcon';
import styles from './styles/storeDetail.less';

// typescript definition
interface PropsType extends I18nPropsType {
  shipmentType: string;
  store: {
    type: string;
    famiServiceNumber: string;
    name: string;
    storeNumber: string;
    address: string;
    phones: string[];
    ecpayStoreNumber: string;
    ezshipStoreNumber: string;
  };
  reselectStore: () => void;
  confirmStore: (store: {}) => void;
}

// definition
class StoreDetail extends React.PureComponent<PropsType> {
  private isStoreDisabled = (): boolean => {
    const {
      shipmentType,
      store: { ecpayStoreNumber, ezshipStoreNumber },
    } = this.props;

    switch (shipmentType) {
      case 'EZSHIP':
        return !ezshipStoreNumber;
      default:
        return !ecpayStoreNumber;
    }
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      shipmentType,
      store: {
        type,
        storeNumber,
        famiServiceNumber,
        name,
        address,
        phones,
        ecpayStoreNumber,
        ezshipStoreNumber,
      },
      reselectStore,
      confirmStore,
    } = this.props;

    return (
      <div className={`${styles.root} ${!storeNumber ? styles.hidden : ''}`}>
        {!storeNumber ? (
          <div className={styles.noData}>
            <StoreIcon />
            <div>{t('pleaseSearchStore')}</div>
          </div>
        ) : (
          <>
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
              className={this.isStoreDisabled() ? styles.disabledButton : ''}
              disabled={this.isStoreDisabled()}
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
              {this.isStoreDisabled() ? t('unableToShip') : t('confirmStore')}
            </Button>
            <Button size="large" onClick={() => reselectStore()}>
              {t('reselectStore')}
            </Button>
          </>
        )}
      </div>
    );
  }
}

export default withTranslation('convenience-store-map')(StoreDetail);
