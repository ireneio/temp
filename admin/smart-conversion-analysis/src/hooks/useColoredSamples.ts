// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

import { COLORS } from '../constants';

// graphql typescript
import { fetchSmartConversionModuleGAData_fetchSmartConversionModuleGAData_smartConversionModule_samples as fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples } from '@meepshop/types/gqls/admin';

// typescript definition
interface ModifiedSample {
  transactionPercentage: number;
  color: string;
  name: string;
}

// definition
export default (
  samples: fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples[],
): ModifiedSample[] => {
  const { t } = useTranslation('smart-conversion-analysis');

  return useMemo(() => {
    const sortedSamples = samples
      .map((sample, index) => ({ ...sample, index }))
      .sort((a, b) => b.transactionCount - a.transactionCount);
    return samples.map(({ transactionPercentage }, index) => ({
      transactionPercentage,
      name: `${t('sample-no')}${index + 1}`,
      color:
        COLORS[sortedSamples.findIndex(_sample => _sample.index === index)],
    }));
  }, [samples, t]);
};
