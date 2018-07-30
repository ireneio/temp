#!/usr/bin/env node

import nodeFs from 'fs';
import path from 'path';

import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';
import moment from 'moment';
import chokidar from 'chokidar';
import { invariant, warning } from 'fbjs';
import { lowerFirst } from 'lodash';

import { root, shouldWatch, buildMode } from './core/cliOptions';
import getFilesTree from './core/getFilesTree';
import needToParse from './core/needToParse';
import buildDataTree from './core/buildDataTree';
import buildTestData from './core/buildTestData';

const store = memFs.create();
const fs = editor.create(store);
const templateRoot = path.resolve(root, './tool/templates');

const commitWriteFiles = (taskName, task) => {
  if (!buildMode.includes(taskName)) return;

  const startTime = moment();

  task();

  const time = moment().diff(startTime);
  const now = chalk`{gray ${moment().format('YYYY/MM/DD HH:mm:ss')}}`;

  /** write */
  fs.commit(err =>
    console.log(
      err
        ? chalk`{bgRed  meep-ui } can not update {blueBright ${taskName}} in {cyan ${time}} ms\n${now}`
        : chalk`{bgGreen  meep-ui } update {blueBright ${taskName}} in {cyan ${time}} ms\n${now}`,
    ),
  );
};

const writeFiles = () => {
  try {
    /** prepare: write stories */
    commitWriteFiles('storybook', () => {
      const dataTree = buildDataTree(false);

      fs.copyTpl(
        path.resolve(templateRoot, './storybook/index.ejs'),
        path.resolve(root, './.storybook/.cache/index.js'),
        {
          stories: dataTree.map(({ displayName }) => lowerFirst(displayName)),
        },
      );

      dataTree.forEach(({ displayName, testData: storyData }) => {
        const moduleRoot = path.resolve(
          root,
          `./src/${lowerFirst(displayName)}/__story__`,
        );

        fs.copyTpl(
          path.resolve(templateRoot, './storybook/story.ejs'),
          path.resolve(moduleRoot, './.cache/index.js'),
          {
            displayName,
            storyData,
            hasCustomStory: nodeFs.existsSync(
              path.resolve(moduleRoot, './index.js'),
            ),
          },
        );
      });
    });

    /** prepare: write tests */
    commitWriteFiles('test', () => {
      const dataTree = buildDataTree(true);

      dataTree.forEach(({ displayName, testData, testMethods }) => {
        const testProps = buildTestData(testData);
        const testRoot = path.resolve(
          root,
          `./src/${lowerFirst(displayName)}/__tests__`,
        );
        const customTests = !nodeFs.existsSync(testRoot)
          ? []
          : nodeFs
              .readdirSync(testRoot)
              .filter(
                fileName =>
                  !['.cache', 'testData.js'].includes(fileName) &&
                  /.*.js$/.test(fileName),
              )
              .map(eventName => {
                (shouldWatch ? warning : invariant)(
                  !testMethods.some(
                    ({ eventName: testEventName }) =>
                      testEventName === eventName,
                  ),
                  chalk`
  {red ${eventName}} does exist. Please rename the test files.
`,
                );

                return {
                  eventName: eventName.replace(/.js$/, ''),
                  hasCustomTest: true,
                };
              });
        const tests = [...testMethods, ...customTests];

        (tests.length !== 0
          ? tests
          : [
              {
                eventName: 'build',
              },
            ]
        ).forEach(
          ({
            eventName,
            componentPaths = [],
            mockData = [],
            hasCustomTest = false,
          }) => {
            fs.copyTpl(
              path.resolve(templateRoot, './tests/index.ejs'),
              path.resolve(testRoot, `.cache/${eventName}.js`),
              {
                displayName,
                testProps,
                eventName,
                componentPaths,
                mockData,
                hasCustomTest,
                hasCustomTestData: nodeFs.existsSync(
                  path.resolve(testRoot, './testData.js'),
                ),
              },
            );
          },
        );
      });
    });
  } catch (e) {
    if (!shouldWatch) throw e;
    else console.log(e);
  }
};

(() => {
  writeFiles();
  if (!shouldWatch) return;

  const filesTree = getFilesTree();
  const files = filesTree
    .leaves()
    .filter(
      ({ data: { name, path: filePath } }) =>
        !/(__story__|__tests__)\/.cache/g.test(filePath) &&
        (name === 'propTypes.js' || needToParse(name, filePath)),
    )
    .map(({ data }) => data.path);
  const templates = filesTree.children.map(({ data }) =>
    path.resolve(data.path, './__story__'),
  );

  chokidar
    .watch([...files, ...templates], {
      ignored: '**/.cache/**',
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 50,
        pollInterval: 10,
      },
    })
    .on('all', () => writeFiles());
})();
