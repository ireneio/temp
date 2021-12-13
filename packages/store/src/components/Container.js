import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { UserAgent } from 'fbjs';

import { withTranslation } from '@meepshop/locales';
import {
  AdTrack as AdTrackContext,
  Fb as FbContext,
  Currency as CurrencyContext,
  Role as RoleContext,
} from '@meepshop/context';
import Layout from '@meepshop/meep-ui/lib/layout';
import withContext from '@store/utils/lib/withContext';

import * as Utils from 'utils';

const { isBrowser } = UserAgent;

@withTranslation('ducks')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(CurrencyContext)
@withContext(FbContext)
@withContext(RoleContext, role => ({ role }))
class Container extends React.Component {
  static propTypes = {
    page: PropTypes.shape({ id: PropTypes.string }).isRequired,
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    // Fix IE layout bug
    if (isBrowser('IE')) {
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    }
  }

  render() {
    // Debugger
    if (typeof window === 'object') {
      window.meepShopStore.debugger = { 'Container-props': this.props };
    }

    const location = Utils.uriParser(this.props);
    const {
      /* props(not in context) */
      page,
      product,
      children,
    } = this.props;

    return (
      <Layout
        location={location}
        goTo={Utils.goTo}
        product={product}
        radiumConfig={{ userAgent: location.userAgent }} // for radium media query
        {...page}
      >
        {children}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {};
};

export default connect(mapStateToProps)(Container);
