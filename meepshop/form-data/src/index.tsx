// import
import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useNetworkStatus } from 'react-adaptive-hooks';
import { emptyFunction } from 'fbjs';

// graphql typescript
import {
  formDataFragment as formDataFragmentType,
  formDataFragment_params as formDataFragmentParams,
} from './gqls/__generated__/formDataFragment';

// graphql typescript
import { LogTypeEnum } from '../../../__generated__/meepshop';
import {
  logFormData as logFormDataType,
  logFormDataVariables,
} from './gqls/__generated__/logFormData';

// graphql import
import { logFormData } from './gqls';

// typescript definition
type formDataType = (formData: formDataFragmentType | null) => void;

// definition
const FormDataContext = React.createContext<formDataType>(emptyFunction);

export const FormDataProvider = React.memo(({ children }) => {
  const [formData, setFormData] = useState<formDataFragmentType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { effectiveConnectionType } = useNetworkStatus();
  const [mutation] = useMutation<logFormDataType, logFormDataVariables>(
    logFormData,
    {
      onCompleted: () => {
        if (formRef.current) formRef.current.submit();
      },
    },
  );

  useEffect(() => {
    if (formData?.type === 'GET') window.location.href = formData.url || '';
    if (formRef.current)
      mutation({
        variables: {
          input: {
            type: 'CREATE_ORDER_FORM_DATA' as LogTypeEnum,
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
