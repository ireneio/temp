import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

@withContext(AdTrackContext, adTrack => ({ adTrack }))
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
    const { adTrack, customTracking } = this.props;
    const { eventLabel, eventCategory } = customTracking;

    if (isVisible && !isTriggered) {
      adTrack.custom(
        'meepShop_view',
        eventLabel,
        !eventCategory?.status ? null : eventCategory?.value || eventLabel,
      );
      this.setState({ isTriggered: true });
    }
  };

  render() {
    const { isTriggered } = this.state;
    return (
      <VisibilitySensor
        active={!isTriggered}
        partialVisibility
        onChange={this.handleVisible}
      >
        <div
          style={{
            display: isTriggered ? 'none' : 'block',
            width: '100%',
            height: 1,
            marginTop: -1,
            visibility: 'hidden',
          }}
        />
      </VisibilitySensor>
    );
  }
}
