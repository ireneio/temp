// import
import React, { useContext } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import transformColor from 'color';

import {
  Sensor as SensorContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import Switch from '@meepshop/switch';

import styles from './styles/footer.less';

// typescript definition
interface PropsType {
  loading: boolean;
  showFooter: boolean;
  goToCheckout: () => void;
}

// definition
export default React.memo(
  ({ loading, showFooter, goToCheckout }: PropsType) => {
    const { t } = useTranslation('cart');
    const colors = useContext(ColorsContext);
    const { isMobile } = useContext(SensorContext);
    const { push, previousUrl } = useRouter();

    return (
      <>
        <Switch
          isTrue={!isMobile}
          render={children => (
            <div className={styles.children}>
              <div className={`${showFooter ? styles.display : ''}`}>
                {children}
              </div>
              <div />
            </div>
          )}
        >
          <div className={styles.root}>
            <div
              onClick={() => {
                push(!previousUrl.startsWith('/checkout') ? previousUrl : '/');
              }}
            >
              <LeftOutlined />
              {t('go-back-to-store')}
            </div>

            <div
              className={`${styles.button} ${loading ? styles.disabled : ''}`}
              onClick={goToCheckout}
            >
              {t('go-to-checkout')}
            </div>
          </div>
        </Switch>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.display} {
                background-color: ${colors[0]};
                border-top: 1px solid ${colors[5]};
              }

              .${styles.root} {
                color: ${colors[3]};
                background-color: ${colors[0]};
              }

              .${styles.button} {
                color: ${colors[2]};
                background-color: ${colors[4]};
                box-shadow: 0 1px 5px 0 ${transformColor(colors[2]).alpha(0.2)};
              }
            `,
          }}
        />
      </>
    );
  },
);
