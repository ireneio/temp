// typescript import
import { ValuesType } from '../types';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  createRoutingRule as createRoutingRuleType,
  createRoutingRuleVariables as createRoutingRuleVariablesType,
  useCreateRoutingRuleFragment as useCreateRoutingRuleFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  createRoutingRule,
  useCreateRoutingRuleFragment,
} from '../gqls/useCreateRoutingRule';

// typescript definition
interface UseCreateRoutingRuleType {
  user: useCreateRoutingRuleFragmentType | null;
  setShowModal: (showModal: boolean) => void;
}

// definition
export default ({
  user,
  setShowModal,
}: UseCreateRoutingRuleType): ((values: ValuesType) => void) => {
  const { t } = useTranslation('setting-redirects');
  const [mutation] = useMutation<
    createRoutingRuleType,
    createRoutingRuleVariablesType
  >(createRoutingRule);

  return useCallback(
    input => {
      mutation({
        variables: {
          input,
        },
        update: (cache, { data }) => {
          const userId = user?.id;

          if (data?.createRoutingRule.status !== 'OK') {
            message.error(t(data?.createRoutingRule.status || 'fail'));
            return;
          }

          if (!userId || !data?.createRoutingRule.routingRule) return;

          cache.writeFragment<useCreateRoutingRuleFragmentType>({
            id: userId,
            fragment: useCreateRoutingRuleFragment,
            data: {
              __typename: 'Store',
              id: userId,
              routingRules: [
                {
                  ...input,
                  __typename: 'RoutingRule',
                  id: data.createRoutingRule.routingRule.id,
                },
                ...(user?.routingRules || []),
              ],
            },
          });

          message.success(t('save-success'));
          setShowModal(false);
        },
      });
    },
    [mutation, setShowModal, t, user],
  );
};
