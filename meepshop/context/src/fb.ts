// import
import React from 'react';

// definition
export const version = 'v5.0';

export default React.createContext<{
  fb: typeof window['FB'] | null;
  appId: string | null;
  version: 'v5.0';
}>({
  fb: null,
  appId: null,
  version,
});
