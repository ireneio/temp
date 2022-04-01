// import
import React from 'react';

// typescript definition
type windowFBType = NonNullable<typeof window['FB']>;

export interface FbType extends Omit<windowFBType, 'login'> {
  login: (redirectPath?: string) => Promise<void>;
}

interface FbContextType {
  fb: FbType | null;
  appId: string;
  version: string;
  isLoginEnabled: boolean;
}

// definition
export const version = 'v12.0';

export const defaultAppId = '286359492558905';

export default React.createContext<FbContextType>({
  fb: null,
  appId: defaultAppId,
  version,
  isLoginEnabled: false,
});
