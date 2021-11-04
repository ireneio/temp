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

// definition
export const { createEditorState } = BraftEditor;

export default React.memo(
  (props: BraftEditorProps): React.ReactElement | null => {
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
          controls={CONTROLS}
          className={styles.root}
          language={language}
          fontSizes={FONTSIZES}
          fontFamilies={fontFamilies}
        />

        <p className={styles.messageLength}>
          {props.value?.toText().replace(/\n/g, '').length}/200
        </p>
      </>
    );
  },
);
