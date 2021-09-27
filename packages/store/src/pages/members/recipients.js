import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberRecipients, { namespacesRequired } from '@store/member-recipients';

import * as Utils from 'utils';
import * as Template from 'template';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Recipients extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired,
    };
  };

  static propTypes = {
    error: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.recipients')}>
          <MemberRecipients />
        </MemberHeader>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {
    location: Utils.uriParser(props),
    page: {
      id: 'page-member-recipients',
      container: 'TwoTopsContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    },
  };
};

export default connect(mapStateToProps)(
  withTranslation('common')(
    withHook(({ page }) => ({
      page: useTemplatesMenus(page),
    }))(Recipients),
  ),
);
