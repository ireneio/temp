import { COLORS, FONTFAMILY } from '../constants';

// TODO: move to query
export default value => {
  if (!/entityMap/.test(value)) return null;

  const rawContent = JSON.parse(value);

  rawContent.blocks = rawContent.blocks.map(
    ({ type, data, inlineStyleRanges, ...block }) => ({
      ...block,
      type: !/^align-.*$/.test(type) ? type : 'unstyled',
      data: !/^align-.*$/.test(type)
        ? data
        : { 'text-align': type.replace(/^align-/, '') },
      inlineStyleRanges: inlineStyleRanges.map(({ style, ...inline }) => {
        if (COLORS[style] || /^#[\d\w]{6}$/.test(style))
          return {
            ...inline,
            style: `color-${COLORS[style] || style}`,
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
      }),
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
};
