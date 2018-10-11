import emojiRegex from 'emoji-regex';

import { COLORS, FONTFAMILY } from '../constants';

const handleEmoji = (text, inline) =>
  (text.match(emojiRegex()) || []).reduce(
    ({ offset, length, ...otherData }, emoji, index, emojiArray) => {
      const emojiOffset = emoji.length - 1;
      const emojiIndex = emojiArray
        .slice(0, index)
        .reduce(
          (result, { length: emojiLength }) => result - (emojiLength - 1),
          text.indexOf(emoji),
        );

      if (emojiIndex < inline.offset)
        return {
          ...otherData,
          offset: offset + emojiOffset,
          length,
        };

      if (
        inline.offset <= emojiIndex &&
        emojiIndex <= inline.offset + inline.length
      )
        return {
          ...otherData,
          offset,
          length: length + emojiOffset,
        };

      return {
        ...otherData,
        offset,
        length,
      };
    },
    inline,
  );

const handleInlineStyleRanges = (inlineStyleRanges, text) =>
  inlineStyleRanges.map(({ style, ...inline }) => {
    const newInline = handleEmoji(text, inline);

    if (COLORS[style] || /^#[\d\w]{6}$/.test(style))
      return {
        ...newInline,
        style: `color-${COLORS[style] || style}`,
      };

    if (/^background-/.test(style))
      return {
        ...newInline,
        style: `bgcolor-${COLORS[style.replace(/^background-/, '')]}`,
      };

    if (FONTFAMILY.includes(style))
      return {
        ...newInline,
        style: `fontfamily-${style}`,
      };

    if (/^FONTSIZE-/.test(style))
      return {
        ...newInline,
        style: style.toLowerCase(),
      };

    return {
      ...newInline,
      style,
    };
  });

// TODO: move to query
export default value => {
  try {
    if (!/entityMap/.test(value)) return null;

    const rawContent = JSON.parse(value);

    rawContent.blocks = rawContent.blocks.map(
      ({ type, data, text, inlineStyleRanges, ...block }) => ({
        ...block,
        text,
        type: !/^align-.*$/.test(type) ? type : 'unstyled',
        data: !/^align-.*$/.test(type)
          ? data
          : { 'text-align': type.replace(/^align-/, '') },
        inlineStyleRanges: handleInlineStyleRanges(inlineStyleRanges, text),
      }),
    );

    Object.keys(rawContent.entityMap).forEach(key => {
      if (rawContent.entityMap[key].type === 'link') {
        const {
          data: { href, ...data },
          ...entity
        } = rawContent.entityMap[key];

        rawContent.entityMap[key] = {
          ...entity,
          type: 'LINK',
          data: {
            ...data,
            url: href,
          },
        };
      }
    });

    return rawContent;
  } catch (error) {
    console.log(`<< formatRawContent >> Error: ${error.message} - ${value}`);
    return null;
  }
};
