// import
require('core-js/modules/es.string.match-all');
const { declare } = require('@babel/helper-plugin-utils');

// definition
const mergeTransform = transform => {
  const transformObj = [
    ...transform.matchAll(/([\w]+)\(([.-\d]+(,[ ]?[.-\d]+)*)\)/g),
  ].reduce((result, match) => {
    const key = match[1];
    const value = match[2];

    switch (key) {
      case 'translate': {
        const [[x], [y]] = [...value.matchAll(/([-.\d]+)/g)];

        // eslint-disable-next-line no-param-reassign
        if (!result.translate) result.translate = { x: 0, y: 0 };

        return {
          ...result,
          translate: {
            x: result.translate.x + parseInt(x, 10),
            y: result.translate.y + parseInt(y, 10),
          },
        };
      }

      default:
        return {
          ...result,
          [key]: [...(result[key] || []), `${key}(${value})`],
        };
    }
  }, {});

  return Object.keys(transformObj)
    .reduce((result, key) => {
      switch (key) {
        case 'translate': {
          const { x, y } = transformObj[key];

          return x === 0 && y === 0
            ? result
            : [...result, `translate(${x}, ${y})`];
        }

        default:
          return [...result, transformObj[key].join(' ')];
      }
    }, [])
    .join(' ');
};

module.exports = declare(
  ({ assertVersion, types: t }, { keepSize = false }) => {
    assertVersion(7);

    const JSXAttribute = path => {
      switch (path.get('name').node.name) {
        case 'width':
        case 'height':
          if (
            !keepSize &&
            t.isJSXIdentifier(path.parentPath.get('name').node, { name: 'svg' })
          )
            path.remove();
          break;

        case 'version':
        case 'xmlns':
        case 'id':
        case 'fill':
        case 'stroke':
        case 'stroke-width':
        case 'mask':
        case 'filter':
          path.remove();
          break;

        case 'viewBox':
          if (!keepSize && path.get('value').node.value === '0 0 1024 1024')
            path.get('value').replaceWith(t.stringLiteral('64 64 896 896'));
          break;

        case 'fill-rule':
          path.replaceWith(
            t.jSXAttribute(
              t.jSXIdentifier('fillRule'),
              t.stringLiteral(path.get('value').node.value),
            ),
          );
          break;

        case 'fill-opacity':
          path.replaceWith(
            t.jSXAttribute(
              t.jSXIdentifier('fillOpacity'),
              t.stringLiteral(path.get('value').node.value),
            ),
          );
          break;

        case 'transform': {
          const transform = mergeTransform(path.get('value').node.value);

          if (!transform) path.remove();
          else path.get('value').replaceWith(t.stringLiteral(transform));
          break;
        }

        default:
          break;
      }
    };

    const mergeAttributes = attributePaths =>
      attributePaths.reduce((result, attributePath) => {
        JSXAttribute(attributePath);

        if (!attributePath.node) return result;

        const attributeName = attributePath.get('name').node.name;
        const existingAttributeIndex = result.findIndex(
          prevAttribute => prevAttribute.name.name === attributeName,
        );

        if (existingAttributeIndex === -1)
          return [...result, attributePath.node];

        switch (attributeName) {
          case 'transform':
            attributePath
              .get('value')
              .replaceWith(
                t.stringLiteral(
                  `${result[existingAttributeIndex].value.value} ${
                    attributePath.get('value').node.value
                  }`,
                ),
              );
            break;

          default:
            break;
        }

        // eslint-disable-next-line no-param-reassign
        result[existingAttributeIndex] = attributePath.node;

        return result;
      }, []);

    const isComponent = path =>
      t.isJSXElement(path.node) ||
      (t.isCallExpression(path.node) &&
        t.isIdentifier(path.get('callee.object').node, { name: 'React' }) &&
        t.isIdentifier(path.get('callee.property').node, {
          name: 'createElement',
        }));

    const removeTags = path => {
      const componentName = path.get('openingElement.name').node.name;

      if (['title', 'desc', 'defs', 'mask'].includes(componentName))
        path.remove();

      if (componentName === 'rect') {
        const isTransparentRect = path
          .get('openingElement.attributes')
          .some(
            attribute =>
              attribute.get('name').node.name === 'opacity' &&
              attribute.get('value').node.value === '0',
          );

        if (isTransparentRect) path.remove();
      }
    };

    const mergeGTag = path => {
      const childPaths = path.get('children').filter(isComponent);

      childPaths.forEach(childPath => {
        removeTags(childPath);
      });

      if (
        childPaths.length === 1 &&
        childPaths[0].get('openingElement.name').node.name === 'g'
      )
        mergeGTag(childPaths[0]);

      if (
        !isComponent(path.parentPath) ||
        path.parentPath.get('openingElement.name').node.name !== 'g' ||
        path.parentPath.get('children').filter(isComponent).length !== 1
      )
        return;

      const parentOpeningElementPath = path.parentPath.get('openingElement');
      const currentOpeningElementPath = path.get('openingElement');

      path.parentPath.replaceWith(
        t.jsxElement(
          t.jSXOpeningElement(
            parentOpeningElementPath.get('name').node,
            mergeAttributes([
              ...parentOpeningElementPath.get('attributes'),
              ...currentOpeningElementPath.get('attributes'),
            ]),
            currentOpeningElementPath.node.selfClosing,
          ),
          path.parentPath.get('closingElement'),
          path.get('children').map(child => child.node),
          path.node.selfClosing,
        ),
      );
    };

    return {
      visitor: {
        JSXElement: path => {
          switch (path.get('openingElement.name').node.name) {
            case 'svg':
              path
                .get('openingElement.attributes.0')
                .insertBefore(t.jSXSpreadAttribute(t.identifier('props')));
              break;

            case 'g':
              mergeGTag(path);
              break;

            default:
              removeTags(path);
              break;
          }
        },
        JSXAttribute,
      },
    };
  },
);
