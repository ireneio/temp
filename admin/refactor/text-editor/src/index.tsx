// typescript import
import { NextPage } from 'next';
import { BraftEditorProps } from 'braft-editor';

// import
import React, { useState, useEffect, useCallback } from 'react';
import uuid from 'uuid/v4';

import { parseRawContent } from '@meepshop/apollo/lib/utils/parseRawContent';
import initialLogger from '@meepshop/logger';
import { useCrossContextEvents } from '@admin/hooks';
import TextEditor, { createEditorState } from '@admin/text-editor';

import styles from './styles/index.less';

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

  useEffect(() => {
    if (propsValue !== rawValue)
      setValues({
        value: !propsValue
          ? propsValue
          : createEditorState(
              parseRawContent(
                propsValue,
                initialLogger({
                  id: uuid(),
                  host: 'admin',
                  userAgent: navigator.userAgent,
                  url: '/admin/refactor/text-editor',
                  identity: 'identity',
                }),
              ),
            ),
        rawValue: propsValue,
      });
  }, [propsValue, setProps, rawValue]);

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
