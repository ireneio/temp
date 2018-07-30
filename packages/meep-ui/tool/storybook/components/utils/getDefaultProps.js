import { EMPTY_ARRAY } from '../../../constants';

const getDefaultData = data => {
  if (data?.arrayOf) return EMPTY_ARRAY.map(() => getDefaultData(data.arrayOf));

  if (data instanceof Array) return getDefaultData(data[0]);

  if (data instanceof Object) {
    return Object.keys(data).reduce(
      (result, key) => ({
        ...result,
        [key]: getDefaultData(data[key]),
      }),
      {},
    );
  }

  return data;
};

export default getDefaultData;
