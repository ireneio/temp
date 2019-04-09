import 'antd/dist/antd.less';
import { configure, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LinkTo from '@storybook/addon-links/react';
import React from 'react';
import Markdown from 'react-markdown';
import Router from 'next/router';
import { message } from 'antd';

Router.router = {
  push: action('router push'),
  prefetch: action('router prefetch'),
};

const stories = [
  {
    name: '@meepshop/front-end',
    pattern: /\.\/$/,
    path: './',
    source: require('../README.md'),
  },
  {
    name: '@meepshop/end-to-end',
    pattern: /end-to-end$/,
    path: './packages/end-to-end/',
    source: require('../packages/end-to-end/README.md'),
  },
  {
    name: '@meepshop/mock-types',
    pattern: /mock-types$/,
    path: './packages/mock-types/',
    source: require('../packages/mock-types/README.md'),
  },
  {
    name: '@store/server',
    pattern: /store\/server$/,
    path: './packages/store/',
    source: require('../packages/store/README.md'), // TODO: modify path
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
          location.hash = href;
        }}
      >
        {children}
      </a>
    );

  if (/^http/.test(href))
    return (
      <a href={href} target="_blank">
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
    >
      {children}
    </a>
  );
};

configure(() => {
  require('./story.js');

  stories.forEach(({ name, source, path }) => {
    storiesOf(name, module).add('readme', () => (
      <Markdown
        className="markdown-body"
        source={source}
        renderers={{ heading, link: link(path) }}
      />
    ));
  });
}, module);
