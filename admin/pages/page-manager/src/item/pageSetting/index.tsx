// typescript import
import { QueryResult } from '@apollo/client';

import useSelectedPageType from '../../hooks/useSelectedPage';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { SettingOutlined } from '@ant-design/icons';
import { Popover, Tooltip } from 'antd';

import { useTranslation } from '@meepshop/locales';

import Edit from './Edit';
import usePageSettingItems from './hooks/usePageSettingItems';
import useEditOffset from './hooks/useEditOffset';
import styles from './styles/index.less';

// graphql typescript
import {
  getPages,
  getPagesVariables,
  pageSettingPageFragment as pageSettingPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { editFragment } from './gqls/edit';
import { usePageSettingItemsPageFragment } from './gqls/usePageSettingItems';

// typescript definition
interface PropsType
  extends Pick<QueryResult<getPages, getPagesVariables>, 'variables'> {
  page: pageSettingPageFragmentType;
  className: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  editVisible: boolean;
  onEditVisibleChange: (visible: boolean) => void;
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'];
}

// definition
export default React.memo(
  ({
    page,
    className,
    visible,
    onVisibleChange,
    editVisible,
    onEditVisibleChange,
    variables,
    setSelectedPage,
  }: PropsType) => {
    const { t } = useTranslation('page-manager');
    const pageSettingItems = usePageSettingItems(
      filter(usePageSettingItemsPageFragment, page),
      () => onEditVisibleChange(true),
      variables,
      setSelectedPage,
    );
    const { rootRef, offset } = useEditOffset();

    return (
      <>
        <Popover
          overlayClassName={styles.root}
          visible={visible}
          onVisibleChange={onVisibleChange}
          content={pageSettingItems.map(({ key, click, Icon }) => (
            <div
              key={key}
              onClick={() => {
                click();
                onVisibleChange(false);
              }}
            >
              <Icon />

              {t(key)}
            </div>
          ))}
          align={{ offset: [0, -7] }}
          placement="rightTop"
          trigger="click"
        >
          <Tooltip title={t('page-setting.hint')}>
            <SettingOutlined className={`${styles.icon} ${className}`} />
          </Tooltip>
        </Popover>

        <div ref={rootRef} />

        {!editVisible ? null : (
          <Edit
            offset={offset}
            page={filter(editFragment, page)}
            variables={variables}
            onClose={() => onEditVisibleChange(false)}
          />
        )}
      </>
    );
  },
);
