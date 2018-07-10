import getConfig from 'next/config';

const {
  publicRuntimeConfig: { EXTERNAL_API_HOST },
} = getConfig();

/**
 * @name getApiUrl
 * @param path
 * @returns whole pathname
 */
export default path => `${EXTERNAL_API_HOST}${path}`;
