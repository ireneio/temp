import React from 'react';
import radium from 'radium';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import { DEFAULT_URL } from './constants';

import * as styles from './styles';

@radium
export default class SocialThumbs extends React.Component {
  static propTypes = {
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
  };

  static defaultProps = {
    href: DEFAULT_URL,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.href !== nextProps.href ||
      this.props.alignment !== nextProps.alignment
    );
  }

  render() {
    const { href, alignment } = this.props;

    return (
      <div style={styles.root(alignment)}>
        <iframe
          title="social thumbs"
          src={`
            https://www.facebook.com/plugins/like.php?href=${href}&
            layout=button&
            action=like&
            size=small&
            show_faces=true&
            share=true
          `}
          style={styles.socialThumbs}
        />
      </div>
    );
  }
}
