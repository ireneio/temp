// typescript import
import { NextPage } from 'next';

// import
import React from 'react';
import { useQuery } from '@apollo/client';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Page from '@meepshop/page';
import filter from '@meepshop/utils/lib/filter';

import Editor from './editor';
import Sidebar from './sidebar';
import Header from './Header';
import styles from './styles/index.less';

// graphql typescript
import {
  getPageEditorPage as getPageEditorPageType,
  getPageEditorPageVariables as getPageEditorPageVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { pageUserFragment, pagePageFragment } from '@meepshop/page/gqls';

import { getPageEditorPage } from './gqls';
import { headerStoreFragment } from './gqls/header';
import { sidebarFragment } from './sidebar/gqls';
import { editorFragment } from './editor/gqls';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: boolean;
  pageId: string;
}

// definition
const PageEditor: NextPage<PropsType> = React.memo(
  ({ pageId }): React.ReactElement => {
    const { data, error, loading } = useQuery<
      getPageEditorPageType,
      getPageEditorPageVariablesType
    >(getPageEditorPage, {
      variables: {
        input: { pageId },
      },
    });

    if (loading || error || !data?.viewer?.store?.page)
      return <Spin indicator={<LoadingOutlined spin />} />;

    return (
      <DndProvider backend={HTML5Backend}>
        <div className={styles.root}>
          <Sidebar Store={filter(sidebarFragment, data.viewer.store)} />

          <div className={styles.content}>
            <Header store={filter(headerStoreFragment, data.viewer.store)} />

            <div className={styles.editor}>
              <Page
                viewer={filter(pageUserFragment, data.viewer)}
                page={filter(pagePageFragment, data.viewer.store.page)}
                cart={null}
                disabledFooter
              >
                <Editor page={filter(editorFragment, data.viewer.store.page)} />
              </Page>
            </div>
          </div>
        </div>
      </DndProvider>
    );
  },
);

PageEditor.getInitialProps = async ({ query: { pageId } }) => {
  // FIXME: should use get getServerSideProps return notFound
  if (typeof pageId !== 'string')
    throw new Error('[FIXME] orderId is undefined');

  return {
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
    noWrapper: true,
    pageId: pageId as string,
  };
};

export default PageEditor;
