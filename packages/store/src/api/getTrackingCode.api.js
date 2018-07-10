import postGraphql from 'lib/postGraphql';
import { pageAdTrackQuery, webTrackQuery } from './query';

export default async function({ isServer = true, XMeepshopDomain }) {
  const variables = {
    keys:
      '$webTrackSearch: searchInputObjectType, $adTrackSearch: PageAdTrackInfoInput',
    type: 'query getTrackingCode',
    values: {
      webTrackSearch: {
        filter: {
          or: [
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_webmaster',
            },
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_adwords',
            },
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_tag_manager',
            },
          ],
        },
      },
      adTrackSearch: {
        page: 'initCode',
      },
    },
  };

  const query = `
    getWebTrackList(search: $webTrackSearch) {
      data {
        ${webTrackQuery}
      }
    }
    getPageAdTrack(getPageAdTrack: $adTrackSearch) {
      data {
        ${pageAdTrackQuery}
      }
    }
  `;

  const response = await postGraphql({
    query,
    variables,
    isServer,
    XMeepshopDomain,
  });
  return response;
}
