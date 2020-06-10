/* eslint-disable global-require */

import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import React from 'react';
import Markdown from 'react-markdown';

const stories = [
  {
    name: '@meepshop/front-end',
    path: '.',
    source: require('../../README.md').default,
  },
  {
    name: '@meepshop/front-end/circleci',
    path: './.circleci',
    source: require('../../.circleci/README.md').default,
  },
  {
    name: '@meepshop/front-end/storybook',
    path: './.storybook',
    source: require('../README.md').default,
  },
  {
    name: '@meepshop/mock-types',
    path: './packages/mock-types',
    source: require('../../packages/mock-types/README.md').default,
  },
  {
    name: '@meepshop/locale-parser',
    path: './packages/locale-parser',
    source: require('../../packages/locale-parser/README.md').default,
  },
  {
    name: '@meepshop/modules',
    path: './meepshop/modules',
    source: require('../../meepshop/modules/README.md').default,
  },
  {
    name: '@meepshop/images',
    path: './meepshop/images',
    source: require('../../meepshop/images/README.md').default,
  },
  {
    name: '@meepshop/icons',
    path: './meepshop/icons',
    source: require('../../meepshop/icons/README.md').default,
  },
  {
    name: '@meepshop/context',
    path: './meepshop/context',
    source: require('../../meepshop/context/README.md').default,
  },
  {
    name: '@store/server',
    path: './packages/store',
    source: require('../../packages/store/README.md').default, // TODO: modify path
  },
].map(({ path, ...data }) => ({
  ...data,
  path,
  pathname: new URL(
    `https://github.com/meepshop/meep-lerna/tree/master/${path}`,
  ).pathname,
}));

const findText = (result, child) =>
  typeof child === 'string'
    ? `${result}${child}`
    : React.Children.toArray(child.props.children).reduce(findText, result);

const heading = ({ children, level }) =>
  React.createElement(
    `h${level}`,
    {
      id: React.Children.toArray(children)
        .reduce(findText, '')
        .replace(/\W/g, '-')
        .replace(/-*$/, ''),
    },
    children,
  );

const link = path => ({ href, children }) => {
  if (/^http/.test(href))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );

  const url = `https://github.com/meepshop/meep-lerna/tree/master/${path}/${href}`;
  const { pathname } = new URL(url);
  const story = stories.find(
    ({ pathname: storyPathname }) => storyPathname === pathname,
  );

  if (story)
    return (
      <LinkTo kind={story.name} story="readme">
        {children}
      </LinkTo>
    );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

stories.forEach(({ name, source, path }) => {
  storiesOf(name, module).add('readme', () => (
    <Markdown
      className="markdown-body"
      source={source}
      renderers={{ heading, link: link(path) }}
    />
  ));
});
