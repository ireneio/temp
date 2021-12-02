// typescript import
import { DataProxy } from '@apollo/client';
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  createProductQA as createProductQAType,
  createProductQAVariables,
  useCreateProductQAFragment as useCreateProductQAFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  createProductQA,
  useCreateProductQAFragment,
} from '../gqls/useCreateProductQA';

// typescript definition
interface ValuesType {
  userEmail?: string;
  question: string;
}

// definition
export default (
  product: useCreateProductQAFragmentType | null,
  { resetFields }: FormInstance,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('product-qa');
  const [mutation] = useMutation<createProductQAType, createProductQAVariables>(
    createProductQA,
    {
      update: (cache: DataProxy, { data }: { data: createProductQAType }) => {
        if (!data.createProductQA) {
          message.error(t('can-not-send'));
          return;
        }

        if (!product?.id) return;

        cache.writeFragment<useCreateProductQAFragmentType>({
          id: product.id,
          fragment: useCreateProductQAFragment,
          data: {
            __typename: 'Product',
            id: product.id,
            publicViewableQas: [
              ...data.createProductQA,
              ...product.publicViewableQas,
            ],
          },
        });
        resetFields();
      },
    },
  );

  return useCallback(
    ({ userEmail, question }) => {
      if (!product?.id) return;

      mutation({
        variables: {
          createProductQA: [
            {
              productId: product.id,
              qa: [
                {
                  question,
                },
              ],
              ...(!userEmail ? {} : { userEmail }),
            },
          ],
        },
      });
    },
    [product, mutation],
  );
};
