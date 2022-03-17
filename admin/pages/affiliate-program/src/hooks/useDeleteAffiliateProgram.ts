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
  useDeleteAffiliateProgramFragment as useDeleteAffiliateProgramFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  deleteAffiliateProgram,
  useDeleteAffiliateProgramFragment,
} from '../gqls/useDeleteAffiliateProgram';

// definition
export default (
  affiliateProgramId: string,
  viewer: useDeleteAffiliateProgramFragmentType | null,
): (() => void) => {
  const { t } = useTranslation('affiliate-program');
  const router = useRouter();
  const [mutation] = useMutation<
    deleteAffiliateProgramType,
    deleteAffiliateProgramVariablesType
  >(deleteAffiliateProgram, {
    update: (cache, { data }) => {
      if (data?.deleteAffiliateProgram.__typename !== 'OkResponse') return;

      if (viewer?.id)
        cache.writeFragment<useDeleteAffiliateProgramFragmentType>({
          id: viewer.id,
          fragment: useDeleteAffiliateProgramFragment,
          data: {
            ...viewer,
            affiliatePrograms: !viewer.affiliatePrograms
              ? null
              : {
                  ...viewer.affiliatePrograms,
                  edges: viewer.affiliatePrograms.edges.filter(
                    ({ node }) => node.id !== affiliateProgramId,
                  ),
                  total: viewer.affiliatePrograms.total - 1,
                },
          },
        });

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
