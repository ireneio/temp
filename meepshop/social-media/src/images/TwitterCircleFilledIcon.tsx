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
        <g id="dnd_社群/樣式1" transform="translate(-1565 -289)">
          <rect width="1860" height="907" />
          <g id="切實心LOGO" transform="translate(1463 289)">
            <g id="實心推特" transform="translate(102)">
              <g id="社群/sns_solid/Twitter_2">
                <mask id="mask-2" fill="#fff">
                  <use xlinkHref="#path-1" />
                </mask>
                <path
                  d="M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M9.82737944,16.7733333 C14.5300193,16.7733333 17.1013613,12.9764747 17.1013613,9.68586387 C17.1013613,9.5773822 17.1013613,9.46890052 17.0960595,9.36558464 C17.5944227,9.01431065 18.0291651,8.57521815 18.3737779,8.07413613 C17.9178286,8.2704363 17.4247672,8.40474695 16.905197,8.46673647 C17.4353706,8.15678883 17.8383026,7.67120419 18.0291651,7.08746946 C17.5361036,7.37158813 16.9900248,7.5782199 16.4068338,7.69186736 C15.9402811,7.20628272 15.2775641,6.90666667 14.5406228,6.90666667 C13.130361,6.90666667 11.985186,8.02247818 11.985186,9.39657941 C11.985186,9.59287958 12.0063929,9.78401396 12.0541086,9.96481675 C9.92811243,9.86150087 8.04599614,8.86966841 6.78418297,7.36125654 C6.56681179,7.72802792 6.43957013,8.15678883 6.43957013,8.61137871 C6.43957013,9.47406632 6.89021769,10.2386038 7.57944337,10.6828621 C7.16060623,10.6725305 6.76827776,10.5588831 6.42366492,10.3729145 L6.42366492,10.4039092 C6.42366492,11.6127051 7.3037531,12.6148691 8.47543676,12.8473298 C8.26336732,12.9041536 8.03539267,12.9351483 7.80211629,12.9351483 C7.63776247,12.9351483 7.47871039,12.919651 7.31965831,12.8886562 C7.64306421,13.8804887 8.58677322,14.598534 9.70543952,14.6191972 C8.83065307,15.2855846 7.72789198,15.6833508 6.52969964,15.6833508 C6.32293194,15.6833508 6.12146597,15.6730192 5.92,15.6471902 C7.0386663,16.3600698 8.38530725,16.7733333 9.82737944,16.7733333 Z"
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