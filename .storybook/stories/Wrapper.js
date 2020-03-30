import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import nextI18next from 'next-i18next';

import MockTypes from '@meepshop/mock-types';

// eslint-disable-next-line import/extensions, import/no-unresolved
import '../combined.less';

const defaultResolvers = {
  initializeCache: () => {},
  introspectionQueryResultDataType: [],
  default: {},
};

export default React.memo(({ resolvers = defaultResolvers, children }) => (
  <I18nextProvider i18n={nextI18next.i18n}>
    <MockTypes {...resolvers}>
      <Suspense fallback="loading">{children}</Suspense>
    </MockTypes>
  </I18nextProvider>
));
