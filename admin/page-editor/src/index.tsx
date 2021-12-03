// typescript import
import { NextPage } from 'next';

// import
import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import CookiesContext from '@meepshop/cookies';
import Page from '@meepshop/page';
import { useTranslation } from '@meepshop/locales';

import Editor from './editor';
import styles from './styles/index.less';

// graphql typescript
import {
  getPageEditorPage as getPageEditorPageType,
  getPageEditorPageVariables as getPageEditorPageVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { pageUserFragment, pagePageFragment } from '@meepshop/page/gqls';

import { getPageEditorPage } from './gqls';
import { editorFragment } from './editor/gqls';

// typescript definition
interface PropsType {
  pageId: string;
}

// definition
const PageEditor: NextPage<PropsType> = React.memo(
  ({ pageId }): React.ReactElement => {
    const { cookies } = useContext(CookiesContext);
    const { t } = useTranslation('page-editor');
    const { data, error, loading } = useQuery<
      getPageEditorPageType,
      getPageEditorPageVariablesType
    >(getPageEditorPage, {
      variables: {
        input: { pageId },
        identity: cookies.identity,
      },
    });

    if (loading || error || !data?.viewer?.store?.page)
      return <Spin indicator={<LoadingOutlined spin />} />;

    return (
      <Page
        viewer={filter(pageUserFragment, data.viewer)}
        page={filter(pagePageFragment, data.viewer.store.page)}
        cart={null}
      >
        <DndProvider backend={HTML5Backend}>
          <div className={styles.root}>
            {t('page-editor')}
            <Editor page={filter(editorFragment, data.viewer.store.page)} />
          </div>
        </DndProvider>
      </Page>
    );
  },
);

PageEditor.getInitialProps = async context => {
  const {
    query: { pageId },
  } = context;

  return {
    pageId: pageId as string,
    namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  };
};

export default PageEditor;
