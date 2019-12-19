// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';

import { withTranslation } from '@store/utils/lib/i18n';

import styles from './styles/notFound.less';

// graphql typescript
import { notFoundFragment as notFoundFragmentType } from './__generated__/notFoundFragment';

// typescript definition
interface PropsType extends I18nPropsType {
  user?: notFoundFragmentType | null;
}

// definition
export const notFoundFragment = gql`
  fragment notFoundFragment on User {
    name
    email
  }
`;

export default withTranslation('member-order')(({ user, t }: PropsType) => (
  <div className={styles.root}>
    <h4>{`Hi, ${user?.name || ''} (${user?.email || ''})`}</h4>

    <h1>{t('not-found')}</h1>
  </div>
));
