// typescript import
import { RawDraftContentState, RawDraftInlineStyleRange } from 'draft-js';

import { loggerType } from '@meepshop/logger';

// import
import { COLORS, FONTFAMILY } from '../constants';

// typescript definition
interface DataType {
  'text-align'?: string;
  textAlign?: string;
}

// definition
const handleInlineStyleRanges = (
  inlineStyleRanges: {
    offset: number;
    length: number;
    style: string;
  }[],
): {
  offset: number;
  length: number;
  style: string;
}[] =>
  inlineStyleRanges.map(({ style, ...inline }) => {
    if (Object.keys(COLORS).includes(style) || /^#[\d\w]{6}$/.test(style))
      return {
        ...inline,
        style: `COLOR-${COLORS[style as keyof typeof COLORS] || style}`,
      };

    if (/^background-/.test(style))
      return {
        ...inline,
        style: `BGCOLOR-${
          COLORS[style.replace(/^background-/, '') as keyof typeof COLORS]
        }`,
      };

    if (FONTFAMILY.includes(style))
      return {
        ...inline,
        style: `FONTFAMILY-${style}`,
      };

    return {
      ...inline,
      style: style.toUpperCase().replace('#', ''),
    };
  });

const handleDataType = (
  type: string,
  data?: DataType,
): {
  type: string;
  data?: Omit<DataType, 'text-align'>;
} => {
  if (/^align-.*$/.test(type)) {
    return {
      type: 'unstyled',
      data: {
        ...data,
        textAlign: type.replace(/^align-/, ''),
      },
    };
  }

  const { 'text-align': textAlign, ...rest } = data || {};

  if (textAlign) {
    return {
      type,
      data: {
        ...rest,
        textAlign,
      },
    };
  }

  return {
    type,
    data,
  };
};

export const parseRawContent = (
  value: string | null,
  logger: loggerType,
): object | null => {
  try {
    if (!value || !/entityMap/.test(value)) return null;

    const rawContent = JSON.parse(value) as RawDraftContentState;

    // format blocks
    rawContent.blocks = rawContent.blocks.map(
      ({ type, data, inlineStyleRanges, ...block }) => ({
        ...block,
        ...handleDataType(type, data),
        inlineStyleRanges: handleInlineStyleRanges(
          inlineStyleRanges,
        ) as RawDraftInlineStyleRange[],
      }),
    );

    // format entityMap
    Object.keys(rawContent.entityMap).forEach(key => {
      if (rawContent.entityMap[key].type === 'link') {
        const { ...entity } = rawContent.entityMap[key];

        rawContent.entityMap[key] = {
          ...entity,
          type: 'LINK',
        };
      }

      if (rawContent.entityMap[key].type === 'LINK') {
        const {
          data: { url, href, targetOption, target, ...data },
          ...entity
        } = rawContent.entityMap[key];

        rawContent.entityMap[key] = {
          ...entity,
          data: {
            ...data,
            href: url || href,
            target: targetOption || target,
          },
        };
      }
    });

    return rawContent;
  } catch (error) {
    // FIXME: remove after all draft-js is formatted
    logger.error({
      message: 'failed to format draft-js',
      value,
    });

    return null;
  }
};
