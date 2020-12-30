// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { message } from 'antd';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateRoutingRule as updateRoutingRuleType,
  updateRoutingRuleVariables as updateRoutingRuleVariablesType,
} from '../gqls/__generated__/updateRoutingRule';
import { useUpdateRoutingRuleFragment as useUpdateRoutingRuleFragmentType } from '../gqls/__generated__/useUpdateRoutingRuleFragment';

// graphql import
import {
  updateRoutingRule,
  useUpdateRoutingRuleFragment,
} from '../gqls/useUpdateRoutingRule';

// typescript definition
interface UseUpdateRoutingRuleType {
  id: string | undefined;
  setShowModal: (showModal: boolean) => void;
  validateFields: FormComponentProps['form']['validateFields'];
}

// definition
export default ({
  id,
  setShowModal,
  validateFields,
}: UseUpdateRoutingRuleType): (() => void) => {
  const { t } = useTranslation('redirects');

  const [mutation] = useMutation<
    updateRoutingRuleType,
    updateRoutingRuleVariablesType
  >(updateRoutingRule);

  return useCallback(() => {
    validateFields((err, { fromPath, toPath }) => {
      if (err || !id) return;

      mutation({
        variables: { input: { id, fromPath, toPath } },
        update: (cache, { data }) => {
          if (data?.updateRoutingRule.status !== 'OK') {
            message.error(t(data?.updateRoutingRule.status || 'fail'));
            return;
          }

          cache.writeFragment<useUpdateRoutingRuleFragmentType>({
            id,
            fragment: useUpdateRoutingRuleFragment,
            data: {
              __typename: 'RoutingRule',
              id,
              fromPath,
              toPath,
            },
          });

          message.success(t('save-success'));
          setShowModal(false);
        },
      });
    });
  }, [mutation, setShowModal, t, validateFields, id]);
};
