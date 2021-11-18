// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/index.less';
import { STEPS } from './constants';

// graphql typescript
import { getStoreLogo as getStoreLogoType } from '@meepshop/types/gqls/store';

// graphql import
import { getStoreLogo } from './gqls';

// typescript definition
interface PropsType {
  step: typeof STEPS[number];
}

// definition
export default React.memo(({ step }: PropsType) => {
  const colors = useContext(ColorsContext);
  const { t } = useTranslation('checkout-steps');
  const { data } = useQuery<getStoreLogoType>(getStoreLogo);
  const phase = STEPS.indexOf(step);

  return (
    <>
      <div className={styles.root}>
        <div className={styles.logo}>
          {!data?.viewer?.store?.logoImage?.scaledSrc?.w240 ? null : (
            <img
              src={data.viewer.store.logoImage.scaledSrc.w240}
              alt="checkout-steps-logo"
            />
          )}
        </div>

        <div className={styles.steps}>
          {STEPS.map((title, index) => (
            <div
              key={title}
              className={index > phase ? styles.undone : styles.done}
            >
              <div>{index + 1}</div>
              <div>{t(title)}</div>
            </div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.steps} > div > div:first-child::before {
              background-color: ${colors[3]};
            }

            .${styles.steps} > div > div:last-child {
              color: ${colors[3]};
            }

            .${styles.done} > div:first-child {
              color: ${colors[0]};
              border-color: ${colors[3]};
              background-color: ${colors[3]};
            }

            .${styles.undone} > div:first-child {
              color: ${transformColor(colors[3]).alpha(0.3)};
              border-color: ${transformColor(colors[3]).alpha(0.2)};
              background-color: ${colors[0]};
            }
          `,
        }}
      />
    </>
  );
});
