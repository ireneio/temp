// typescript import
import useSelectedPageType from '../../hooks/useSelectedPage';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Popover, Tooltip, Icon } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { DefaultLayoutIcon } from '@meepshop/icons';

import Edit from './Edit';
import usePageSettingItems from './hooks/usePageSettingItems';
import useEditOffset from './hooks/useEditOffset';
import styles from './styles/index.less';

// graphql typescript
import {
  getPagesVariables,
  pageSettingPageFragment as pageSettingPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { editFragment } from './gqls/edit';
import { usePageSettingItemsPageFragment } from './gqls/usePageSettingItems';

// typescript definition
interface PropsType {
  page: pageSettingPageFragmentType;
  className: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  editVisible: boolean;
  onEditVisibleChange: (visible: boolean) => void;
  variables: getPagesVariables;
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
    const { pageType } = page;
    const { t } = useTranslation('page-manager');
    const { icons, events } = usePageSettingItems(
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
          content={icons.map((icon: string) => (
            <div
              key={icon}
              onClick={() => {
                events[icon]();
                onVisibleChange(false);
              }}
            >
              {icon === 'template' ? (
                <DefaultLayoutIcon />
              ) : (
                <Icon type={icon} />
              )}

              {t(
                `page-setting.${
                  ['home', 'custom', 'products'].includes(
                    pageType || '' /** SHOULD_NOT_BE_NULL */,
                  ) && icon === 'edit'
                    ? 'seo'
                    : icon
                }`,
              )}
            </div>
          ))}
          align={{ offset: [0, -7] }}
          placement="rightTop"
          trigger="click"
        >
          <Tooltip title={t('page-setting.hint')}>
            <Icon className={`${styles.icon} ${className}`} type="setting" />
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
