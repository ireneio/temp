// typescript import
import { ColorsType } from '@meepshop/context';

// import
import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

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
            {moment(createdAt).format('YYYY/MM/DD')}
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

export const getApplicationStyles = (colors: ColorsType): string => `
  .${styles.tag} {
    color: ${colors[2]};
    background: ${colors[4]};
  }
`;
