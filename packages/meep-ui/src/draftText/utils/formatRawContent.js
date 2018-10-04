import emojiRegex from 'emoji-regex';
import { COLORS, FONTFAMILY } from '../constants';

const getEmojiIndexes = text => {
  const regex = emojiRegex();
  const result = [];
  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text))) {
    const emoji = match[0];
    const index = Math.max(text.indexOf(match[0]), match.index);
    const { length } = emoji;
    const mutiCharsEmojiNumber = result.reduce((acc, item) => {
      if (item.length > 1) return acc + 1;
      return acc;
    }, 0);
    result.push({ index, length, originIndex: index - mutiCharsEmojiNumber });
  }
  return result;
};

const formatStyleRange = (inline, originInline, emoji) => {
  const { offset, length } = inline;
  const { offset: originOffset, length: originLength } = originInline;
  const { length: emojiLength, originIndex: emojiOriginIndex } = emoji;
  return {
    ...inline,
    offset: originOffset > emojiOriginIndex ? offset + emojiLength - 1 : offset,
    length:
      originOffset <= emojiOriginIndex &&
      emojiOriginIndex < originOffset + originLength
        ? length + emojiLength - 1
        : length,
  };
};

// TODO: move to query
export default value => {
  try {
    if (!/entityMap/.test(value)) return null;

    const rawContent = JSON.parse(value);
    rawContent.blocks = rawContent.blocks.map(
      ({ type, data, text, inlineStyleRanges, ...block }) => {
        const emojiIndexes = getEmojiIndexes(text);
        let newInlineStyleRanges = inlineStyleRanges;

        emojiIndexes.forEach(emoji => {
          newInlineStyleRanges = newInlineStyleRanges.map(
            (inline, inlineIndex) => {
              const newInline = formatStyleRange(
                inline,
                inlineStyleRanges[inlineIndex],
                emoji,
              );
              return newInline;
            },
          );
        });

        return {
          ...block,
          text,
          type: !/^align-.*$/.test(type) ? type : 'unstyled',
          data: !/^align-.*$/.test(type)
            ? data
            : { 'text-align': type.replace(/^align-/, '') },
          inlineStyleRanges: newInlineStyleRanges.map(
            ({ style, ...inline }) => {
              if (COLORS[style] || /^#[\d\w]{6}$/.test(style))
                return {
                  ...inline,
                  style: `color-${COLORS[style] || style}`,
                };

              if (style.startsWith('background-'))
                return {
                  ...inline,
                  style: `bgcolor-${COLORS[style.replace(/^background-/, '')]}`,
                };

              if (FONTFAMILY.includes(style))
                return {
                  ...inline,
                  style: `fontfamily-${style}`,
                };

              if (style.startsWith('FONTSIZE-'))
                return {
                  ...inline,
                  style: style.toLowerCase(),
                };

              return {
                ...inline,
                style,
              };
            },
          ),
        };
      },
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
