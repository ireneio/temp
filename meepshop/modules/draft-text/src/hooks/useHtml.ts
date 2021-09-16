// import
import { useMemo } from 'react';

// import
import { convertRawToHTML } from 'braft-convert';

import { FONTFAMILY } from '@meepshop/apollo/lib/constants';

// definition
export default (value?: object | null): string =>
  useMemo(
    () =>
      !value
        ? ''
        : convertRawToHTML(value, {
            fontFamilies: FONTFAMILY.map(font => ({
              name: font,
              family: font,
            })),
          }).replace(/<p(| style="[^>]*")><\/p>/g, '<br />'),
    [value],
  );
