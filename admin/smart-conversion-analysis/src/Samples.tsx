// import
import React from 'react';

import { placeholderImage, smartConversionBest } from '@meepshop/images';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/samples.less';

// graphql typescript
import { fetchSmartConversionModuleGAData_fetchSmartConversionModuleGAData_smartConversionModule_samples as fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  samples: fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples[];
}

// definition
export default ({ samples }: PropsType): React.ReactElement => {
  const { t } = useTranslation('smart-conversion-analysis');
  const best = samples.reduce((prev, current) =>
    prev.conversionRate >= current.conversionRate ? prev : current,
  );

  return (
    <div className={styles.root}>
      <span>{t('sample')}</span>
      <div>
        {samples.map(
          ({ eventName, image, transactionCount, conversionRate }, index) => {
            const isTheBest = eventName === best.eventName;
            return (
              <div className={styles.sample} key={eventName}>
                {!isTheBest ? null : (
                  <h1>
                    <img src={smartConversionBest} alt="best" />
                    <span>{t('best-converison')}</span>
                  </h1>
                )}
                <h2>{`${t('sample-no')}${index + 1}`}</h2>
                <div className={styles.image}>
                  <div
                    style={{
                      backgroundImage: `url(${image?.scaledSrc?.w480 ||
                        placeholderImage})`,
                    }}
                  />
                </div>
                <span>{t('event-name')}</span>
                <p>{eventName}</p>
                <span>{t('transaction')}</span>
                <p>
                  {t('transaction-unit', { transaction: transactionCount })}
                </p>
                <span>{t('conversion')}</span>
                <p
                  className={isTheBest ? styles.best : ''}
                >{`${conversionRate.toFixed(2)}%`}</p>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
};
