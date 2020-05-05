// definition
const stage =
  'https://img.meepshop.com/yYcAIpapv6H9G_lko3IDSG20Dg6bDsc45Gdpua6mVY8/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvc3RhZ2UvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn';
const prod =
  'https://img.meepshop.com/SwwW2yGF1O27TPegZ9kIGrFTT4nO0vJAOR0OeVYel5w/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvcHJvZHVjdGlvbi9kYXNoYm9hcmQvY29zdF81ZTE2NjZlOC5zdmc';
const stageFixed =
  'https://img.meepshop.com/va51DOZ9OfaBj3YFn_djQdDJZOwJDOyosLMNWi0YlTE/w:30/h:30/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvc3RhZ2UvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn';
const prodFixed =
  'https://img.meepshop.com/VZoUUeJT8_-XcgfvFzW6Me0wicoECodMplBK1SOhO94/w:30/h:30/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvcHJvZHVjdGlvbi9kYXNoYm9hcmQvY29zdF81ZTE2NjZlOC5zdmc';

export default [
  // 1.
  [
    // input
    `import React, { useContext } from 'react';

import ImagesContext, { dashboardCost } from '@meepshop/images';

const Example = React.memo(() => {
  const getUrl = useContext(ImagesContext);

  return <img src={getUrl(dashboardCost)} />;
});`,

    // output
    `import React, { useContext } from 'react';

/*compiled by @meepshop/images*/
import ImagesContext from "@meepshop/images/src/ImagesContext";
const Example = React.memo(() => {
  const getUrl = useContext(ImagesContext);
  return /*#__PURE__*/React.createElement("img", {
    src: getUrl({
      /*compiled by @meepshop/images*/

      stage: "${stage}",
      prod: "${prod}"
    })
  });
});`,
  ],

  // 2.
  [
    // input
    `import { dashboardCost } from '@meepshop/images';

export default dashboardCost;`,

    // output
    `export default {
  /*compiled by @meepshop/images*/

  stage: "${stage}",
  prod: "${prod}"
};`,
  ],

  // 3.
  [
    // input
    `import React, { useContext } from 'react';

import ImagesContext, { dashboardCost_w30_h30 as dashboardCost } from '@meepshop/images';

const Example = React.memo(() => {
  const getUrl = useContext(ImagesContext);

  return <img src={getUrl(dashboardCost)} />;
});`,

    // output
    `import React, { useContext } from 'react';

/*compiled by @meepshop/images*/
import ImagesContext from "@meepshop/images/src/ImagesContext";
const Example = React.memo(() => {
  const getUrl = useContext(ImagesContext);
  return /*#__PURE__*/React.createElement("img", {
    src: getUrl({
      /*compiled by @meepshop/images*/

      stage: "${stageFixed}",
      prod: "${prodFixed}"
    })
  });
});`,
  ],

  // 4.
  [
    // input
    `import { dashboardCost_w30_h30 as dashboardCost } from '@meepshop/images';

export default dashboardCost;`,

    // output
    `export default {
  /*compiled by @meepshop/images*/

  stage: "${stageFixed}",
  prod: "${prodFixed}"
};`,
  ],

  // 5.
  [
    `import ImagesContext from '@meepshop/images';`,
    `/*compiled by @meepshop/images*/
import ImagesContext from "@meepshop/images/src/ImagesContext";`,
  ],

  // 6.
  [`import '@meepshop/images';`, ''],
];
