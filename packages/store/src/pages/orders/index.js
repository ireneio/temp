import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberOrders, { namespacesRequired } from '@store/member-orders';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import * as Template from 'template';
import MemberHeader from 'components/MemberHeader';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Orders extends React.Component {
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
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.orders')}>
          <MemberOrders />
        </MemberHeader>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {};
};

export default connect(mapStateToProps)(
  withTranslation('common')(
    withHook(() => ({
      page: useTemplatesMenus({
        id: 'page-member-orders',
        container: 'TwoTopsContainer',
        blocks: [],
        fixedtop: Template.fixedtop,
        secondtop: Template.secondtop,
        fixedbottom: Template.fixedbottom,
        sidebar: Template.sidebar,
      }),
    }))(Orders),
  ),
);
