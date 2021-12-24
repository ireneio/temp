import React, { Component } from 'react';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberSettings, { namespacesRequired } from '@store/member-settings';

import * as Template from 'template';
import { Container } from 'components';
import MemberHeader from 'components/MemberHeader';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Settings extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired,
    };
  };

  render() {
    const { t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.settings')}>
          <MemberSettings />
        </MemberHeader>
      </Container>
    );
  }
}

export default withTranslation('common')(
  withHook(() => ({
    page: useTemplatesMenus({
      id: 'page-member-settings',
      container: 'TwoTopsContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    }),
  }))(Settings),
);
