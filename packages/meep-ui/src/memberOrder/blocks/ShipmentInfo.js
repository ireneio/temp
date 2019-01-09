import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';

import { contextProvider } from 'context';

import * as LOCALE from './locale';

const { enhancer } = contextProvider('locale');

export const shipmentInfoFragment = gql`
  fragment shipmentInfoFragment on shipmentObjectType {
    number
    recipient {
      receiverStoreName
      receiverStoreID
      receiverStoreAddress
    }
    description
  }
`;

@enhancer
export default class ShipmentInfo extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    shipmentInfo: PropTypes.shape({}).isRequired,
  };

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      children,
      shipmentInfo: {
        number,
        recipient: { receiverStoreName, receiverStoreID, receiverStoreAddress },
        description,
      },
    } = this.props;

    return children([
      !number ? null : (
        <div>
          {transformLocale(LOCALE.SHIPMENT_NUMBER)}
          {number}
        </div>
      ),
      !receiverStoreName ? null : (
        <>
          <div>
            {transformLocale(LOCALE.RECEIVER_STORE_ID)}
            {receiverStoreID}
          </div>

          <div>
            {transformLocale(LOCALE.RECEIVER_STORE_NAME)}
            {receiverStoreName}
          </div>

          <div>
            {transformLocale(LOCALE.RECEIVER_STORE_ADDRESS)}
            {receiverStoreAddress}
          </div>
        </>
      ),
      !description
        ? null
        : description.split('\n').map(i => <div key={i}>{i}</div>),
    ]);
  }
}
