// import
import React from 'react';

// typescript definition
type windowFBType = NonNullable<typeof window['FB']>;

export interface FbType extends Omit<windowFBType, 'login'> {
  login: (redirectPath?: string) => void;
}

// definition
export const version = 'v12.0';

export const defaultAppId = '286359492558905';

export default React.createContext<{
  fb: FbType | null;
  appId: string;
  version: typeof version;
  isLoginEnabled: boolean;
}>({
  fb: null,
  appId: defaultAppId,
  version,
  isLoginEnabled: false,
});
