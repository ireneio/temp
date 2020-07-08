// import
import { useMemo } from 'react';

// import
import { convertRawToHTML } from 'braft-convert';

import { FONTFAMILY } from '../constants';

// definition
export const RawToHTML = (value: object): string =>
  convertRawToHTML(value, {
    fontFamilies: FONTFAMILY.map(font => ({
      name: font,
      family: font,
    })),
  }).replace(/<p(| style="[^>]*")><\/p>/g, '<br />');

export default (value?: object | null): string =>
  useMemo(() => (!value ? '' : RawToHTML(value)), [value]);
