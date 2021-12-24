import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import MemberWishlist, { namespacesRequired } from '@store/member-wish-list';

import * as Template from 'template';
import { Container } from 'components';
import MemberHeader from 'components/MemberHeader';
import Router from 'next/router';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Wishlist extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired,
    };
  };

  static propTypes = {
    locale: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.checkPermission();
  }

  componentDidUpdate() {
    this.checkPermission();
  }

  checkPermission = () => {
    const { apps } = this.props;

    if (!apps.wishList.isInstalled) Router.push('/');
  };

  render() {
    const { t, apps } = this.props;

    if (!apps.wishList.isInstalled) return null;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.wishlist')}>
          <MemberWishlist />
        </MemberHeader>
      </Container>
    );
  }
}

export default withTranslation('common')(
  withContext(AppsContext, apps => ({ apps }))(
    withHook(() => ({
      page: useTemplatesMenus({
        id: 'page-member-wishList',
        container: 'TwoTopsContainer',
        blocks: [],
        fixedtop: Template.fixedtop,
        secondtop: Template.secondtop,
        fixedbottom: Template.fixedbottom,
        sidebar: Template.sidebar,
      }),
    }))(Wishlist),
  ),
);
