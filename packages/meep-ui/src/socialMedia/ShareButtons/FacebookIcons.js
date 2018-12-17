import React from 'react';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './icon.less';

const propTypes = { color: COLOR_TYPE };
const defaultProps = { color: '#757575' };

const Grey = ({ color }) => (
  <svg
    className={styles.icon}
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
);

Grey.propTypes = propTypes;
Grey.defaultProps = defaultProps;

const Outline = ({ color }) => (
  <svg
    className={styles.icon}
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
);

Outline.propTypes = propTypes;
Outline.defaultProps = defaultProps;

const Solid = ({ color }) => (
  <svg
    className={styles.icon}
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
);

Solid.propTypes = propTypes;
Solid.defaultProps = defaultProps;

const Color = () => (
  <svg
    className={styles.icon}
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
      <g id="dnd_社群/樣式1" transform="translate(-1463 -325)">
        <rect width="1860" height="907" />
        <g id="品牌色LOGO-" transform="translate(1463 325)">
          <g id="品牌色臉書">
            <g id="社群/sns_brands/fb4">
              <mask id="mask-2" fill="#fff">
                <use xlinkHref="#path-1" />
              </mask>
              <path
                d="M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M13.0688482,16.7733333 L13.0688482,12.2726481 L14.5233353,12.2726481 L14.7411241,10.5186512 L13.0688482,10.5186512 L13.0688482,9.39883495 C13.0688482,8.89101237 13.2046188,8.54494803 13.9057025,8.54494803 L14.8,8.54454217 L14.8,6.97575327 C14.6453422,6.95437791 14.1145036,6.90666667 13.4968709,6.90666667 C12.2075924,6.90666667 11.3248878,7.72407117 11.3248878,9.22512634 L11.3248878,10.5186512 L9.86666667,10.5186512 L9.86666667,12.2726481 L11.3248878,12.2726481 L11.3248878,16.7733333 L13.0688482,16.7733333 Z"
                id="Combined-Shape"
                fill="#369"
                mask="url(#mask-2)"
              />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default { Grey, Outline, Solid, Color };
