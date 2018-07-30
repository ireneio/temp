import path from 'path';

import dirTree from 'directory-tree';
import * as d3 from 'd3-hierarchy';

import { root } from './cliOptions';

export default () =>
  d3.hierarchy(
    dirTree(path.resolve(root, './src'), {
      extensions: /\.js$/,
    }),
  );
