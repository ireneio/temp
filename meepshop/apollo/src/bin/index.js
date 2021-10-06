#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import { fetchWithRetries } from 'fbjs';

// definition
process.on('unhandledRejection', e => {
  throw e;
});

(async () => {
  const { data, errors } = await fetchWithRetries(
    'https://api.stage.meepcloud.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-meepshop-domain': 'bellatest.stage.meepcloud.com',
      },
      body: JSON.stringify({
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
      }),
    },
  ).then(res => res.json());

  if (errors) throw new Error(JSON.stringify(errors));

  // eslint-disable-next-line no-underscore-dangle
  data.__schema.types = data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../../fragmentTypes.json'),
    JSON.stringify(data),
  );
})();
