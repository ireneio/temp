// typescript import
import { BraftEditorProps } from 'braft-editor';

// import
import React, { useMemo, useEffect } from 'react';
import BraftEditor from 'braft-editor';
import ColorPicker from 'braft-extensions/dist/color-picker';

import { useTranslation } from '@meepshop/locales';
import { FONTFAMILY } from '@meepshop/apollo/lib/constants';

import useLanguage from './hooks/useLanguage';
import { CONTROLS, FONTSIZES } from './constants';
import styles from './styles/index.less';

// typescript definition
export interface PropsType extends BraftEditorProps {
  wordLimit?: number;
}

// definition
export const { createEditorState } = BraftEditor;

export default React.memo(
  ({
    className = '',
    wordLimit = 0,
    ...props
  }: PropsType): React.ReactElement | null => {
    const { t } = useTranslation('text-editor');
    const language = useLanguage();
    const fontFamilies = useMemo(
      () => FONTFAMILY.map(font => ({ name: font, family: font })),
      [],
    );

    useEffect(() => {
      BraftEditor.use(
        ColorPicker({
          theme: 'light',
          clearButtonText: t('clear'),
          closeButtonText: t('close'),
        }),
      );
    }, [t]);

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
