import combinatorics from 'js-combinatorics';
import { sampleSize } from 'lodash';

import { EMPTY_ARRAY } from '../../constants';

const buildTestData = testData => {
  if (testData?.arrayOf) {
    const newData = buildTestData(testData.arrayOf);

    return [
      newData instanceof Array ? newData : EMPTY_ARRAY.map(() => newData),
    ];
  }

  if (testData?.isTesting) return buildTestData(testData.isTesting());

  if (testData instanceof Array) {
    return testData.reduce((result, data) => {
      const newData = buildTestData(data);

      return [...result, ...(newData instanceof Array ? newData : [newData])];
    }, []);
  }

  if (testData instanceof Object) {
    const dataArray = Object.keys(testData).map(
      key =>
        testData[key] instanceof Object || testData?.arrayOf
          ? buildTestData(testData[key])
          : [testData[key]],
    );

    if (dataArray.length === 0) return {};

    return combinatorics
      .cartesianProduct(...dataArray)
      .toArray()
      .map(data =>
        Object.keys(testData).reduce(
          (result, key, index) => ({
            ...result,
            [key]: data[index],
          }),
          {},
        ),
      );
  }

  return testData;
};

/** get random 100 testData */
export default testData => sampleSize(buildTestData(testData), 100);
