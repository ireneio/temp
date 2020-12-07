// typescript import
import { ApolloError } from 'apollo-client';

// import
import { useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';

// graphql typescript
import {
  fetchSmartConversionModuleGAData as fetchSmartConversionModuleGADataType,
  fetchSmartConversionModuleGADataVariables,
} from '../gqls/__generated__/fetchSmartConversionModuleGAData';
import {
  getSmartConversionModuleGAData as getSmartConversionModuleGADataType,
  getSmartConversionModuleGADataVariables,
} from '../gqls/__generated__/getSmartConversionModuleGAData';
import { getStoreTimeZone as getStoreTimeZoneType } from '../gqls/__generated__/getStoreTimeZone';
import { useSmartConversionModuleFragment } from '../gqls/__generated__/useSmartConversionModuleFragment';

// graphql import
import {
  fetchSmartConversionModuleGAData,
  getSmartConversionModuleGAData,
  getStoreTimeZone,
} from '../gqls/useSmartConversionModule';

// definition
export default ({
  isEnd,
  pageId,
}: {
  isEnd: boolean;
  pageId: string;
}): {
  loading: boolean;
  error?: ApolloError | boolean;
  smartConversionModule?: useSmartConversionModuleFragment | null;
  timezone: number;
} => {
  const { data } = useQuery<getStoreTimeZoneType>(getStoreTimeZone);
  const [query, queryResult] = useLazyQuery<
    getSmartConversionModuleGADataType,
    getSmartConversionModuleGADataVariables
  >(getSmartConversionModuleGAData);
  const [mutate, mutationResult] = useMutation<
    fetchSmartConversionModuleGADataType,
    fetchSmartConversionModuleGADataVariables
  >(fetchSmartConversionModuleGAData);
  const timezone = parseInt(data?.viewer?.store?.timezone || '+8', 10);

  useEffect(() => {
    if (isEnd) {
      query({ variables: { pageId } });
    } else {
      mutate({ variables: { pageId } });
    }
  }, [query, mutate, isEnd, pageId]);

  return isEnd
    ? {
        loading: queryResult.loading,
        error: queryResult.error,
        smartConversionModule:
          queryResult.data?.viewer?.store?.page?.smartConversionModule,
        timezone,
      }
    : {
        loading: mutationResult.loading,
        error: mutationResult.error,
        smartConversionModule:
          mutationResult.data?.fetchSmartConversionModuleGAData
            .smartConversionModule,
        timezone,
      };
};
