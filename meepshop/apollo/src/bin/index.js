#! /usr/bin/env node
// import
import fs from 'fs';
import path from 'path';

import fetch from 'isomorphic-unfetch';

// definition
const EXCLUDE_TYPE_POLICIES = [
  'Query',
  'Mutation',
  '__Schema',
  '__Type',
  '__Field',
  '__InputValue',
  '__EnumValue',
  '__Directive',
];

process.on('unhandledRejection', e => {
  throw e;
});

(async () => {
  const { data, errors } = await fetch(
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
              fields {
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
  const cacheConfig = data.__schema.types.reduce(
    ({ possibleTypes, typePolicies }, type) => ({
      possibleTypes: !type.possibleTypes
        ? possibleTypes
        : {
            ...possibleTypes,
            [type.name]: type.possibleTypes.map(subType => subType.name),
          },
      typePolicies:
        type.kind !== 'OBJECT' ||
        /(Response|Error)$/.test(type.name) ||
        type.fields.some(({ name }) => name === 'id') ||
        EXCLUDE_TYPE_POLICIES.includes(type.name)
          ? typePolicies
          : {
              ...typePolicies,
              [type.name]: { merge: true },
            },
    }),
    {
      possibleTypes: {},
      typePolicies: {},
    },
  );

  fs.writeFileSync(
    path.resolve(__dirname, '../../cacheConfig.json'),
    JSON.stringify(cacheConfig),
  );
})();
