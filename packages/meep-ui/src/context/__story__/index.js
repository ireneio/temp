import React from 'react';

import ReactMarkdown from 'react-markdown';

export default () => (
  <ReactMarkdown
    className="markdown-body"
    source={`
# Context
\`Context\` is used to provide the data of \`context\` to enhacer.`}
  />
);
