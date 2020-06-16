// typescript import
import useSelectedPageType from '../hooks/useSelectedPage';

// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Tooltip } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import Switch from '@admin/switch';

import PrefixIcon from './PrefixIcon';
import PageSetting from './pageSetting';
import useTitleOverflow from './hooks/useTitleOverflow';
import styles from './styles/index.less';

// graphql typescript
import { localeFragmentType } from '@admin/utils/lib/fragments/locale';

import { itemFragment as itemFragmentType } from './__generated__/itemFragment';
import { getPagesVariables } from '../__generated__/getPages';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

import { pageSettingFragment } from './pageSetting';

// typescript definition
interface PropsType
  extends Pick<
    ReturnType<typeof useSelectedPageType>,
    'selectedPage' | 'setSelectedPage'
  > {
  page: itemFragmentType;
  isHomePage: boolean;
  variables: getPagesVariables;
  pageSettingId: string | null;
  setPageSettingId: (pageSettingId: string | null) => void;
  editVisibleId: string | null;
  setEditVisibleId: (editVisibleId: string | null) => void;
}

// definition
export const itemFragment = gql`
  fragment itemFragment on Page {
    ...pageSettingFragment
    id
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
  ${pageSettingFragment}
`;

export default React.memo(
  ({
    page,
    isHomePage,
    variables,
    selectedPage,
    setSelectedPage,
    pageSettingId,
    setPageSettingId,
    editVisibleId,
    setEditVisibleId,
  }: PropsType) => {
    const { i18n } = useTranslation('page-manager');
    const title =
      page.title?.[i18n.language as keyof localeFragmentType] ||
      page.title?.zh_TW;
    const { titleRef, isOverflow } = useTitleOverflow(
      editVisibleId === page.id,
      title,
    );

    return (
      <Switch
        isTrue={isOverflow}
        render={children => (
          <Tooltip title={title} arrowPointAtCenter>
            {children}
          </Tooltip>
        )}
      >
        <div
          className={`${styles.root} ${
            page.id !== selectedPage?.id ? '' : styles.selected
          }`}
        >
          <div
            ref={titleRef}
            onClick={() =>
              setSelectedPage({
                ...page,
                isHomePage,
              })
            }
          >
            <PrefixIcon
              isHomePage={isHomePage}
              isDefaultTemplatePage={page.isDefaultTemplatePage}
            />

            {title}
          </div>

          <PageSetting
            page={filter(pageSettingFragment, page)}
            isHomePage={isHomePage}
            className={pageSettingId === page.id ? styles.visible : ''}
            visible={pageSettingId === page.id}
            onVisibleChange={visible =>
              setPageSettingId(visible ? page.id : null)
            }
            editVisible={editVisibleId === page.id}
            onEditVisibleChange={visible =>
              setEditVisibleId(visible ? page.id : null)
            }
            variables={variables}
            setSelectedPage={setSelectedPage}
          />
        </div>
      </Switch>
    );
  },
);
