// typescript import
import { ColumnProps } from 'antd/lib/table';

// import
import React, { useMemo } from 'react';
import { Button } from 'antd';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Tooltip from '@admin/tooltip';

import Modal from '../Modal';
import useDeleteRoutingRule from './useDeleteRoutingRule';
import styles from '../styles/useColumns.less';

// graphql typescript
import { useColumnsStoreFragment as useColumnsStoreFragmentType } from '../gqls/__generated__/useColumnsStoreFragment';
import { useColumnsRoutingRuleFragment as useColumnsRoutingRuleFragmentType } from '../gqls/__generated__/useColumnsRoutingRuleFragment';
import { modalFragmet as modalFragmetType } from '../gqls/__generated__/modalFragmet';
import { useDeleteRoutingRuleFragment as useDeleteRoutingRuleFragmentType } from '../gqls/__generated__/useDeleteRoutingRuleFragment';

// graphql import
import { useDeleteRoutingRuleFragment } from '../gqls/useDeleteRoutingRule';
import { modalFragmet } from '../gqls/modal';

// definition
export default (
  user: useColumnsStoreFragmentType | null,
): ColumnProps<useColumnsRoutingRuleFragmentType>[] => {
  const { t } = useTranslation('redirects');
  const deleteRoutingRule = useDeleteRoutingRule(
    filter<useDeleteRoutingRuleFragmentType>(
      useDeleteRoutingRuleFragment,
      user,
    ),
  );

  return useMemo(
    () => [
      {
        dataIndex: 'fromPath',
        title: t('originURL'),
        width: 300,
        textWrap: 'word-break',
        ellipsis: true,
        render: (fromPath: useColumnsRoutingRuleFragmentType['fromPath']) => (
          <Tooltip
            className={styles.pathTooltip}
            placement="top"
            title={fromPath}
          >
            {fromPath}
          </Tooltip>
        ),
      },
      {
        dataIndex: 'toPath',
        title: (
          <>
            {t('redirectURL')}
            <Tooltip
              className={styles.tooltip}
              placement="top"
              title={t('tooltip')}
            />
          </>
        ),
        render: (toPath: useColumnsRoutingRuleFragmentType['toPath']) => toPath,
      },
      {
        dataIndex: 'id',
        width: 140,
        align: 'right',
        render: (
          id: useColumnsRoutingRuleFragmentType['id'],
          value: useColumnsRoutingRuleFragmentType,
        ) => (
          <div className={styles.actions}>
            <Tooltip placement="top" title={t('actions.edit')}>
              <Modal
                user={filter<modalFragmetType>(modalFragmet, user)}
                editData={value}
                className={styles.editIcon}
                icon="edit"
                shape="circle"
              />
            </Tooltip>

            <Tooltip placement="top" title={t('actions.delete')}>
              <Button
                className={styles.deleteIcon}
                icon="delete"
                shape="circle"
                onClick={() => deleteRoutingRule({ id })}
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    [user, deleteRoutingRule, t],
  );
};