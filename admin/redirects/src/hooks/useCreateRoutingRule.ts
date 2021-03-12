// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { useMutation } from '@apollo/react-hooks';

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
  validateFields: FormComponentProps['form']['validateFields'];
}

// definition
export default ({
  user,
  setShowModal,
  validateFields,
}: UseCreateRoutingRuleType): (() => void) => {
  const { t } = useTranslation('redirects');
  const [mutation] = useMutation<
    createRoutingRuleType,
    createRoutingRuleVariablesType
  >(createRoutingRule);

  return useCallback(() => {
    validateFields((err, { fromPath, toPath }) => {
      if (err) return;

      mutation({
        variables: {
          input: { fromPath, toPath },
        },
        update: (cache, { data }) => {
          const storeId = user?.id;

          if (data?.createRoutingRule.status !== 'OK') {
            message.error(t(data?.createRoutingRule.status || 'fail'));
            return;
          }

          if (!storeId || !data?.createRoutingRule.routingRule) return;

          cache.writeFragment<useCreateRoutingRuleFragmentType>({
            id: storeId,
            fragment: useCreateRoutingRuleFragment,
            data: {
              __typename: 'Store',
              id: storeId,
              routingRules: [
                {
                  __typename: 'RoutingRule',
                  id: data.createRoutingRule.routingRule.id,
                  fromPath,
                  toPath,
                },
                ...(user?.routingRules || []),
              ],
            },
          });

          message.success(t('save-success'));
          setShowModal(false);
        },
      });
    });
  }, [mutation, setShowModal, t, validateFields, user]);
};
