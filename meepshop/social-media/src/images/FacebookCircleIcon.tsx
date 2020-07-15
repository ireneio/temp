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
        <g id="dnd_社群/樣式1" transform="translate(-1464 -254)">
          <rect width="1860" height="907" />
          <g id="切圓框LOGO" transform="translate(1464 254)">
            <g id="圓框臉書">
              <g id="社群/sns_outline/fb3">
                <mask id="mask-2" fill="#fff">
                  <use xlinkHref="#path-1" />
                </mask>
                <g id="snsiconf" mask="url(#mask-2)" stroke={color}>
                  <circle id="Oval" cx="12" cy="12" r="11.5" />
                </g>
                <g id="Page-1" mask="url(#mask-2)" fill={color}>
                  <path
                    d="M3.24545423,10 L3.24545423,5.43849466 L4.71959656,5.43849466 L4.94032846,3.66079509 L3.24545423,3.66079509 L3.24545423,2.52584623 C3.24545423,2.01116118 3.38305962,1.6604203 4.09361743,1.6604203 L5,1.66000896 L5,0.0700202017 C4.84325219,0.0483559878 4.30524018,0 3.67926106,0 C2.37255989,0 1.47792681,0.828450506 1.47792681,2.34979021 L1.47792681,3.66079509 L0,3.66079509 L0,5.43849466 L1.47792681,5.43849466 L1.47792681,10 L3.24545423,10 Z"
                    transform="translate(10 7)"
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