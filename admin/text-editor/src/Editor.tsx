// typescript import
import { BraftEditorProps } from 'braft-editor';

// import
import React, { useMemo } from 'react';
import BraftEditor from 'braft-editor';

import { FONTFAMILY } from '@meepshop/apollo/lib/constants';

import ColorPicker from './ColorPicker';
import useLanguage from './hooks/useLanguage';
import { CONTROLS, FONTSIZES } from './constants';
import styles from './styles/index.less';

// typescript definition
export interface PropsType extends BraftEditorProps {
  wordLimit?: number;
  disabled?: boolean;
}

interface EditorPropsType {
  colorPicker?: React.ReactElement | null;
}

// definition
export const { createEditorState } = BraftEditor;

BraftEditor.use({
  type: 'prop-interception',
  interceptor: (editorProps: EditorPropsType) => ({
    ...editorProps,
    colorPicker: ColorPicker,
    colorPickerTheme: 'light',
  }),
});

export default React.memo(
  ({
    className = '',
    wordLimit = 0,
    ...props
  }: PropsType): React.ReactElement | null => {
    const language = useLanguage();
    const fontFamilies = useMemo(
      () => FONTFAMILY.map(font => ({ name: font, family: font })),
      [],
    );

    return (
      <>
        <BraftEditor
          {...props}
          className={`${styles.root} ${className}`}
          controls={CONTROLS}
          language={language}
          fontSizes={FONTSIZES}
          fontFamilies={fontFamilies}
        />

        {!wordLimit ? null : (
          <p className={styles.messageLength}>
            {props.value?.toText().replace(/\n/g, '').length}/{wordLimit}
          </p>
        )}
      </>
    );
  },
);
