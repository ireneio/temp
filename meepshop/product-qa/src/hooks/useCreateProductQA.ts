// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { productQaFragment_product_publicViewableQas as productQaFragmentProductPublicViewableQas } from '../__generated__/productQaFragment';
import {
  createProductQA as createProductQAType,
  createProductQAVariables as createProductQAVariablesType,
} from './__generated__/createProductQA';

export default ({
  resetFields,
  publicViewableQas,
  setPublicViewableQas,
}: {
  resetFields: () => void;
  publicViewableQas: (productQaFragmentProductPublicViewableQas | null)[];
  setPublicViewableQas: (
    publicViewableQas: (productQaFragmentProductPublicViewableQas | null)[],
  ) => void;
}): {
  createProductQA: (input: createProductQAVariablesType) => void;
} => {
  const { t } = useTranslation('product-qa');

  const [createProductQA] = useMutation<createProductQAType>(
    gql`
      mutation createProductQA($createProductQA: [NewProductQA]) {
        createProductQA(createProductQA: $createProductQA) {
          id
          userEmail
          qa {
            id
            question
            createdAt
          }
        }
      }
    `,
    {
      onCompleted: data => {
        if (data?.createProductQA) {
          resetFields();
          setPublicViewableQas([...data.createProductQA, ...publicViewableQas]);
        } else message.error(t('can-not-send'));
      },
    },
  );

  return {
    createProductQA: useCallback(
      (input: createProductQAVariablesType) => {
        createProductQA({
          variables: input,
        });
      },
      [createProductQA],
    ),
  };
};
