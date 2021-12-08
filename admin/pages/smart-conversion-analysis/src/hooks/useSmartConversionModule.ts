// typescript import
import { ApolloError } from '@apollo/client';

// import
import { useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';

// graphql typescript
import {
  getSmartConversionModuleGAData as getSmartConversionModuleGADataType,
  getSmartConversionModuleGADataVariables,
  requestFetchSmartConversionModuleGAData as requestFetchSmartConversionModuleGADataType,
  requestFetchSmartConversionModuleGADataVariables,
  smartConversionModuleProcessorService as smartConversionModuleProcessorServiceType,
  smartConversionModuleProcessorServiceVariables,
  useSmartConversionModuleFragment,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  requestFetchSmartConversionModuleGAData,
  getSmartConversionModuleGAData,
  smartConversionModuleProcessorService,
} from '../gqls/useSmartConversionModule';

// typescript definition
interface ReturnType {
  loading: boolean;
  error?: ApolloError | boolean;
  isServiceUndone: boolean;
  smartConversionModule?: useSmartConversionModuleFragment | null;
  timezone: number;
}

// definition
export default ({ pageId }: { pageId: string }): ReturnType => {
  const queryFromPage = useQuery<
    getSmartConversionModuleGADataType,
    getSmartConversionModuleGADataVariables
  >(getSmartConversionModuleGAData, {
    variables: { pageId },
  });
  const [initService, { loading, error }] = useMutation<
    requestFetchSmartConversionModuleGADataType,
    requestFetchSmartConversionModuleGADataVariables
  >(requestFetchSmartConversionModuleGAData, {
    variables: {
      pageId,
    },
  });
  const [queryService, queryFromService] = useLazyQuery<
    smartConversionModuleProcessorServiceType,
    smartConversionModuleProcessorServiceVariables
  >(smartConversionModuleProcessorService);

  const timezone = parseInt(
    queryFromPage.data?.viewer?.store?.timezone || '+8',
    10,
  );
  const isOnGoing =
    queryFromPage.data?.viewer?.store?.page?.smartConversionModule?.status ===
    'ONGOING';

  useEffect(() => {
    if (isOnGoing)
      initService().then(result => {
        const queryId =
          result.data?.requestFetchSmartConversionModuleGAData.queryId;
        if (queryId) queryService({ variables: { queryId } });
      });
  }, [pageId, isOnGoing, initService, queryService]);

  useEffect(() => {
    if (
      queryFromService.data?.smartConversionModuleProcessorService.status ===
      'PROCESSING'
    )
      queryFromService.startPolling(1000);

    return () => queryFromService.stopPolling?.();
  }, [queryFromService]);

  return {
    loading: queryFromPage.loading || loading || queryFromService.loading,
    error: queryFromPage.error || error || queryFromService.error,
    isServiceUndone:
      isOnGoing &&
      queryFromService.data?.smartConversionModuleProcessorService.status !==
        'DONE',
    smartConversionModule:
      queryFromPage.data?.viewer?.store?.page?.smartConversionModule,
    timezone,
  };
};
