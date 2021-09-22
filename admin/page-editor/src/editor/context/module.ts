// typescript import
import { Dispatch, SetStateAction } from 'react';

// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// graphql typescript
import { editorFragment_modules as editorFragmentModules } from '@meepshop/types/gqls/admin';

// definition
export default React.createContext<{
  setModules: Dispatch<SetStateAction<editorFragmentModules[] | null>>;
  modules: editorFragmentModules[] | null;
}>({
  setModules: emptyFunction,
  modules: null,
});
