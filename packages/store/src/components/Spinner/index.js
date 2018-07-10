import React from 'react';
import PropTypes from 'prop-types';
import getMessage from './getMessage';
import spinner from './images/spinner.svg';

const Spinner = ({ loading, loadingTip: type, locale = 'zh_TW' }) => (
  <div
    id="spinner"
    style={{
      zIndex: 9999,
      position: 'fixed',
      backgroundColor: '#5161698a',
      height: '100%',
      width: '100%',
      display: loading ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img src={spinner} alt="spinner" style={{ borderRadius: 8, width: 100 }} />
    <div style={{ color: '#eee' }}>{getMessage(type, locale)}</div>
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingTip: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Spinner;
