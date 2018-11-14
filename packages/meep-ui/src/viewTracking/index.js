import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

export default class extends React.Component {
  static propTypes = {
    customTracking: PropTypes.objectOf({
      eventLabel: PropTypes.string.isRequired,
      eventCategory: PropTypes.objectOf({
        status: PropTypes.bool.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  // trigger tracking code one time
  state = { isTriggered: false };

  handleVisible = isVisible => {
    const { isTriggered } = this.state;
    const { customTracking } = this.props;
    const { eventLabel, eventCategory } = customTracking;

    if (isVisible && !isTriggered) {
      if (window.fbq) window.fbq('track', eventLabel);
      if (window.gtag) {
        window.gtag('event', 'meepShop_view', {
          event_category:
            (eventCategory?.status && eventCategory?.value) || eventLabel,
          event_label: eventLabel,
        });
      }
      this.setState({ isTriggered: true });
    }
  };

  render() {
    const { isTriggered } = this.state;
    return (
      <VisibilitySensor onChange={this.handleVisible}>
        <div
          style={{
            display: isTriggered ? 'none' : 'block',
            position: 'absolute',
            width: '100%',
            height: 1,
            visibility: 'hidden',
          }}
        />
      </VisibilitySensor>
    );
  }
}
