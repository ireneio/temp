// typescript import
import { Resolvers } from '@apollo/client';

// definition
export default (prevResolvers: Resolvers, newResolvers: Resolvers): Resolvers =>
  Object.keys(newResolvers).reduce(
    (result: Resolvers, key: string) => ({
      ...result,
      [key]: Object.keys(newResolvers[key]).reduce(
        (fieldResult: Resolvers[string], field: string) => ({
          ...fieldResult,
          [field]: !fieldResult?.[field]
            ? newResolvers[key][field]
            : (...argu) => {
                const prevData = fieldResult[field](...argu);
                const newData = newResolvers[key][field](...argu);

                if (!prevData || !newData) return null;

                if (prevData instanceof Array && newData instanceof Array)
                  return (prevData.length > newData.length
                    ? prevData
                    : newData
                  ).map((_, index) => ({
                    ...prevData[index],
                    ...newData[index],
                  }));

                return {
                  ...prevData,
                  ...newData,
                };
              },
        }),
        result[key],
      ),
    }),
    prevResolvers,
  );
