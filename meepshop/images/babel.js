// import
const nodePath = require('path');
const crypto = require('crypto');

require('dotenv').config({ path: nodePath.resolve(__dirname, '../../.env') });
const { declare } = require('@babel/helper-plugin-utils');
const { default: Imgproxy } = require('imgproxy');
const dirTree = require('directory-tree');
const d3 = require('d3-hierarchy');

// definition
const hash = crypto
  .createHash('md5')
  .update('@meepshop/images')
  .digest('hex');
const imgproxy = new Imgproxy({
  baseUrl: 'https://img.meepshop.com/',
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true,
});
const imageFolder = nodePath.resolve(__dirname, './images');
const imageList = d3
  .hierarchy(dirTree(imageFolder, { extensions: /\.(svg|png|jpg|jpeg)$/ }))
  .leaves()
  .reduce((result, { data: { path, extension } }) => {
    const filePath = nodePath.relative(imageFolder, path);
    const key = filePath
      .replace(extension, '')
      .split(/\//)
      .reduce(
        (filePathKeyResult, filePathKey, index) =>
          `${filePathKeyResult}${
            index === 0 ? filePathKey[0] : filePathKey[0].toUpperCase()
          }${filePathKey.slice(1)}`,
        '',
      );

    return {
      ...result,
      [key]: filePath,
    };
  }, {});

const getUrl = (key, type, width, height) =>
  [
    !width ? null : result => result.width(width),
    !height ? null : result => result.height(height),
    result =>
      result.generateUrl(
        `gs://img.meepcloud.com/assets/${type}/${imageList[key]}`,
      ),
  ]
    .filter(Boolean)
    .reduce((result, func) => func(result), imgproxy.builder());

module.exports = declare(({ assertVersion, types: t }) => {
  const cache = {};

  assertVersion(7);

  return {
    pre: () => {
      cache.useImagesContext = false;
      cache.images = [];
    },
    visitor: {
      ImportDeclaration: path => {
        if (!t.isLiteral(path.node.source, { value: '@meepshop/images' }))
          return;

        path.get('specifiers').forEach(specifier => {
          if (t.isImportDefaultSpecifier(specifier))
            cache.useImagesContext = true;

          if (t.isImportSpecifier(specifier))
            cache.images.push({
              key: specifier.node.imported.name,
              localKey: specifier.node.local.name,
            });

          if (t.isImportNamespaceSpecifier(specifier))
            cache.images.push({
              key: hash,
              localKey: specifier.node.local.name,
            });
        });

        if (cache.useImagesContext)
          path.replaceWith(
            t.importDeclaration(
              [t.importDefaultSpecifier(t.identifier('ImagesContext'))],
              t.stringLiteral(
                process.env.NODE_ENV === 'test'
                  ? '@meepshop/images/src/ImagesContext'
                  : '@meepshop/images/lib/ImagesContext',
              ),
            ),
          );
        else path.remove();

        path.addComments('leading', [
          { type: 'CommentBlock', value: 'compiled by @meepshop/images' },
        ]);
      },
      Identifier: path => {
        const image = cache.images.find(
          ({ localKey }) => path.node.name === localKey,
        );

        if (!image) return;

        path.addComments('inner', [
          { type: 'CommentBlock', value: 'compiled by @meepshop/images' },
        ]);

        if (image.key === hash) {
          path
            .getStatementParent()
            .insertBefore(
              t.ifStatement(
                t.binaryExpression(
                  '===',
                  t.memberExpression(
                    t.memberExpression(
                      t.identifier('process'),
                      t.identifier('env'),
                    ),
                    t.identifier('NODE_ENV'),
                  ),
                  t.stringLiteral('production'),
                ),
                t.throwStatement(
                  t.newExpression(t.identifier('Error'), [
                    t.stringLiteral(
                      `Can not use \`import * as ${image.localKey} from '@meepshop/images';\` in the production mode.`,
                    ),
                  ]),
                ),
              ),
            );
          path.replaceWith(
            t.objectExpression(
              Object.keys(imageList).map(key =>
                t.objectProperty(
                  t.identifier(key),
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier('stage'),
                      t.stringLiteral(getUrl(key, 'stage')),
                    ),
                    t.objectProperty(
                      t.identifier('prod'),
                      t.stringLiteral(getUrl(key, 'production')),
                    ),
                  ]),
                ),
              ),
            ),
          );
          return;
        }

        const { key, width, height } = image.key
          .split(/_/)
          .reduce((result, str) => {
            if (/^w/.test(str))
              return {
                ...result,
                width: str.replace(/^w/, ''),
              };

            if (/^h/.test(str))
              return {
                ...result,
                height: str.replace(/^h/, ''),
              };

            return {
              ...result,
              key: str,
            };
          }, {});

        if (!imageList[key])
          throw path.buildCodeFrameError(`Can not find image key: \`${key}\``);

        path.replaceWith(
          t.objectExpression([
            t.objectProperty(
              t.identifier('stage'),
              t.stringLiteral(getUrl(key, 'stage', width, height)),
            ),
            t.objectProperty(
              t.identifier('prod'),
              t.stringLiteral(getUrl(key, 'production', width, height)),
            ),
          ]),
        );
      },
    },
    post: ({ opts: { filename }, path }) => {
      if (filename !== nodePath.resolve(__dirname, './src/types.ts')) return;

      path.replaceWith(
        t.program([
          t.throwStatement(
            t.newExpression(t.identifier('Error'), [
              t.stringLiteral('This file is only for typescript.'),
            ]),
          ),
        ]),
      );
    },
  };
});
