// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  createProductQA as createProductQAType,
  createProductQAVariables,
} from '../gqls/__generated__/createProductQA';
import { useCreateProductQAFragment as useCreateProductQAFragmentType } from '../gqls/__generated__/useCreateProductQAFragment';

// graphql import
import {
  createProductQA,
  useCreateProductQAFragment,
} from '../gqls/useCreateProductQA';

// definition
export default (
  product: useCreateProductQAFragmentType | null,
  resetFields: () => void,
): MutationTuple<createProductQAType, createProductQAVariables>[0] => {
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

  return mutation;
};
