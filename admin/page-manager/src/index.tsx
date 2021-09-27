// typescript import
import { NextPage } from 'next';

// import
import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Input, Collapse, Button } from 'antd';

import Tooltip from '@admin/tooltip';
import { useTranslation } from '@meepshop/locales';

import AddNewPage from './addNewPage';
import Item from './item';
import Previewer from './Previewer';
import useLoadMorePages from './hooks/useLoadMorePages';
import usePages from './hooks/usePages';
import useSelectedPage from './hooks/useSelectedPage';
import styles from './styles/index.less';

// graphql typescript
import {
  PageTypeEnum,
  getPages as getPagesType,
  getPagesVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { itemPageFragment } from './item/gqls';
import { getPages } from './gqls';
import {
  previewerStoreFragment,
  previewerPageFragment,
} from './gqls/previewer';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
}

// definition
const { Search } = Input;
const { Panel } = Collapse;

const PageManager: NextPage<PropsType> = React.memo(
  (): React.ReactElement => {
    const { t } = useTranslation('page-manager');
    const { loading, error, data, variables, refetch, fetchMore } = useQuery<
      getPagesType,
      getPagesVariables
    >(getPages, {
      variables: {
        homePagesFilter: { type: 'HOME' as PageTypeEnum },
        customPagesFilter: { type: 'CUSTOM' as PageTypeEnum },
        productTemplatePageFilter: { type: 'TEMPLATE' as PageTypeEnum },
      },
    });
    const pages = usePages(data || null, variables);
    const loadMorePages = useLoadMorePages(fetchMore, variables);
    const {
      selectedPage,
      setSelectedPage,
      collapseActiveKey,
      setCollapseActiveKey,
    } = useSelectedPage(pages, variables, loading);
    const [pageSettingId, setPageSettingId] = useState<string | null>(null);
    const [editVisibleId, setEditVisibleId] = useState<string | null>(null);

    if (error || !data) return <Spin indicator={<LoadingOutlined spin />} />;

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
                  ...variables,
                  homePagesFilter: {
                    ...variables.homePagesFilter,
                    searchTerm: value,
                  },
                  customPagesFilter: {
                    ...variables.customPagesFilter,
                    searchTerm: value,
                  },
                  productTemplatePageFilter: {
                    ...variables.productTemplatePageFilter,
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
                  {pageData.map(
                    ({ key: subKey, data: subData, pageInfo, hint }) => (
                      <Panel
                        key={subKey}
                        header={
                          <>
                            {t(`${subKey}.title`)}

                            {!variables.homePagesFilter?.searchTerm
                              ? null
                              : ` (${subData.length})`}

                            {!hint ? null : (
                              <Tooltip
                                overlayClassName={styles.tooltip}
                                title={hint}
                              />
                            )}
                          </>
                        }
                      >
                        {subData.map(({ id, ...page }) => (
                          <Item
                            key={id || 'id' /** SHOULD_NOT_BE_NULL */}
                            page={filter(itemPageFragment, {
                              ...page,
                              id,
                            })}
                            variables={variables}
                            selectedPage={selectedPage}
                            setSelectedPage={setSelectedPage}
                            pageSettingId={pageSettingId}
                            setPageSettingId={setPageSettingId}
                            editVisibleId={editVisibleId}
                            setEditVisibleId={setEditVisibleId}
                          />
                        ))}

                        {!(
                          pageInfo?.hasNextPage &&
                          (subKey === 'home-page' ||
                            subKey === 'custom-page' ||
                            subKey === 'template-page')
                        ) ? null : (
                          <div className={styles.seeMore}>
                            {subData.length < 40 ? (
                              <Button
                                loading={loading}
                                onClick={() => loadMorePages(subKey, pageInfo)}
                              >
                                {t('see-more')}
                              </Button>
                            ) : (
                              <VisibilitySensor
                                partialVisibility
                                onChange={isVisible => {
                                  if (isVisible)
                                    loadMorePages(subKey, pageInfo);
                                }}
                              >
                                <Spin />
                              </VisibilitySensor>
                            )}
                          </div>
                        )}
                      </Panel>
                    ),
                  )}
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
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
});

export default PageManager;
