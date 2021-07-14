// definition
const stage =
  'https://img.meepstage.com/DSBUA9FRwA1Ekg7hKZlQEl7YCQz1sdTDf9RunKQplwM/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg';
const production =
  'https://img.meepshop.com/g4vb2HsKvgikb1pu2VheqCgalEUna6VQAWcixM2Qq_o/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg';
const stageFixed =
  'https://img.meepstage.com/dgkFJZ8d41Jft-X2d4SYghIm6fD5yYhB5B-myzb_Vz4/w:30/h:30/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg';
const productionFixed =
  'https://img.meepshop.com/aAKJ2NTs0hott0ljyaN8nTPAP_PcK3HIqYFKS4L4QNk/w:30/h:30/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg';

export default [
  // 1.
  [
    // input
    `import React from 'react';

import { dashboardCost } from '@meepshop/images';

const Example = React.memo(() =>
  <img src={dashboardCost} />
);`,

    // output
    `import React from 'react';

/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
const Example = /*#__PURE__*/React.memo(() => /*#__PURE__*/React.createElement("img", {
  src: getImage({
    stage: "${stage}",
    production: "${production}"
  })
}));`,
  ],

  // 2.
  [
    // input
    `import { dashboardCost } from '@meepshop/images';

export default dashboardCost;`,

    // output
    `/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
export default getImage({
  stage: "${stage}",
  production: "${production}"
});`,
  ],

  // 3.
  [
    // input
    `import React from 'react';

import { dashboardCost_w30_h30 as dashboardCost } from '@meepshop/images';

const Example = React.memo(() =>
  <img src={dashboardCost} />
);`,

    // output
    `import React from 'react';

/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
const Example = /*#__PURE__*/React.memo(() => /*#__PURE__*/React.createElement("img", {
  src: getImage({
    stage: "${stageFixed}",
    production: "${productionFixed}"
  })
}));`,
  ],

  // 4.
  [
    // input
    `import { dashboardCost_w30_h30 as dashboardCost } from '@meepshop/images';

export default dashboardCost;`,

    // output
    `/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
export default getImage({
  stage: "${stageFixed}",
  production: "${productionFixed}"
});`,
  ],

  // 5.
  [`import images from '@meepshop/images';`, ''],

  // 6.
  [`import '@meepshop/images';`, ''],

  // 7.
  [
    // input
    `import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

export default dashboardCost;`,

    // output
    `/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
export default {
  w60: getImage({
    stage: "https://img.meepstage.com/0i7JS_5yzyu1BDoc4Laq6B3qRxdNx7_3bs4tt_zoaWo/w:60/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/5p-2PJ7MaG4noFB0Q71Y97FTFf26pxzmVKRdAJBBBGU/w:60/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w120: getImage({
    stage: "https://img.meepstage.com/NAzgT6TDCcJztr7IVS-Sk-lWYmMqC_s4vJKmNyzFBWA/w:120/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/PgoIILB_1VkEWc2Axs23ZY3ACHpsSboPok6AAo1cuCk/w:120/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w240: getImage({
    stage: "https://img.meepstage.com/MeqQ_hvnQbY74ODCqZ6W3EBW5QVcorw1ZJrw6Hfs6mY/w:240/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/MNB-WvUFBcVVxmjs8cVW9UoXIu9RX3ZdpgNXv1HAvSs/w:240/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w480: getImage({
    stage: "https://img.meepstage.com/hUL16vk6EEeryGEZUfBL08k8yqF46E_wFi8XMfEnngI/w:480/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/M539ijBEBh7DwQloGO63Xo82N0PXrqeg2HKiPj6tDJM/w:480/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w720: getImage({
    stage: "https://img.meepstage.com/2LF4LYWjpIbtxeIBI4PF0gorOEUi-ZaMbvv6MyeWaYc/w:720/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/7pbUeLiAUtdLfv3g-NGjXeyp2pWHlhP54Bud7lRAMiY/w:720/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w960: getImage({
    stage: "https://img.meepstage.com/TwOvWC13P52DaKJ_0gzA_vASK9zdRrSZ1ouK5w6gblM/w:960/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/wcNCWW1PZ6IHyXY5nVs0fpicVaNkExLFdgI1K-Zu2NQ/w:960/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w1200: getImage({
    stage: "https://img.meepstage.com/TAyvi_wVRqtfXzMqW0UJseMTKTfFuPxhsYI83VStAvY/w:1200/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/AL95jjiLTRaKwyHsXgKIstJXLOAf7mA6GGpuyifbSHw/w:1200/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w1440: getImage({
    stage: "https://img.meepstage.com/glBzUrlRpaBpY08GsBt2CWZE2xcsIxRrZKtySkxwGWg/w:1440/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/XfFyuoaV8CbTO1ArmX3ZU0DiLwuNE8DYHh5GubOaz9Q/w:1440/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w1680: getImage({
    stage: "https://img.meepstage.com/GM6KG5iktl1KRbABfB7oFjJVMiPyzBlQ35Mt6NM2NBM/w:1680/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/Ot3IDLYyvSnPbascXyV012Qtcger42pPx2A8j8503aE/w:1680/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  }),
  w1920: getImage({
    stage: "https://img.meepstage.com/CpjTuJ9SO4t-LGUkbUgW8lokxLtIPd1anHDNEuuf1O4/w:1920/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg",
    production: "https://img.meepshop.com/bfj6pexAO2MqqfUVzg0FaDzFcqB_Zp7ZJGtgfMxYkms/w:1920/Z3M6Ly9pbWcubWVlcGNsb3VkLmNvbS9hc3NldHMvZGFzaGJvYXJkL2Nvc3RfNWUxNjY2ZTguc3Zn.svg"
  })
};`,
  ],

  // 8.
  [
    // input
    `import { dashboardCost_react as DashboardCost } from '@meepshop/images';

export default DashboardCost;`,

    // output
    `/*compiled by @meepshop/images*/
import DashboardCost from "@meepshop/images/lib/dashboardCost";
export default DashboardCost;`,
  ],

  // 9.
  [
    // input
    `export { dashboardCost_w30_h30 as dashboardCost, dashboardCost_react as DashboardCost } from '@meepshop/images';`,

    // output
    `/*compiled by @meepshop/images*/
import getImage from "@meepshop/images/src/getImage";
export { default as DashboardCost } from "@meepshop/images/lib/dashboardCost";
export const dashboardCost = getImage({
  stage: "${stageFixed}",
  production: "${productionFixed}"
});`,
  ],
];
