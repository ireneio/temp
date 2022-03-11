// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import message from '@admin/message';

// graphql typescript
import {
  deleteAffiliateProgram as deleteAffiliateProgramType,
  deleteAffiliateProgramVariables as deleteAffiliateProgramVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { deleteAffiliateProgram } from '../gqls/useDeleteProgram';

// definition
export default (affiliateProgramId: string): (() => void) => {
  const { t } = useTranslation('affiliate-program');
  const router = useRouter();
  const [mutation] = useMutation<
    deleteAffiliateProgramType,
    deleteAffiliateProgramVariablesType
  >(deleteAffiliateProgram, {
    update: (_: DataProxy, { data }) => {
      if (data?.deleteAffiliateProgram.__typename !== 'OkResponse') return;

      // TODO: should remove program in cache
      message.success(t('delete.success'));
      router.replace('/affiliate/programs');
    },
  });

  return useCallback(() => {
    Modal.warning({
      title: t('delete.title'),
      content: t('delete.content'),
      okText: t('delete.ok'),
      onOk: async close => {
        await mutation({
          variables: {
            input: { id: affiliateProgramId },
          },
        });
        close();
      },
    });
  }, [affiliateProgramId, t, mutation]);
};
