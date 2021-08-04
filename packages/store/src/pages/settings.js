import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/locales';
import MemberSettings, { namespacesRequired } from '@store/member-settings';

import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Actions from 'ducks/actions';

class Settings extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

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
        <MemberHeader title={t('title.settings')}>
          <MemberSettings />
        </MemberHeader>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  const getSettingsPage = () => ({
    id: 'page-member-settings',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [getSettingsPage, Selectors.getMenus],
    Selectors.getJoinedPage,
  );

  return {
    location: Utils.uriParser(props),
    page: getPage(state, props),
  };
};

export default connect(mapStateToProps)(withTranslation('common')(Settings));
