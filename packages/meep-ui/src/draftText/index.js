import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';
import draftToHtml from 'draftjs-to-html';
import areEqual from 'fbjs/lib/areEqual';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { COLORS, HEX_COLORS, FONTFAMILY } from './constants';

import * as styles from './styles';

@radium
export default class DraftText extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    plainText: PropTypes.bool,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    plainText: false,
    style: {},
  };

  constructor(props) {
    super(props);

    this.getFormattedEditorState = value => {
      if (value.indexOf('entityMap') < 0) return null;

      let editorState;
      if (value) {
        editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(value)),
        );
        const rawContent = convertToRaw(editorState.getCurrentContent());

        rawContent.blocks.forEach((block, blockIndex) => {
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
          rawContent.blocks[blockIndex] = newBlock;

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
            rawContent.blocks[blockIndex].inlineStyleRanges[
              inlineIndex
            ].style = newStyle;
          });
        });

        editorState = EditorState.createWithContent(convertFromRaw(rawContent));
      } else {
        editorState = EditorState.createEmpty();
      }
      return editorState;
    };

    this.onEditorStateChange = editorState => {
      this.setState({
        editorState,
      });
    };

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      editorState: this.getFormattedEditorState(this.props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        editorState: this.getFormattedEditorState(nextProps.value),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { editorState } = this.state;

    return !areEqual(editorState, nextState.editorState);
  }

  render() {
    const { value, plainText, style } = this.props;
    const { editorState } = this.state;

    if (plainText) {
      const text = editorState
        ? editorState.getCurrentContent().getPlainText()
        : value.replace(/<(?:.|\n)*?>/gm, '');
      return <div>{text}</div>;
    }

    const html = editorState
      ? draftToHtml(convertToRaw(editorState.getCurrentContent()))
      : value;

    return (
      <div className="draft-text" style={[styles.root, style]}>
        <Style scopeSelector=".draft-text" rules={styles.Style} />
        <div
          dangerouslySetInnerHTML={{
            // eslint-disable-line react/no-danger
            __html: html,
          }}
        />
      </div>
    );
  }
}
