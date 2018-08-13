import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style } from 'radium';
import { enhancer } from 'layout/DecoratorsRoot';
import areEqual from 'fbjs/lib/areEqual';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

import { COLOR_TYPE } from 'constants/propTypes';

import getFormattedEditorState from './utils/getFormattedEditorState';
import * as styles from './styles';

@enhancer
@radium
export default class DraftText extends React.Component {
  static propTypes = {
    colors: COLOR_TYPE.isRequired,
    value: PropTypes.string.isRequired,
    plainText: PropTypes.bool,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    plainText: false,
    style: {},
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    editorState: getFormattedEditorState(this.props.value),
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        editorState: getFormattedEditorState(nextProps.value),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { editorState } = this.state;

    return !areEqual(editorState, nextState.editorState);
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { colors, value, plainText, style } = this.props;
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
        <Style scopeSelector=".draft-text" rules={styles.Style(colors)} />
        {html && (
          <div
            dangerouslySetInnerHTML={{
              // eslint-disable-line
              __html: html,
            }}
          />
        )}
      </div>
    );
  }
}
