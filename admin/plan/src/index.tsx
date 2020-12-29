// typescript import
import { SelectedPlanType } from './hooks/usePayment';

// import
import React, { useState } from 'react';
import { Icon } from 'antd';

import Link from '@meepshop/link';

import usePlans from './hooks/usePlans';
import PlanDetail from './PlanDetail';
import Payment from './Payment';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  backTo?: {
    name: string;
    path: string;
  };
  title: string;
  description: string;
}

// definition
export default React.memo(({ backTo, title, description }: PropsType) => {
  const plans = usePlans();
  const [plan, setPlan] = useState<SelectedPlanType | null>(null);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {!plan ? (
          <>
            {!backTo ? null : (
              <Link href={backTo.path}>
                <a href={backTo.path}>
                  <Icon type="left" />
                  {backTo.name}
                </a>
              </Link>
            )}

            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>

            <div className={styles.plans}>
              {['bronze', 'silver', 'gold', 'diamond'].map(key => (
                <PlanDetail
                  key={key}
                  data={plans[key] || null}
                  setPlan={setPlan}
                />
              ))}
            </div>
          </>
        ) : (
          <Payment plan={plan} setPlan={setPlan} />
        )}
      </div>
    </div>
  );
});
