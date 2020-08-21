import postGraphql from 'utils/postGraphql';
import { webTrackQuery } from './query';

export default async ({ isServer = true, XMeepshopDomain }) => {
  const variables = {
    keys: '$webTrackSearch: searchInputObjectType',
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
              query: 'google_tag_manager',
            },
          ],
        },
      },
    },
  };

  const query = `
    getFbPixel {
      pixelId
    }
    getGtagList {
      type
      eventName
      code
      trackingId
    }
    getWebTrackList(search: $webTrackSearch) {
      data {
        ${webTrackQuery}
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
};
