import postGraphql from 'utils/postGraphql';
import { webTrackQuery } from './query';

export default async function({ isServer = true, XMeepshopDomain }) {
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
      active
      pixelId
    }
    getGtagList {
      type
      eventName
      active
      code
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
}
