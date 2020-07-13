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
        <g id="dnd_社群/樣式1" transform="translate(-1463 -289)">
          <rect width="1860" height="907" />
          <g id="切實心LOGO" transform="translate(1463 289)">
            <g id="實心臉書">
              <g id="社群/sns_solid/fb2">
                <mask id="mask-2" fill="#fff">
                  <use xlinkHref="#path-1" />
                </mask>
                <path
                  d="M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M13.0688482,16.7733333 L13.0688482,12.2726481 L14.5233353,12.2726481 L14.7411241,10.5186512 L13.0688482,10.5186512 L13.0688482,9.39883495 C13.0688482,8.89101237 13.2046188,8.54494803 13.9057025,8.54494803 L14.8,8.54454217 L14.8,6.97575327 C14.6453422,6.95437791 14.1145036,6.90666667 13.4968709,6.90666667 C12.2075924,6.90666667 11.3248878,7.72407117 11.3248878,9.22512634 L11.3248878,10.5186512 L9.86666667,10.5186512 L9.86666667,12.2726481 L11.3248878,12.2726481 L11.3248878,16.7733333 L13.0688482,16.7733333 Z"
                  id="Combined-Shape"
                  fill={color}
                  mask="url(#mask-2)"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ),
);
