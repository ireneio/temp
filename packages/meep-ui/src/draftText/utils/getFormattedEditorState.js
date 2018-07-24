import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { COLORS, HEX_COLORS, FONTFAMILY } from '../constants';

export default value => {
  if (value.indexOf('entityMap') < 0) return null;

  let editorState;
  if (value) {
    editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(value)),
    );
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const { blocks, entityMap } = rawContent;

    blocks.forEach((block, blockIndex) => {
      const newBlock = block;
      switch (block.type) {
        case 'align-left':
          newBlock.data = { 'text-align': 'left' };
          newBlock.type = 'unstyled';
          break;
        case 'align-center':
          newBlock.data = { 'text-align': 'center' };
          newBlock.type = 'unstyled';
          break;
        case 'align-right':
          newBlock.data = { 'text-align': 'right' };
          newBlock.type = 'unstyled';
          break;
        case 'unstyled':
          newBlock.type = '';
          break;
        default:
      }
      blocks[blockIndex] = newBlock;

      block.inlineStyleRanges.forEach((inline, inlineIndex) => {
        let newStyle = inline.style;
        if (newStyle.startsWith('#') && newStyle.length === 7) {
          newStyle = `color-${newStyle.substr(0, 7)}`;
        }
        const colorIndex = COLORS.indexOf(newStyle);
        if (colorIndex > -1) {
          newStyle = `color-${HEX_COLORS[colorIndex]}`;
        }
        if (FONTFAMILY.indexOf(newStyle) > -1) {
          newStyle = `fontfamily-${newStyle}`;
        }
        if (newStyle.startsWith('FONTSIZE-')) {
          newStyle = newStyle.toLowerCase();
        }
        blocks[blockIndex].inlineStyleRanges[inlineIndex].style = newStyle;
      });
    });

    Object.keys(entityMap).forEach(key => {
      if (entityMap[key].type === 'link') {
        const newEntity = entityMap[key];
        newEntity.type = 'LINK';
        newEntity.data.url = entityMap[key].data.href;
        delete newEntity.data.href;
        entityMap[key] = newEntity;
      }
    });

    editorState = EditorState.createWithContent(convertFromRaw(rawContent));
  } else {
    editorState = EditorState.createEmpty();
  }
  return editorState;
};
