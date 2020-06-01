// typescript import
import useSelectedPageType from '../../hooks/useSelectedPage';

// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Popover, Tooltip, Icon } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import { DefaultLayoutIcon } from '@meepshop/icons';

import Edit, { editFragment } from './Edit';
import usePageSettingItems, {
  usePageSettingItemsFragment,
} from './hooks/usePageSettingItems';
import useEditOffset from './hooks/useEditOffset';
import styles from './styles/index.less';

// graphql typescript
import { getPagesVariables } from '../../__generated__/getPages';
import { pageSettingFragment as pageSettingFragmentType } from './__generated__/pageSettingFragment';

// typescript definition
interface PropsType {
  page: pageSettingFragmentType;
  isHomePage: boolean;
  className: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  editVisible: boolean;
  onEditVisibleChange: (visible: boolean) => void;
  variables: getPagesVariables;
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'];
}

// definition
export const pageSettingFragment = gql`
  fragment pageSettingFragment on Page {
    ...editFragment
    ...usePageSettingItemsFragment
    id
    pageType
  }

  ${editFragment}
  ${usePageSettingItemsFragment}
`;

export default React.memo(
  ({
    page,
    isHomePage,
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
      filter(usePageSettingItemsFragment, page),
      isHomePage,
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
                    pageType || '' /** TODO should noe be null */,
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
