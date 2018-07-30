import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import memoizeOne from 'memoize-one';
import { areEqual, warning, invariant } from 'fbjs';
import { upperFirst } from 'lodash';

import { root, shouldWatch, buildModules } from './cliOptions';
import parseFiles from './parseFiles';
import parseDescription from './parseDescription';
import { getValues as getPropTypesData } from './getPropTypesData';

const MODULES = buildModules.map(text => `/${text}`);

const METHOD_TEMPLATES = fs
  .readdirSync(path.resolve(root, './tool/templates/tests'))
  .filter(templateName => templateName !== 'index.ejs')
  .map(templateName => templateName.replace(/.ejs/, ''));

const handleCustomPropTypes = propTypesData => (raw, required) => {
  const isRequired = required || /.isRequired/.test(raw);
  const typeName = raw.replace(/\.isRequired/, '');
  const data = propTypesData[typeName].map(
    eachData => eachData?.func?.() || eachData,
  );

  invariant(
    !/build error/.test(data?.[0]),
    chalk`Custom propType {red (${typeName})} does not have test data.`,
  );

  return [...(isRequired || data.includes(null) ? [] : [null]), ...data];
};

const addTestData = (parentData, newData) => [
  ...((parentData || []).includes(null) ? [null] : []),
  ...newData,
];

const getParentData = (parentData, [dataName, ...otherDataNames]) => {
  if (otherDataNames.length === 0) {
    return [parentData[dataName]];
  }

  const [nextDataName] = otherDataNames;
  let result = [];

  (parentData[dataName] || []).forEach(data => {
    if (!data[nextDataName]) return;
    result = result.concat(getParentData(data, otherDataNames));
  });

  return result;
};

const handleTestData = (
  { displayName, props, testData },
  originParentData,
  isTesting,
) => {
  const parentData = { ...originParentData };
  let parentDataName = null;

  Object.keys(testData).forEach(key => {
    // eslint-disable-next-line react/destructuring-assignment
    const { description } = props[key];
    const { name: propType } = parseDescription(description, isTesting);

    if (propType !== '') parentDataName = propType;

    invariant(
      parentDataName !== null,
      chalk`You must set description before {red ${key}} in children components ({red ${displayName}}).`,
    );

    if (parentDataName === 'props') {
      parentData[key] = addTestData(parentData[key], testData[key]);
      return;
    }

    const parentDatas = getParentData(parentData, parentDataName.split(/\./));

    (shouldWatch ? warning : invariant)(
      parentDatas.length !== 0,
      chalk`

  Build fail with props {red ${parentDataName}} in {blueBright ${displayName}}
`,
    );

    (parentDatas.length === 0
      ? [parentData[parentDataName] || []]
      : parentDatas
    ).forEach(
      eachParentData =>
        /* eslint-disable no-param-reassign */
        eachParentData.forEach((parentTestData, parentTestDataIndex) => {
          if (!parentTestData) return;

          if (parentTestData.arrayOf) {
            eachParentData[parentTestDataIndex].arrayOf.forEach(
              (eachData, eachDataIndex) => {
                eachParentData[parentTestDataIndex].arrayOf[eachDataIndex][
                  key
                ] = addTestData(
                  eachParentData[parentTestDataIndex].arrayOf[eachDataIndex][
                    key
                  ],
                  testData[key],
                );
              },
            );
            return;
          }

          eachParentData[parentTestDataIndex][key] = addTestData(
            eachParentData[parentTestDataIndex][key],
            testData[key],
          );
        }),
      /* eslint-enable no-param-reassign */
    );
  });

  return parentData;
};

const handleTestMethods = ({ testMethods }, originParentMethods) => {
  const parentMethods = [...originParentMethods];

  testMethods.forEach(testMethod => {
    const { eventName, componentPaths, mockData } = testMethod;
    const parentMethodIndex = parentMethods.findIndex(
      ({ eventName: parentEventName }) => parentEventName === eventName,
    );

    if (parentMethodIndex === -1) {
      parentMethods.push(testMethod);
      return;
    }

    parentMethods[parentMethodIndex].componentPaths = [
      ...parentMethods[parentMethodIndex].componentPaths,
      ...componentPaths,
    ];

    parentMethods[parentMethodIndex].mockData = [
      ...parentMethods[parentMethodIndex].mockData,
      ...mockData,
    ];
  });

  return parentMethods;
};

const getData = (moduleName, componentsData, propTypesData, isTesting) => {
  const component = componentsData.find(
    ({ componentPath }) => componentPath === moduleName,
  );
  const { componentPath, childComponents, props, methods } = component;

  let isIgnored = false;
  let testData = Object.keys(props).reduce((result, key) => {
    // eslint-disable-next-line react/destructuring-assignment
    const { description, type, required } = props[key];
    const { name: propType, data: customData } = parseDescription(
      description,
      isTesting,
    );
    const data = getPropTypesData(
      // eslint-disable-next-line react/destructuring-assignment
      { ...props[key], description: propType },
      handleCustomPropTypes(propTypesData),
      isTesting,
    );

    if (propType === 'ignore') isIgnored = true;
    else if (propType !== '') isIgnored = false;

    if (isIgnored) return result;

    const newData = customData.length !== 0 ? customData : data;

    return {
      ...result,
      [key]: [
        ...((type.name === 'custom' && /\.isRequired/.test(type.raw)) ||
        required ||
        newData.includes(null)
          ? []
          : [null]),
        ...newData,
      ],
    };
  }, {});

  /** for tests */
  let testMethods = !isTesting
    ? []
    : [...methods]
        .filter(({ description }) => description)
        .reduce((result, { description }) => {
          const { name: eventName, data: mockData } = parseDescription(
            description,
            isTesting,
          );

          if (
            result.some(
              ({ eventName: resultEventName }) => resultEventName === eventName,
            ) ||
            !METHOD_TEMPLATES.includes(eventName)
          )
            return result;

          return [
            ...result,
            {
              componentPaths: [
                componentPath
                  .split(/\//g)
                  .map(eachPath => (!eachPath ? '' : upperFirst(eachPath)))
                  .join('/'),
              ],
              eventName,
              mockData: [mockData],
            },
          ];
        }, []);

  childComponents.forEach(childComponentName => {
    const childComponentData = getData(
      path.resolve(componentPath, childComponentName),
      componentsData,
      propTypesData,
      isTesting,
    );

    testData = handleTestData(childComponentData, testData, isTesting);

    /** for tests */
    if (isTesting) {
      testMethods = handleTestMethods(childComponentData, testMethods);
    }
  });

  return {
    ...component,
    testData,
    testMethods,
  };
};

const build = (componentsData, propTypesData, isTesting) =>
  MODULES.map(moduleName =>
    getData(moduleName, componentsData, propTypesData, isTesting),
  );

const handleCheckingFunc = data => {
  if (data instanceof Array) {
    return data.map(d => (!d?.func ? d : { func: d.func.toString() }));
  }

  return [
    ...Object.keys(data.props).map(key => ({
      key,
      data: data.props[key],
    })),
    ...Object.keys(data.methods).map(key => ({
      key,
      data: data.methods[key],
    })),
  ];
};

const checkMemoizeOne = (preData, newData) => {
  if (typeof preData === 'boolean') return true;

  return !Object.keys(preData).reduce(
    (result, key) =>
      result ||
      !areEqual(
        handleCheckingFunc(preData[key]),
        handleCheckingFunc(newData[key]),
      ),
    false,
  );
};

const memoizeOneStories = memoizeOne(build, checkMemoizeOne);
const memoizeOneTests = memoizeOne(build, checkMemoizeOne);

/**
 * @param {Boolean} isTesting - use for test.
 * If isTesting is false, testRandom will return all data.
 * If isTesting is ture, give one of data with random index.
 */
export default isTesting => {
  const { componentsData, propTypesData } = parseFiles(isTesting);

  return isTesting
    ? memoizeOneTests(componentsData, propTypesData, isTesting)
    : memoizeOneStories(componentsData, propTypesData, isTesting);
};
