import React, { Component } from 'react';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberPasswordChange, {
  namespacesRequired,
} from '@store/member-password-change';

import * as Template from 'template';
import { Container } from 'components';
import MemberHeader from 'components/MemberHeader';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class PasswordChange extends Component {
  static getInitialProps = async () => {
    return {
      namespacesRequired,
    };
  };

  render() {
    const { t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.change-password')}>
          <MemberPasswordChange />
        </MemberHeader>
      </Container>
    );
  }
}

export default withTranslation('common')(
  withHook(() => ({
    page: useTemplatesMenus({
      id: 'page-member-change-password',
      container: 'TwoTopsContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    }),
  }))(PasswordChange),
);
