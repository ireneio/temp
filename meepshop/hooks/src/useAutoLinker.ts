// typescript import
import { AutolinkerConfig } from 'autolinker';

// import
import { useMemo } from 'react';
import Autolinker from 'autolinker';

// definition
export default (config?: AutolinkerConfig): Autolinker =>
  useMemo(
    () =>
      new Autolinker({
        newWindow: true,
        urls: {
          schemeMatches: true,
          wwwMatches: false,
          tldMatches: false,
        },
        stripPrefix: false,
        stripTrailingSlash: true,
        sanitizeHtml: true,
        ...config,
      }),
    [config],
  );
