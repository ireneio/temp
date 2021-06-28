// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import NotFound from './NotFound';
import TotalSheet from './TotalSheet';
import Blocks from './blocks';
import Qa from './Qa';
import useColumns from './hooks/useColumns';
import styles from './styles/index.less';

// graphql typescript
import {
  blocksFragment as blocksFragmentType,
  getMemberOrder as getMemberOrderType,
  notFoundFragment as notFoundFragmentType,
  useColumnsMemberOrderFragment as useColumnsMemberOrderFragmentType,
  totalSheetFragment as totalSheetFragmentType,
  qaOrderFragment as qaOrderFragmentType,
  getMemberOrderVariables as getMemberOrderVariablesType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getMemberOrder } from './gqls';
import { notFoundFragment } from './gqls/notFound';
import { totalSheetFragment } from './gqls/totalSheet';
import { blocksFragment } from './blocks/gqls';
import { qaOrderFragment } from './gqls/qa';
import { useColumnsMemberOrderFragment } from './gqls/useColumns';

// definition
// TODO: should use getInitialProps
export const namespacesRequired = ['@meepshop/locales/namespacesRequired'];
export default React.memo(
  ({ orderId }: { orderId: string }): React.ReactElement => {
    const { t } = useTranslation('member-order');
    const colors = useContext(ColorsContext);
    const columns = useColumns();

    const { data } = useQuery<getMemberOrderType, getMemberOrderVariablesType>(
      getMemberOrder,
      {
        variables: {
          orderId,
        },
      },
    );

    if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

    const order = data.viewer?.order;
    if (!order) {
      return (
        <NotFound
          user={filter<notFoundFragmentType>(notFoundFragment, data?.viewer)}
        />
      );
    }

    const { orderNo, createdAt, products, environment, id, ...other } = order;

    return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <h1>
            <span>{`${t('order-number')}${orderNo || ''}`}</span>

            <span>
              <span>{t('created-at')}</span>

              {moment(createdAt).format('YYYY/MM/DD')}
            </span>
          </h1>

          <Table<useColumnsMemberOrderFragmentType>
            className={styles.table}
            dataSource={filter<useColumnsMemberOrderFragmentType[]>(
              useColumnsMemberOrderFragment,
              products,
            ).filter(Boolean)}
            columns={columns}
            rowKey="id"
            pagination={false}
          />

          <TotalSheet
            order={filter<totalSheetFragmentType>(totalSheetFragment, {
              ...other,
              id,
            })}
          />

          <Blocks
            order={filter<blocksFragmentType>(blocksFragment, { ...other, id })}
          />

          {environment?.sourcePage === 'lp' ? null : (
            <Qa
              order={filter<qaOrderFragmentType>(qaOrderFragment, {
                ...other,
                id,
              })}
            />
          )}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: ${styles.screenSmMax}) {
                .${styles.root} h1 > span:last-child {
                  color: ${transformColor(colors[3]).alpha(0.5)};
                }
              }
            `,
          }}
        />
      </div>
    );
  },
);
