// import
import React from 'react';
import { Table } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';

import useColumns from './hooks/useColumns';
import styles from './styles/application.less';

// graphql typescript
import { applicationFragment_applications as applicationFragmentApplicationsType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropTypes {
  data: applicationFragmentApplicationsType;
}

// definition
export default React.memo(
  ({ data: { extra, applicationType, createdAt, recipient } }: PropTypes) => {
    const { t } = useTranslation('member-order-applications');
    const colunms = useColumns(applicationType);

    return (
      <div className={styles.root}>
        <div className={styles.receiverInfo}>
          <h4>
            {t('apply')}
            {t(`type.${applicationType}`)}
          </h4>
          <h4>
            {t('date')}
            {format(new Date(createdAt || new Date()), 'yyyy/MM/dd')}
          </h4>
          {applicationType === 'return' ? null : (
            <>
              <h4>
                {t('recipient')}
                {recipient?.name}
              </h4>
              <h4>
                {t('phone')}
                {recipient?.mobile}
              </h4>
              <h4>
                {t('address')}
                {recipient?.address?.streetAddress}
              </h4>
            </>
          )}
        </div>

        <Table
          rowKey="id"
          dataSource={extra}
          columns={colunms}
          pagination={false}
        />
      </div>
    );
  },
);
