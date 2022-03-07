// import
import { useState, useEffect, useCallback } from 'react';
import { useMutation, useLazyQuery, useApolloClient } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  useSetGAViewIdFragment as useSetGAViewIdFragmentType,
  requestSetGAViewIdProcessorService as requestSetGAViewIdProcessorServiceType,
  requestSetGAViewIdProcessorServiceVariables as requestSetGAViewIdProcessorServiceVariablesType,
  requestSetGAViewId as requestSetGAViewIdType,
  requestSetGAViewIdVariables as requestSetGAViewIdVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  requestSetGAViewId,
  requestSetGAViewIdProcessorService,
  useSetGAViewIdFragment,
} from '../gqls/useSetGaViewId';

// definition
export default (
  storeId: string,
): {
  setGaViewId: (gaViewId: string | null) => Promise<void>;
  processorStatus?: string | null;
} => {
  const { t } = useTranslation('setting-third-party');
  const [loading, setLoading] = useState(false);
  const [setGaViewId, setGaViewIdResult] = useMutation<
    requestSetGAViewIdType,
    requestSetGAViewIdVariablesType
  >(requestSetGAViewId);
  const [
    queryService,
    { data, error, startPolling, stopPolling },
  ] = useLazyQuery<
    requestSetGAViewIdProcessorServiceType,
    requestSetGAViewIdProcessorServiceVariablesType
  >(requestSetGAViewIdProcessorService);
  const client = useApolloClient();
  const status = data?.smartConversionModuleProcessorService.status;
  const result = data?.smartConversionModuleProcessorService.result;
  const gaViewId = data?.smartConversionModuleProcessorService.gaViewId || null;
  const key = setGaViewIdResult.data?.requestSetGAViewId.queryId;

  useEffect(() => {
    if (!key || loading) return () => stopPolling?.();

    if (status === 'PROCESSING') {
      message.loading({
        content: t('gaViewId.validating'),
        key,
        duration: 0,
      });
      if (startPolling) startPolling(1000);
    }

    if (status === 'DONE' && result === 'OK')
      message.success({ content: t('gaViewId.success'), key });

    if ((status === 'DONE' && result !== 'OK') || error) {
      message.error({ content: t('gaViewId.error'), key });
      client.writeFragment<useSetGAViewIdFragmentType>({
        id: storeId,
        fragment: useSetGAViewIdFragment,
        data: {
          __typename: 'Store',
          id: storeId,
          gaViewId,
        },
      });
    }

    return () => stopPolling?.();
  }, [
    storeId,
    client,
    t,
    status,
    result,
    gaViewId,
    startPolling,
    stopPolling,
    error,
    key,
    loading,
  ]);

  return {
    setGaViewId: useCallback(
      async (newGaViewId: string) => {
        setLoading(true);

        const executionResult = await setGaViewId({
          variables: {
            gaViewId: newGaViewId,
          },
          update: cache => {
            cache.writeFragment<useSetGAViewIdFragmentType>({
              id: storeId,
              fragment: useSetGAViewIdFragment,
              data: {
                __typename: 'Store',
                id: storeId,
                gaViewId: newGaViewId,
              },
            });
          },
        });
        const queryId = executionResult.data?.requestSetGAViewId.queryId;

        if (queryId) queryService({ variables: { queryId } });

        setLoading(false);
      },
      [storeId, setGaViewId, queryService],
    ),
    processorStatus: status,
  };
};
