import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertFromRaw } from 'draft-js';

import styles from './styles/index.less';
import notMemoizedFormatRawContent from './utils/formatRawContent';

export default class DraftText extends React.PureComponent {
  formatRawContent = memoizeOne(notMemoizedFormatRawContent);

  static propTypes = {
    value: PropTypes.string.isRequired,
    plainText: PropTypes.bool,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    plainText: false,
    style: {},
  };

  render() {
    const { value, plainText, style } = this.props;
    const rawContent = this.formatRawContent(value);

    if (plainText)
      return (
        <div>
          {rawContent
            ? EditorState.createWithContent(convertFromRaw(rawContent))
                .getCurrentContent()
                .getPlainText()
            : value.replace(/<(?:.|\n)*?>/gm, '')}
        </div>
      );

    return (
      <div
        className={styles.root}
        style={style}
        dangerouslySetInnerHTML={{
          // FIXME: value should be remove(大量上架)
          __html: (rawContent ? draftToHtml(rawContent) : value).replace(
            /<p><\/p>/g,
            '<br />',
          ),
        }}
      />
    );
  }
}
