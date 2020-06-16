// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Input, Tooltip, Icon, Collapse } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

import AddNewPage from './addNewPage';
import Item from './item';
import Previewer from './Previewer';
import usePages from './hooks/usePages';
import useSelectedPage from './hooks/useSelectedPage';
import styles from './styles/index.less';

// graphql typescript
import { getPages, getPagesVariables } from './__generated__/getPages';

// graphql import
import { previewerStoreFragment, previewerPageFragment } from './Previewer';
import { itemFragment } from './item';
import { usePagesStoreFragment } from './hooks/usePages';

// definition
const { Search } = Input;
const { Panel } = Collapse;
const query = gql`
  query getPages(
    $homePagesFilter: StorePagesFilterInput
    $customPagesFilter: StorePagesFilterInput
    $templatePagesFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        ...previewerStoreFragment
        ...usePagesStoreFragment
        id
      }
    }
  }

  ${previewerStoreFragment}
  ${usePagesStoreFragment}
`;

const PageManager: NextPage = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('page-manager');
    const { loading, error, data, variables, refetch } = useQuery<
      getPages,
      getPagesVariables
    >(query, {
      variables: {
        homePagesFilter: { type: 'HOME' },
        customPagesFilter: { type: 'CUSTOM' },
        templatePagesFilter: { type: 'TEMPLATE' },
      },
    } as { variables: getPagesVariables });
    const pages = usePages(data || null, variables);
    const {
      selectedPage,
      setSelectedPage,
      collapseActiveKey,
      setCollapseActiveKey,
    } = useSelectedPage(pages, variables, loading);
    const [pageSettingId, setPageSettingId] = useState<string | null>(null);
    const [editVisibleId, setEditVisibleId] = useState<string | null>(null);

    if (error || !data)
      return <Spin indicator={<Icon type="loading" spin />} />;

    return (
      <div className={styles.root}>
        <div className={styles.sidebar}>
          <h1>{t('title')}</h1>

          <div className={styles.search}>
            <Search
              placeholder={t('search')}
              loading={loading}
              onSearch={value => {
                if (variables.homePagesFilter?.searchTerm === value) return;

                refetch({
                  homePagesFilter: {
                    ...variables.homePagesFilter,
                    searchTerm: value,
                  },
                  customPagesFilter: {
                    ...variables.customPagesFilter,
                    searchTerm: value,
                  },
                  templatePagesFilter: {
                    ...variables.templatePagesFilter,
                    searchTerm: value,
                  },
                });
              }}
              allowClear
            />

            <AddNewPage variables={variables} />
          </div>

          <div className={styles.wrapper}>
            {pages.map(({ key, data: pageData }) => (
              <div key={key} className={styles.collapse}>
                <h4 className={styles.title}>{t(key)}</h4>

                <Collapse
                  activeKey={collapseActiveKey}
                  onChange={activeKeys =>
                    setCollapseActiveKey(
                      collapseActiveKey instanceof Array
                        ? collapseActiveKey.filter(
                            activeKey => !activeKeys.includes(activeKey),
                          )[0]
                        : activeKeys.slice(-1)[0],
                    )
                  }
                  bordered={false}
                >
                  {pageData.map(({ key: subKey, data: subData, hint }) => (
                    <Panel
                      key={subKey}
                      header={
                        <>
                          {t(`${subKey}.title`)}

                          {!variables.homePagesFilter?.searchTerm
                            ? null
                            : ` (${subData.length})`}

                          {!hint ? null : (
                            <Tooltip title={t(`${subKey}.hint`)}>
                              <Icon type="question-circle" />
                            </Tooltip>
                          )}
                        </>
                      }
                    >
                      {subData.map(({ id, isHomePage, ...page }) => (
                        <Item
                          key={id || 'id' /** TODO: should not be null */}
                          page={filter(itemFragment, {
                            ...page,
                            id,
                          })}
                          isHomePage={isHomePage}
                          variables={variables}
                          selectedPage={selectedPage}
                          setSelectedPage={setSelectedPage}
                          pageSettingId={pageSettingId}
                          setPageSettingId={setPageSettingId}
                          editVisibleId={editVisibleId}
                          setEditVisibleId={setEditVisibleId}
                        />
                      ))}
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ))}
          </div>
        </div>

        {!data.viewer?.store || !selectedPage ? (
          <div className={styles.notFound}>
            <h1>
              {t('not-find.0')}{' '}
              <span className={styles.keyword}>
                {variables.homePagesFilter?.searchTerm}
              </span>{' '}
              {t('not-find.1')}
            </h1>

            {t('try-another-word')}
          </div>
        ) : (
          <Previewer
            store={filter(previewerStoreFragment, data.viewer.store)}
            page={filter(previewerPageFragment, selectedPage)}
          />
        )}
      </div>
    );
  },
);

PageManager.getInitialProps = async () => ({
  namespacesRequired: ['page-manager'],
});

export default PageManager;
