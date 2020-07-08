// typescript import
import { BraftEditorProps, EditorState } from 'braft-editor';

// import
import React, { useState, useMemo } from 'react';
import BraftEditor from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';

import useRawContent from '@meepshop/utils/lib/hooks/useRawContent';
import { FONTFAMILY } from '@meepshop/utils/lib/constants';

import useLanguage from './hooks/useLanguage';
import { CONTROLS, FONTSIZES } from './constants';
import styles from './styles/index.less';

// typescript definition
interface PropsType
  extends Omit<BraftEditorProps, 'defaultValue' | 'value' | 'onChange'> {
  defaultValue?: string;
  onChange?: (html: string) => void;
}

// definition
BraftEditor.use(
  ColorPicker({
    theme: 'light',
  }),
);

export default React.memo(
  ({
    defaultValue,
    onChange,
    ...props
  }: PropsType): React.ReactElement | null => {
    const rawContent = useRawContent(defaultValue);
    const [editorState, setEditorState] = useState<EditorState>(
      BraftEditor.createEditorState(rawContent),
    );
    const language = useLanguage();
    const fontFamilies = useMemo(
      () => FONTFAMILY.map(font => ({ name: font, family: font })),
      [],
    );

    return (
      <BraftEditor
        {...props}
        controls={CONTROLS}
        className={styles.root}
        language={language}
        fontSizes={FONTSIZES}
        fontFamilies={fontFamilies}
        value={editorState}
        onChange={state => {
          setEditorState(state);
          if (onChange) onChange(state.toRAW() as string);
        }}
      />
    );
  },
);
