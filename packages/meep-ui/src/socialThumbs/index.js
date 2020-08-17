import React from 'react';

import { Fb as FbContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import { DEFAULT_URL } from './constants';
import styles from './styles/index.less';

@withContext(FbContext)
export default class SocialThumbs extends React.PureComponent {
  socialThumbsRef = React.createRef();

  static propTypes = {
    /** props | test
     * https://www.facebook.com/meepshop/,
     * https://www.meepshopmax.com/
     */
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
  };

  static defaultProps = {
    /** props */
    href: DEFAULT_URL,
  };

  isLoaded = false;

  componentDidMount() {
    this.renderSocialThumbs();
  }

  componentDidUpdate() {
    this.renderSocialThumbs();
  }

  renderSocialThumbs = () => {
    const { fb } = this.props;

    if (!fb) return;

    if (!this.isLoaded) {
      this.socialThumbsRef.current.removeAttribute('fb-xfbml-state');
      this.socialThumbsRef.current.removeAttribute('fb-iframe-plugin-query');
    }

    this.isLoaded = true;
    fb.XFBML.parse(this.socialThumbsRef.current.parentNode);
  };

  render() {
    const { href, alignment } = this.props;

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        <div
          ref={this.socialThumbsRef}
          className="fb-like"
          data-href={href || DEFAULT_URL}
          data-layout="button"
          data-action="like"
          data-size="small"
          data-show-faces="false"
          data-share
        />
      </div>
    );
  }
}
