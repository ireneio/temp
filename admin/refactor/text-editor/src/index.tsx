// typescript import
import { NextPage } from 'next';
import { BraftEditorProps } from 'braft-editor';

// import
import React, { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { parseRawContent } from '@meepshop/apollo/lib/utils/parseRawContent';
import { useCrossContextEvents } from '@admin/hooks';
import TextEditor, { createEditorState } from '@admin/text-editor';

import styles from './styles/index.less';

// graphql typescript
import {
  log as logType,
  logVariables,
  LogTypeEnum,
  LogNameEnum,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  type: string;
  noWrapper: true;
}

// definition
const RefactorTextEditor: NextPage<PropsType> = React.memo(({ type }) => {
  const [{ value: propsValue }, setProps] = useCrossContextEvents<{
    value?: string;
  }>(`text-editor/${type}`, {});
  const [{ value, rawValue }, setValues] = useState<{
    value?: BraftEditorProps['value'];
    rawValue?: string;
  }>({});
  const onChange = useCallback(
    newValue => {
      const newValues = {
        value: newValue,
        rawValue: newValue.toRAW(),
      };

      setProps({ value: newValues.rawValue });
      setValues(newValues);
    },
    [setProps, setValues],
  );
  const [mutation] = useMutation<logType, logVariables>(log);

  useEffect(() => {
    if (propsValue !== rawValue)
      setValues({
        value: !propsValue
          ? propsValue
          : createEditorState(
              (() => {
                try {
                  return parseRawContent(propsValue);
                } catch (e) {
                  mutation({
                    variables: {
                      input: {
                        type: 'ERROR' as LogTypeEnum,
                        name: 'FORMAT_DRAFT_ERROR' as LogNameEnum,
                        data: e,
                      },
                    },
                  });
                  return null;
                }
              })(),
            ),
        rawValue: propsValue,
      });
  }, [propsValue, setProps, rawValue, mutation]);

  return (
    <TextEditor className={styles.root} value={value} onChange={onChange} />
  );
});

RefactorTextEditor.getInitialProps = async ({ query }) => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  type: query.type as string,
  noWrapper: true,
});

export default RefactorTextEditor;
