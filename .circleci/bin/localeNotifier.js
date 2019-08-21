#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const invariant = require('fbjs/lib/invariant');
const areEqual = require('fbjs/lib/areEqual');
const fetch = require('node-fetch');

const pkgName = require('./getPackageName');

const HOOK_URL =
  'https://hooks.glip.com/webhook/a86a81ec-fbd0-4a7c-8f34-2135d18d1309';
const BOT_IMAGE_URL =
  'https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png';
const ROOT_FOLDER = path.resolve('./src/static/locales');
const URL_FOLDER = `https://github.com/meepshop/meep-lerna/tree/master/${path.relative(
  path.resolve(__dirname, '../..'),
  ROOT_FOLDER,
)}`;
const LOCAL_KEYS = fs.readdirSync(ROOT_FOLDER).sort(a => a !== 'zh_TW');

const findNullLocales = (filename, data, nullLocales = [], preKey = []) => {
  const keys = Object.keys(data[LOCAL_KEYS[0]]);

  invariant(
    !LOCAL_KEYS.some(
      localeKey => !areEqual(keys, Object.keys(data[localeKey])),
    ),
    chalk`Keys should be the same in {green ${filename}.json}, but get\n\n${LOCAL_KEYS.map(
      localeKey =>
        chalk`{bold ${localeKey}}: {gray ${[
          ...preKey,
          `[${Object.keys(data[localeKey]).join(', ')}]`,
        ].join('.')}}`,
    ).join('\n')}\n`,
  );

  return keys.reduce((result, key) => {
    if (LOCAL_KEYS.some(localeKey => !data[localeKey][key]))
      return [...result, [...preKey, key]];

    if (LOCAL_KEYS.some(localeKey => data[localeKey][key] instanceof Object))
      return findNullLocales(
        filename,
        LOCAL_KEYS.reduce(
          (newLocale, localeKey) => ({
            ...newLocale,
            [localeKey]: data[localeKey][key],
          }),
          {},
        ),
        result,
        [...preKey, key],
      );

    return result;
  }, nullLocales);
};

const locales = LOCAL_KEYS.reduce(
  (result, locale) =>
    fs
      .readdirSync(path.resolve(ROOT_FOLDER, locale))
      .filter(filename => /\.json$/.test(filename))
      .reduce(
        (prevLocales, filename) => ({
          ...prevLocales,
          [filename.replace(/\.json$/, '')]: {
            ...prevLocales[filename.replace(/\.json$/, '')],
            // eslint-disable-next-line global-require, import/no-dynamic-require
            [locale]: require(path.resolve(ROOT_FOLDER, locale, filename)),
          },
        }),
        result,
      ),
  {},
);

const postMessage = title =>
  fetch(HOOK_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      icon: BOT_IMAGE_URL,
      activity: 'locale bot',
      title,
    }),
  })
    .then(res => res.json())
    .then(({ status, message }) => {
      if (status === 'OK') return null;

      return fetch(HOOK_URL, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          icon: BOT_IMAGE_URL,
          activity: 'locale bot',
          title: message,
        }),
      });
    });

process.on('unhandledRejection', e => {
  throw e;
});

(async () => {
  const messages = Object.keys(locales).reduce(
    (result, filename) => {
      const nullLocales = findNullLocales(filename, locales[filename]);

      if (nullLocales.length === 0) return result;

      const newTitle = [
        `| **${pkgName}@${filename}** |${[].constructor
          .apply({}, new Array(LOCAL_KEYS.length))
          .join('|')}|`,
        `| | **${LOCAL_KEYS.map(
          localeKey =>
            `[${localeKey}](${URL_FOLDER}/${localeKey}/${filename}.json)`,
        ).join('** | **')}** |`,
      ];

      nullLocales.forEach(keys => {
        newTitle.push(
          `| **${keys.join('.')}** | ${LOCAL_KEYS.map(
            localeKey =>
              keys.reduce(
                (newData, key) => newData[key],
                locales[filename][localeKey],
              ) || '待補',
          ).join(' | ')} |`,
        );
      });

      const resultIndex = result.length - 1;
      const newMessage = [...result[resultIndex], ...newTitle];

      if (newMessage.length > 50) return [...result, newTitle];

      // eslint-disable-next-line no-param-reassign
      result[resultIndex] = newMessage;
      return result;
    },
    [[]],
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const message of messages) {
    if (process.argv[2] === '--send') {
      // eslint-disable-next-line no-await-in-loop
      await postMessage(message.join('\n'));
      // eslint-disable-next-line no-await-in-loop
      await postMessage(
        `[code]${message.join('\n').replace(/\[(.*?)\]\(.*?\)/g, '$1')}[/code]`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.log(
        message
          .join('\n')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .replace(/\*\*/g, ''),
      );
    }
  }
})();
