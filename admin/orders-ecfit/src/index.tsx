// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import Router from 'next/router';
import { Select, Icon } from 'antd';

import { withTranslation } from '@admin/utils/lib/i18n';

import Container from './Container';
import styles from './styles/index.less';

// definition
const { Option } = Select;

class OrdersEcfit extends React.PureComponent<I18nPropsType> {
  private rootRef = React.createRef<HTMLDivElement>();

  public state = {
    isOpened: false,
  };

  private timeout?: NodeJS.Timer;

  private openSelect = (): void => {
    if (this.timeout) clearTimeout(this.timeout);

    this.setState({ isOpened: true });
  };

  private closeSelect = (): void => {
    this.timeout = setTimeout(() => {
      this.setState({ isOpened: false });
    }, 100);
  };

  public render(): React.ReactNode {
    const { t } = this.props;
    const { isOpened } = this.state;

    return (
      <div className={styles.root} ref={this.rootRef}>
        <div className={styles.wrapper}>
          <Select
            className={styles.title}
            defaultValue={t('title')}
            dropdownClassName={styles.options}
            onChange={(value: string) => {
              if (value === t('orders:title')) Router.push('/orders');
              else Router.push('/orders/ecfit');
            }}
            onMouseEnter={this.openSelect}
            onMouseLeave={this.closeSelect}
            dropdownRender={menuNode => (
              <div
                onMouseEnter={this.openSelect}
                onMouseLeave={this.closeSelect}
              >
                {menuNode}
              </div>
            )}
            open={isOpened}
          >
            <Option value={t('orders:title')}>{t('orders:title')}</Option>
            <Option value={t('title')}>
              <Icon type="profile" />

              {t('title')}
            </Option>
          </Select>

          <Container rootRef={this.rootRef} />
        </div>
      </div>
    );
  }
}

const EnhancedOrdersEcfit = withTranslation(['orders-ecfit', 'orders'])(
  OrdersEcfit,
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const OrdersEcfitPage = () => <EnhancedOrdersEcfit />;

OrdersEcfitPage.getInitialProps = async () => ({
  namespacesRequired: [
    'orders-ecfit',
    'orders',
    'date-picker',
    'orders-export',
  ],
});

export default OrdersEcfitPage;
