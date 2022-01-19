import React from 'react';
import PropTypes from 'prop-types';
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
export default class Container extends React.Component {
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
    const {
      /* props(not in context) */
      userAgent,
      page,
      product,
      children,
    } = this.props;

    return (
      <Layout
        goTo={Utils.goTo}
        product={product}
        radiumConfig={{ userAgent }} // for radium media query
        {...page}
      >
        {children}
      </Layout>
    );
  }
}
