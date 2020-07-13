// import
import React from 'react';

// graphql typescript
import { socialMediaFragment } from '../__generated__/socialMediaFragment';

export default React.memo(
  ({ color }: { color: socialMediaFragment['color'] }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <polygon id="path-1" points="0 0 24 0 24 24 0 24" />
      </defs>
      <g id="社群/-社群分享" fill="none" fillRule="evenodd">
        <g id="dnd_社群/樣式1" transform="translate(-1462 -216)">
          <rect width="1860" height="907" />
          <g id="切圖單色LOGO" transform="translate(1462 216)">
            <g id="切圖單色臉書">
              <g id="社群/sns/fb">
                <mask id="mask-2" fill="#fff">
                  <use xlinkHref="#path-1" />
                </mask>
                <g id="Page-1-Copy-9" mask="url(#mask-2)" fill={color}>
                  <path
                    d="M5.19272676,14.2222222 L5.19272676,7.73474796 L7.55135449,7.73474796 L7.90452553,5.20646412 L5.19272676,5.20646412 L5.19272676,3.59231464 C5.19272676,2.86031813 5.41289539,2.36148665 6.54978789,2.36148665 L8,2.36090163 L8,0.0995842868 C7.7492035,0.0687729605 6.88838429,0 5.88681769,0 C3.79609583,0 2.3646829,1.17824072 2.3646829,3.34192386 L2.3646829,5.20646412 L0,5.20646412 L0,7.73474796 L2.3646829,7.73474796 L2.3646829,14.2222222 L5.19272676,14.2222222 Z"
                    transform="translate(8 5)"
                    id="Fill-1"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ),
);
