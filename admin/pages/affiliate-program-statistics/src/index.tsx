// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';

import { useTranslation } from '@meepshop/locales';
import {
  OrderPriceIcon,
  SharingBonusIcon,
  ValidOrderIcon,
} from '@meepshop/icons';
import { Currency as CurrencyContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';
import Header from '@admin/header';
import Tooltip from '@admin/tooltip';

import Orders from './Orders';
import useAffiliateProgramStatistics from './hooks/useAffiliateProgramStatistics';
import styles from './styles/index.less';

// graphql import
import { ordersAffiliateProgramOrdersConnectionFragment } from './gqls/orders';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  affiliateProgramId: string;
}

// definition
const icons = {
  numberOfOrders: <ValidOrderIcon className={styles.icon} />,
  totalAmountForCommission: <OrderPriceIcon className={styles.icon} />,
  totalCommission: <SharingBonusIcon className={styles.icon} />,
};

const AffiliateProgramStatistics: NextPage<PropsType> = React.memo(
  ({ affiliateProgramId }) => {
    const { t } = useTranslation('affiliate-program-statistics');
    const { c } = useContext(CurrencyContext);
    const {
      loading,
      fetchMore,
      affiliateProgramStatistics,
      affiliateProgramOrders,
    } = useAffiliateProgramStatistics(affiliateProgramId);
    const router = useRouter();
    const status =
      affiliateProgramStatistics?.affiliateProgram.status || 'NOT_STARTED';

    return (
      <Header
        prevTitle={t('back')}
        backTo={
          router.previousUrl !== '/'
            ? router.previousUrl
            : '/affiliate/programs'
        }
        maxWidth="initial"
        disableAffix
      >
        <div className={styles.root}>
          <div className={styles.title}>
            <h1>{affiliateProgramStatistics?.affiliateProgram.title} </h1>

            <span className={styles[status] || ''}>
              {t(`status.${status}`)}
            </span>
          </div>

          <div className={styles.statistics}>
            {([
              'numberOfOrders',
              'totalAmountForCommission',
              'totalCommission',
            ] as const).map(key => (
              <div key={key}>
                {icons[key]}

                <div className={styles.detail}>
                  <div>
                    {t(`${key}.title`)}

                    <Tooltip title={t(`${key}.tooltip`)} />
                  </div>

                  <div>
                    {key === 'numberOfOrders'
                      ? affiliateProgramStatistics?.[key]
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      : c(affiliateProgramStatistics?.[key] || 0, true)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Orders
          loading={loading}
          fetchMore={fetchMore}
          affiliateProgramId={affiliateProgramId}
          affiliateProgramOrders={filter(
            ordersAffiliateProgramOrdersConnectionFragment,
            affiliateProgramOrders,
          )}
        />
      </Header>
    );
  },
);

AffiliateProgramStatistics.getInitialProps = async ({
  query: { affiliateProgramId },
}) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof affiliateProgramId !== 'string')
    throw new Error('[FIXME] affiliateProgramId is undefined');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    affiliateProgramId,
  };
};

export default AffiliateProgramStatistics;
