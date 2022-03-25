// typescript import
import { ValuesType } from '../constants';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateRoutingRule as updateRoutingRuleType,
  updateRoutingRuleVariables as updateRoutingRuleVariablesType,
  useUpdateRoutingRuleFragment as useUpdateRoutingRuleFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  updateRoutingRule,
  useUpdateRoutingRuleFragment,
} from '../gqls/useUpdateRoutingRule';

// typescript definition
interface UseUpdateRoutingRuleType {
  id: string | undefined;
  setShowModal: (showModal: boolean) => void;
}

// definition
export default ({
  id,
  setShowModal,
}: UseUpdateRoutingRuleType): ((values: ValuesType) => void) => {
  const { t } = useTranslation('setting-redirects');
  const [mutation] = useMutation<
    updateRoutingRuleType,
    updateRoutingRuleVariablesType
  >(updateRoutingRule);

  return useCallback(
    input => {
      if (!id) return;

      mutation({
        variables: { input: { ...input, id } },
        update: (cache, { data }) => {
          if (data?.updateRoutingRule.status !== 'OK') {
            message.error(t(data?.updateRoutingRule.status || 'fail'));
            return;
          }

          cache.writeFragment<useUpdateRoutingRuleFragmentType>({
            id,
            fragment: useUpdateRoutingRuleFragment,
            data: {
              ...input,
              __typename: 'RoutingRule',
              id,
            },
          });

          message.success(t('save-success'));
          setShowModal(false);
        },
      });
    },
    [mutation, setShowModal, t, id],
  );
};
