// typescript import
import getConfig from 'next/config';

// typescript definition
interface UrlsType {
  stage: string;
  production: string;
}

// definition
const {
  publicRuntimeConfig: { ENV },
} = getConfig();

export default (urls: UrlsType): string => urls[ENV as keyof UrlsType];
