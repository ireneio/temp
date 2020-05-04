/* eslint-disable global-require */

import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import React from 'react';
import Markdown from 'react-markdown';

const stories = [
  {
    name: '@meepshop/front-end',
    pattern: /\.\/$/,
    path: './',
    source: require('../../README.md').default,
  },
  {
    name: '@meepshop/front-end/circleci',
    pattern: /\.circleci$/,
    path: './.circleci',
    source: require('../../.circleci/README.md').default,
  },
  {
    name: '@meepshop/front-end/storybook',
    pattern: /\.storybook$/,
    path: './.storybook',
    source: require('../README.md').default,
  },
  {
    name: '@meepshop/mock-types',
    pattern: /mock-types$/,
    path: './packages/mock-types/',
    source: require('../../packages/mock-types/README.md').default,
  },
  {
    name: '@meepshop/locale-parser',
    pattern: /meepshop\/locale-parser$/,
    path: './packages/locale-parser/',
    source: require('../../packages/locale-parser/README.md').default,
  },
  {
    name: '@meepshop/images',
    pattern: /meepshop\/images$/,
    path: './meepshop/images/',
    source: require('../../meepshop/images/README.md').default,
  },
  {
    name: '@meepshop/icons',
    pattern: /meepshop\/icons$/,
    path: './meepshop/icons/',
    source: require('../../meepshop/icons/README.md').default,
  },
  {
    name: '@store/server',
    pattern: /store\/server$/,
    path: './packages/store/',
    source: require('../../packages/store/README.md').default, // TODO: modify path
  },
];

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
  if (/^#/.test(href))
    return (
      <a
        href={href}
        onClick={e => {
          e.preventDefault();
          window.location.hash = href;
        }}
      >
        {children}
      </a>
    );

  if (/^http/.test(href))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );

  const story = stories.find(({ pattern }) => pattern.test(href));

  if (story)
    return (
      <LinkTo kind={story.name} story="readme">
        {children}
      </LinkTo>
    );

  return (
    <a
      href={`https://github.com/meepshop/meep-lerna/tree/master/${path}${href}`}
      target="_blank"
      rel="noopener noreferrer"
    >
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