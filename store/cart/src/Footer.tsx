// import
import React, { useContext, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import transformColor from 'color';
import VisibilitySensor from 'react-visibility-sensor';

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
  scrollToError: () => void;
}

// definition
export default React.memo(({ scrollToError }: PropsType) => {
  const { t } = useTranslation('cart');
  const colors = useContext(ColorsContext);
  const { isMobile } = useContext(SensorContext);
  const { push } = useRouter();
  const [display, setDisplay] = useState<boolean>(false);

  return (
    <>
      <Switch
        isTrue={!isMobile}
        render={children => (
          <VisibilitySensor
            active={!display}
            offset={{ bottom: -120 }}
            onChange={isVisible => {
              if (isVisible) setDisplay(true);
            }}
            partialVisibility
          >
            <div className={styles.children}>
              <div className={`${display ? styles.display : ''}`}>
                {children}
              </div>
              <div />
            </div>
          </VisibilitySensor>
        )}
      >
        <div className={styles.root}>
          <div
            onClick={() => {
              // FIXME: T10267
              const url = window.storePreviousPageUrl || '/';
              push(!url.startsWith('/checkout') ? url : '/');
            }}
          >
            <LeftOutlined />
            {t('go-back-to-store')}
          </div>

          <div className={styles.button} onClick={scrollToError}>
            {t('go-to-checkout')}
          </div>
        </div>
      </Switch>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.display} {
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
});
