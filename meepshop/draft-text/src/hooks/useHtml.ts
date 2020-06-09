// import
import { useMemo } from 'react';
import { convertRawToHTML } from 'braft-convert';

import { FONTFAMILY } from '../constants';

// definition
// TODO: only for @meepshop/meep-ui
export const format = (value: object): string =>
  convertRawToHTML(value, {
    fontFamilies: FONTFAMILY.map(font => ({
      name: font,
      family: font,
    })),
  });

export default (value: object | null): string =>
  useMemo(() => (!value ? '' : format(value)), [value]);
