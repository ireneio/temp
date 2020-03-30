// typescript import
import NextApp, { AppContext, AppProps } from 'next/app';

// import
import React from 'react';

// typescript definition
interface PropsType extends AppProps {
  STORE_TYPE: 'stage' | 'prod';
}

interface UrlsType {
  stage: string;
  prod: string;
}

// definition
const ImagesContext = React.createContext((urls: UrlsType) => urls.stage);

export const withImages = (App: typeof NextApp): React.ReactNode => {
  let storeType: PropsType['STORE_TYPE'];
  const getUrl = (urls: UrlsType): string => urls[storeType];
  const WithImages = ({ STORE_TYPE, ...props }: PropsType): React.ReactNode => {
    storeType = storeType || STORE_TYPE;

    return (
      <ImagesContext.Provider value={getUrl}>
        <App {...props} />
      </ImagesContext.Provider>
    );
  };

  WithImages.getInitialProps = async (ctx: AppContext) => ({
    ...(await App.getInitialProps(ctx)),
    STORE_TYPE: process.env.STORE_TYPE,
  });

  return WithImages;
};

export default ImagesContext;
