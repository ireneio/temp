// import
import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { useNetworkStatus } from 'react-adaptive-hooks';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  formDataFragment as formDataFragmentType,
  formDataFragment_params as formDataFragmentParams,
  log as logType,
  logVariables,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// typescript definition
type formDataType = (formData: formDataFragmentType | null) => void;

// definition
const FormDataContext = React.createContext<formDataType>(emptyFunction);

export const FormDataProvider = React.memo(({ children }) => {
  const [formData, setFormData] = useState<formDataFragmentType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { effectiveConnectionType } = useNetworkStatus();
  const [mutation, { client }] = useMutation<logType, logVariables>(log, {
    onCompleted: () => {
      if (formRef.current) {
        if (client) client.stop();

        formRef.current.submit();
      }
    },
  });

  useEffect(() => {
    if (formData?.type === 'GET') window.location.href = formData.url || '';
    if (formRef.current)
      mutation({
        variables: {
          input: {
            type: 'INFO' as LogTypeEnum,
            name: 'CREATE_ORDER_FORM_DATA' as LogNameEnum,
            data: {
              formData,
              effectiveConnectionType,
            },
          },
        },
      });
  }, [formData, effectiveConnectionType, mutation]);

  return (
    <FormDataContext.Provider value={setFormData}>
      {!formData?.params || !formData.url ? null : (
        <form
          ref={formRef}
          method="POST"
          action={formData.url}
          acceptCharset={/hitrust/.test(formData.url) ? 'big5' : 'utf8'}
        >
          {Object.keys(formData.params).map(key => {
            const value =
              formData.params?.[key as keyof formDataFragmentParams];

            if (key === '__typename' || !value) return null;

            return (
              <input
                key={key}
                name={key}
                value={value}
                type="hidden"
                readOnly
              />
            );
          })}
        </form>
      )}

      {children}
    </FormDataContext.Provider>
  );
});

export default FormDataContext;
