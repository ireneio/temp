import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';
import draftToHtml from 'draftjs-to-html';
import areEqual from 'fbjs/lib/areEqual';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import { FONTFAMILY } from './constants';

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
              delete newBlock.type;
              break;
            case 'align-center':
              newBlock.data = { 'text-align': 'center' };
              delete newBlock.type;
              break;
            case 'align-right':
              newBlock.data = { 'text-align': 'right' };
              delete newBlock.type;
              break;
            default:
              newBlock.data = {};
          }
          rawContent.blocks[blockIndex] = newBlock;

          block.inlineStyleRanges.forEach((inline, inlineIndex) => {
            let newStyle = inline.style;
            if (FONTFAMILY.indexOf(newStyle) > -1) {
              newStyle = `fontfamily-${newStyle}`;
            }
            if (newStyle.startsWith('FONTSIZE-')) {
              newStyle = newStyle.toLowerCase();
            }
            if (newStyle.startsWith('#') && newStyle.length === 7) {
              newStyle = `color-${newStyle.substr(0, 7)}`;
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
      editorState: this.getFormattedEditorState(this.props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        editorState: this.getFormattedEditorState(nextProps.value),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !areEqual(this.state.editorState, nextState.editorState);
  }

  render() {
    const { plainText, style } = this.props;
    const { editorState } = this.state;
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const text = editorState.getCurrentContent().getPlainText();

    if (plainText) return <div>{text}</div>;
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
