// typescript import
import { ValuesType as InitialValuesType } from './useInitialValues';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  sendNewsLetter as sendNewsLetterType,
  sendNewsLetterVariables as sendNewsLetterVariablesType,
  updateNewsLetterList as updateNewsLetterListType,
  updateNewsLetterListVariables as updateNewsLetterListVariablesType,
  useSaveNewsLetterFragment as useSaveNewsLetterFragmentType,
  useSaveGetNewsLetterList as useSaveGetNewsLetterListType,
  useSaveGetNewsLetterListVariables as useSaveGetNewsLetterListVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  sendNewsLetter,
  updateNewsLetterList,
  useSaveNewsLetterFragment,
  useSaveGetNewsLetterList,
} from '../gqls/useSave';

// typescript definition
interface ValuesType extends InitialValuesType {
  sendNow?: boolean;
}

// definition
export default (
  id: string,
  isNew: boolean,
): {
  loading: boolean;
  save: (values: ValuesType) => void;
} => {
  const [sendMutation, { loading: sendMutationLoading }] = useMutation<
    sendNewsLetterType,
    sendNewsLetterVariablesType
  >(sendNewsLetter);

  const [mutation, { loading }] = useMutation<
    updateNewsLetterListType,
    updateNewsLetterListVariablesType
  >(updateNewsLetterList);

  return {
    loading: loading || sendMutationLoading,
    save: useCallback(
      async values => {
        const value = {
          subject: values.subject,
          template: (values.template?.toHTML() || '').replace(
            /<p[\s\w=\-:;"]*><\/p>/g,
            '<p style="height:22px"></p>',
          ),
          toUsers: {
            filter: {
              and:
                values.groupId !== 'all-total-member'
                  ? [
                      {
                        type: 'exact',
                        field: 'groupId',
                        ...(values.groupId ? { query: values.groupId } : {}),
                      },
                    ]
                  : [],
            },
          },
        };

        await mutation({
          variables: {
            isNew,
            createNewsLetterList: [value],
            updateNewsLetterList: [
              {
                id,
                ...value,
              },
            ],
          },
          update: async (cache, { data }) => {
            const newsLetter =
              data?.[
                isNew ? 'createNewsLetterList' : 'updateNewsLetterList'
              ]?.[0];
            const newsLetterId = newsLetter?.id;

            if (!newsLetter || !newsLetterId) return;

            if (isNew) {
              cache.writeQuery<
                useSaveGetNewsLetterListType,
                useSaveGetNewsLetterListVariablesType
              >({
                query: useSaveGetNewsLetterList,
                data: {
                  getNewsLetterList: {
                    __typename: 'NewsLetterInfoList',
                    data: [newsLetter],
                  },
                },
              });
            } else {
              cache.writeFragment<useSaveNewsLetterFragmentType>({
                id: newsLetterId,
                fragment: useSaveNewsLetterFragment,
                data: newsLetter,
              });
            }

            if (values.sendNow)
              await sendMutation({
                variables: {
                  sendNewsLetter: { ids: [newsLetterId] },
                },
                update: (sendNewsLetterCache, { data: sendNewsLetterData }) => {
                  const sentNewsLetter =
                    sendNewsLetterData?.sendNewsLetter?.[0];
                  const sentNewsLetterId = newsLetter?.id;

                  if (!newsLetter || !sentNewsLetterId) return;

                  sendNewsLetterCache.writeFragment<
                    useSaveNewsLetterFragmentType
                  >({
                    id: sentNewsLetterId,
                    fragment: useSaveNewsLetterFragment,
                    data: {
                      ...newsLetter,
                      ...sentNewsLetter,
                    },
                  });
                },
              });
          },
        });
      },
      [id, isNew, mutation, sendMutation],
    ),
  };
};
