// import
import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
} from 'bizcharts';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import styles from './styles/chart.less';
import useColoredSamples from './hooks/useColoredSamples';

// graphql typescript
import { fetchSmartConversionModuleGAData_fetchSmartConversionModuleGAData_smartConversionModule_samples as fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  samples: fetchSmartConversionModuleGADataFetchSmartConversionModuleGADataSmartConversionModuleSamples[];
}

// definition
export default ({ samples }: PropsType): React.ReactElement => {
  const { t } = useTranslation('smart-conversion-analysis');
  const coloredSamples = useColoredSamples(samples);

  return (
    <div className={styles.root}>
      <span>
        {t('transaction-ratio')}
        <br />
        {t('pie-chart')}
      </span>
      <div>
        <Chart
          height={400}
          data={coloredSamples}
          scale={{
            transactionPercentage: {
              formatter: (val: number) => {
                return `${val}%`;
              },
            },
          }}
          autoFit
          padding={24}
        >
          <Coordinate type="theta" radius={0.75} />
          <Tooltip visible={false} />
          <Axis visible={false} />
          <Interval
            position="transactionPercentage"
            adjust="stack"
            color={[
              'name',
              value =>
                coloredSamples.find(sample => sample.name === value)?.color ||
                '',
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
            label={[
              'name',
              {
                offset: 30,
                content: sample => {
                  return `${
                    sample.name
                  }\n${sample.transactionPercentage.toFixed(2)}%`;
                },
                style: {
                  fontSize: 16,
                },
                labelLine: {
                  style: {
                    length: 20,
                  },
                },
              },
            ]}
          />
          <Interaction type="element-single-selected" />
        </Chart>
      </div>
    </div>
  );
};
