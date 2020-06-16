// typescript import
import { I18nPropsType } from '@meepshop/utils/lib/i18n';

// import
import React from 'react';
import Router from 'next/router';
import { Select } from 'antd';
import moment from 'moment';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import OrdersExport from '@admin/orders-export';

// typescript definition
type OperatingType = 'export' | 'print' | string;

// definition
const { Option } = Select;

class MoreOperating extends React.PureComponent<I18nPropsType> {
  public state = {
    showOrdersExport: false,
  };

  private operating = (operatingType: OperatingType): void => {
    if (operatingType === 'print') {
      // TODO: remove after orderlist move to next-admin
      localStorage.setItem('selectedOrders-timeout', moment().format());
      Router.push('/orders/print?ref=ecfit');
      return;
    }

    this.setState({ showOrdersExport: true });
  };

  public render(): React.ReactNode {
    const { t } = this.props;
    const { showOrdersExport } = this.state;

    return (
      <>
        <Select
          value={t('more-operating.title')}
          onChange={this.operating}
          size="large"
        >
          {['export', 'print'].map(status => (
            <Option key={status} value={status}>
              {t(`more-operating.${status}`)}
            </Option>
          ))}
        </Select>

        <OrdersExport
          visible={showOrdersExport}
          onClose={() => this.setState({ showOrdersExport: false })}
        />
      </>
    );
  }
}

export default withTranslation('orders-ecfit')(MoreOperating);
