// import
import React, { useMemo, useCallback } from 'react';
import { SketchPicker } from 'react-color';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface PropsType {
  onChange: (color: string | null, close: boolean) => void;
  color: string;
  presetColors: string[];
}

// definition
export default ({
  onChange,
  color: selectedColor,
  presetColors,
  ...props
}: PropsType): React.ReactElement => {
  const { t } = useTranslation('text-editor');

  const handleChange = useCallback(
    ({ hex, source }, event) => {
      const inputValueLength = event.target.value?.length;

      if (hex !== selectedColor) {
        switch (source) {
          case 'hex':
            if (inputValueLength >= 6 || inputValueLength === undefined)
              onChange(hex, false);
            break;
          case 'rgb':
            if (inputValueLength >= 3 || inputValueLength === undefined)
              onChange(hex, false);
            break;
          default:
            onChange(hex, false);
            break;
        }
      }
    },
    [selectedColor, onChange],
  );

  const clearColor = useCallback(() => onChange(selectedColor, false), [
    selectedColor,
    onChange,
  ]);

  const closePicker = useCallback(() => onChange(null, true), [onChange]);

  const color = useMemo(() => selectedColor || presetColors[0], [
    selectedColor,
    presetColors,
  ]);

  return (
    <div className="braft-color-picker light-theme">
      <SketchPicker
        color={color}
        presetColors={presetColors}
        onChange={handleChange}
        {...props}
      />

      <footer className="footer">
        <button
          type="button"
          className="button control-item button-clear"
          onClick={clearColor}
          disabled={!color}
        >
          {t('clear')}
        </button>
        <button
          type="button"
          className="button control-item button-close"
          onClick={closePicker}
        >
          {t('close')}
        </button>
      </footer>
    </div>
  );
};
