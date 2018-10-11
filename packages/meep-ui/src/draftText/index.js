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
    /** props | testJSON [
     *   "test",
     *   "{\"entityMap\":{},\"blocks\":[{\"key\":\"aor8e\",\"text\":\"＊預設文字元件\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[]}]}",
     *   "{\"entityMap\":{\"0\":{\"type\":\"link\",\"mutability\":\"MUTABLE\",\"data\":{\"href\":\"http://bellatest.stage.meepcloud.com/\"}}},\"blocks\":[{\"key\":\"4lr7o\",\"text\":\"😂測試 emoji 🤔123\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[{\"offset\":0,\"length\":14,\"style\":\"FONTSIZE-16\"},{\"offset\":0,\"length\":14,\"style\":\"Arial Black\"},{\"offset\":4,\"length\":5,\"style\":\"BOLD\"},{\"offset\":11,\"length\":3,\"style\":\"ITALIC\"}],\"entityRanges\":[]}]}"
     * ]
     */
    value: PropTypes.string.isRequired,

    /** ignore */
    plainText: PropTypes.bool,
    style: PropTypes.shape({}), // TODO remove
  };

  static defaultProps = {
    /** ignore */
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
            /<p(| style=".*")><\/p>/g,
            '<br />',
          ),
        }}
      />
    );
  }
}
