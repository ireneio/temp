// typescript import
import { ReturnType as CustomType } from './hooks/useCustom';
import { ReturnType as PageViewType } from './hooks/usePageView';

// import
import React from 'react';
import { emptyFunction } from 'fbjs';

import Head from './Head';
import useCustom from './hooks/useCustom';
import usePageView from './hooks/usePageView';

// typescript definition
export interface AdTrackType {
  custom: CustomType;
  pageView: PageViewType;
}

interface PropsType {
  children: React.ReactNode;
}

// definition
const defaultAdTrack = {
  pageView: emptyFunction,
  custom: emptyFunction,
};

export const AdTrackContext = React.createContext<AdTrackType>(defaultAdTrack);

export default React.memo(({ children }: PropsType) => {
  const custom = useCustom();
  const pageView = usePageView();

  return (
    <>
      <Head />

      <AdTrackContext.Provider value={{ ...defaultAdTrack, custom, pageView }}>
        {children}
      </AdTrackContext.Provider>
    </>
  );
});
