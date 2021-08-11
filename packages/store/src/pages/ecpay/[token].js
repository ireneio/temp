import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EcpayView, { namespacesRequired } from '@store/ecpay';

import { Error } from 'components';
import * as Utils from 'utils';
import * as Actions from 'ducks/actions';

class Ecpay extends React.Component {
  static getInitialProps = async context => {
    const { store } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return { namespacesRequired };
  };

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    return <EcpayView />;
  }
}

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {};
};

export default connect(mapStateToProps)(Ecpay);
