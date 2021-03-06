// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from 'antd';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  deleteRoutingRule as deleteRoutingRuleType,
  deleteRoutingRuleVariables as deleteRoutingRuleVariablesType,
  useDeleteRoutingRuleFragment as useDeleteRoutingRuleFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  deleteRoutingRule,
  useDeleteRoutingRuleFragment,
} from '../gqls/useDeleteRoutingRule';

// definition
export default (
  user: useDeleteRoutingRuleFragmentType | null,
): ((input: deleteRoutingRuleVariablesType['input']) => void) => {
  const { t } = useTranslation('setting-redirects');

  const [mutation] = useMutation<
    deleteRoutingRuleType,
    deleteRoutingRuleVariablesType
  >(deleteRoutingRule);

  return useCallback(
    (input: deleteRoutingRuleVariablesType['input']) => {
      Modal.confirm({
        title: t('actions.delete-confirm-title'),
        content: t('actions.delete-confirm-content'),
        cancelText: t('actions.delete-confirm-cancel'),
        okText: t('actions.delete-confirm-delete'),
        okType: 'danger',
        centered: true,
        onOk: () =>
          mutation({
            variables: { input },
            update: (cache, { data }) => {
              const storeId = user?.id;

              if (data?.deleteRoutingRule.status !== 'OK') {
                message.error(t(data?.deleteRoutingRule.status || 'fail'));
                return;
              }

              if (!storeId) return;

              cache.writeFragment<useDeleteRoutingRuleFragmentType>({
                id: storeId,
                fragment: useDeleteRoutingRuleFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  routingRules: (user?.routingRules || []).filter(
                    routingRule => routingRule?.id !== input.id,
                  ),
                },
              });

              message.success(t('delete-success'));
            },
          }),
      });
    },
    [mutation, t, user],
  );
};
