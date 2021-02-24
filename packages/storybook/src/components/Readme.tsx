// import
import React from 'react';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import LinkTo from '@storybook/addon-links/react';

import frontEndSource from '../../../../README.md';
import storybookSource from '../../README.md';
import mockTypesSource from '../../../mock-types/README.md';
import modulesSource from '../../../../meepshop/modules/README.md';
import contextSource from '../../../../meepshop/context/README.md';
import localesSource from '../../../../meepshop/locales/README.md';
import typesSource from '../../../../meepshop/types/README.md';
import imagesSource from '../../../../meepshop/images/README.md';
import iconsSource from '../../../../meepshop/icons/README.md';
import nextStoreSource from '../../../store/README.md';

// definition
const gitUrl = 'https://github.com/meepshop/meep-lerna/tree/master';
const stories = [
  {
    name: '@meepshop/front-end',
    path: '.',
    source: frontEndSource,
  },
  {
    name: '@meepshop/storybook',
    path: './packages/storybook',
    source: storybookSource,
  },
  {
    name: '@meepshop/mock-types',
    path: './packages/mock-types',
    source: mockTypesSource,
  },
  {
    name: '@meepshop/modules',
    path: './meepshop/modules',
    source: modulesSource,
  },
  {
    name: '@meepshop/context',
    path: './meepshop/context',
    source: contextSource,
  },
  {
    name: '@meepshop/locales',
    path: './meepshop/locales',
    source: localesSource,
  },
  {
    name: '@meepshop/types',
    path: './meepshop/types',
    source: typesSource,
  },
  {
    name: '@meepshop/images',
    path: './meepshop/images',
    source: imagesSource,
  },
  {
    name: '@meepshop/icons',
    path: './meepshop/icons',
    source: iconsSource,
  },
  {
    name: '@meepshop/next-store',
    path: './packages/store',
    source: nextStoreSource,
  },
].map(({ path, ...data }) => ({
  ...data,
  path,
  pathname: new URL(`${gitUrl}/${path}`).pathname,
}));

const findText = (
  result: string,
  child: string | { props: { children: string[] } },
): string =>
  typeof child === 'string'
    ? `${result}${child}`
    : (React.Children.toArray(child.props.children) as string[]).reduce(
        findText,
        result,
      );

export default React.memo(({ name }: { name: string }) => {
  const story = stories.find(({ name: storyName }) => storyName === name);

  return !story ? null : (
    <Markdown
      className="markdown-body"
      plugins={[gfm]}
      renderers={{
        heading: ({ children, level }) =>
          React.createElement(
            `h${level}`,
            {
              id: (React.Children.toArray(children) as string[])
                .reduce(findText, '')
                .replace(/\W/g, '-')
                .replace(/-*$/, ''),
            },
            children,
          ),

        link: ({ href, children }) => {
          if (/^http/.test(href))
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );

          const url = `${gitUrl}/${story.path}/${href.replace(
            /README.md/,
            '',
          )}`;
          const { pathname } = new URL(url);
          const targetStory = stories.find(
            ({ pathname: storyPathname }) => storyPathname === pathname,
          );

          if (targetStory)
            return (
              <LinkTo kind={targetStory.name} story="readme">
                {children}
              </LinkTo>
            );

          return (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        },
      }}
    >
      {story.source}
    </Markdown>
  );
});
