// typescript import
import { languageType } from '@meepshop/locales';

import useSelectedPageType from '../hooks/useSelectedPage';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Tooltip } from 'antd';

import { useTranslation } from '@meepshop/locales';
import Switch from '@meepshop/switch';

import PrefixIcon from './PrefixIcon';
import PageSetting from './pageSetting';
import useTitleOverflow from './hooks/useTitleOverflow';
import styles from './styles/index.less';

// graphql typescript
import {
  itemPageFragment as itemPageFragmentType,
  getPagesVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { pageSettingPageFragment } from './pageSetting/gqls';
import { prefixIconPageFragment } from './gqls/prefixIcon';

// typescript definition
interface PropsType
  extends Pick<
    ReturnType<typeof useSelectedPageType>,
    'selectedPage' | 'setSelectedPage'
  > {
  page: itemPageFragmentType;
  variables: getPagesVariables;
  pageSettingId: string | null;
  setPageSettingId: (pageSettingId: string | null) => void;
  editVisibleId: string | null;
  setEditVisibleId: (editVisibleId: string | null) => void;
}

// definition
export default React.memo(
  ({
    page,
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
      page.title?.[i18n.language as languageType] || page.title?.zh_TW;
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
          <div ref={titleRef} onClick={() => setSelectedPage(page)}>
            <PrefixIcon page={filter(prefixIconPageFragment, page)} />

            {title}
          </div>

          <PageSetting
            page={filter(pageSettingPageFragment, page)}
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
