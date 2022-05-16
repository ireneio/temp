// typescript import
import { TagType } from '../constants';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import message from '@admin/message';

// graphql typescript
import {
  batchUpdateOrderTag as batchUpdateOrderTagType,
  batchUpdateOrderTagVariables as batchUpdateOrderTagVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { batchUpdateOrderTag } from '../gqls/useSaveTags';

// typescript definition
interface PropsType {
  orderIds: string[];
  onClose: () => void;
  orderTagNamesToAdd: string[];
  orderTagIdsToRemove: TagType[];
}

// definition
export default ({
  orderIds,
  onClose,
  orderTagNamesToAdd,
  orderTagIdsToRemove,
}: PropsType): (() => void) => {
  const { t } = useTranslation('orders-tag');
  const [mutation] = useMutation<
    batchUpdateOrderTagType,
    batchUpdateOrderTagVariablesType
  >(batchUpdateOrderTag, {
    onCompleted: ({ batchUpdateOrderTag: { status } }) => {
      switch (status) {
        case 'FAIL_BLANK_TAG_NAME':
          Modal.error({
            title: t('fail'),
            content: t('empty-tag-error'),
          });
          break;

        case 'FAIL_TAG_NAME_TOO_LONG':
          Modal.error({
            title: t('fail'),
            content: t('tag-too-long-error'),
          });
          break;

        default:
          message.success(t('save-success'));
          onClose();
          break;
      }
    },
  });

  return useCallback(() => {
    mutation({
      variables: {
        input: {
          orderIds,
          orderTagNamesToAdd,
          orderTagIdsToRemove: orderTagIdsToRemove.map(({ id }) => id),
        },
      },
    });
  }, [mutation, orderIds, orderTagIdsToRemove, orderTagNamesToAdd]);
};
