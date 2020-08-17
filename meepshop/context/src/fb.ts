// import
import React from 'react';

// definition
export const version = 'v8.0';

export const defaultAppId = '286359492558905';

export default React.createContext<{
  fb: typeof window['FB'] | null;
  appId: string;
  version: 'v8.0';
}>({
  fb: null,
  appId: defaultAppId,
  version,
});
