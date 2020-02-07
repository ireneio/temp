// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="0 0 24 24">
    <path
      fill="#626C82"
      d="M7.76573226,15.3046869 L7.78807893,15.3286967 C8.31600474,15.8889229 9.0726332,16.2292338 9.89320909,16.2292338 L9.93418383,16.2289507 C10.7389424,16.217829 11.4792122,15.8795858 11.9983392,15.3286967 L12.0179144,15.3075625 L12.0375765,15.3286967 C12.5655023,15.8889229 13.3221308,16.2292338 14.1427067,16.2292338 L14.1836814,16.2289507 C14.98844,16.217829 15.7287098,15.8795858 16.2478369,15.3286967 L16.2636822,15.3115882 L16.2706431,15.3191928 C16.9616226,16.0668704 18.0479238,16.4207466 19.1153384,16.1504181 L19.1602675,16.1386661 C19.3028201,16.1001876 19.4399163,16.0517789 19.5709574,15.9944095 L19.5702766,21.4550947 C19.5702766,21.7917047 19.2954429,22.0659665 18.9518391,22.0777318 L5.21179795,22.0781251 C4.86523948,22.0781251 4.58287186,21.8111809 4.57075879,21.4774408 L4.57035389,21.4550947 L4.56986549,16.0152266 C4.68452683,16.0604498 4.8035006,16.098932 4.92640834,16.1300669 L4.97120548,16.1410465 C5.95135072,16.3732387 6.94349954,16.0822564 7.62583007,15.4450632 L7.76573226,15.3046869 Z M13.6817549,17.1571401 L10.2457782,17.1571401 C10.021058,17.1571401 9.83888626,17.409392 9.83888626,17.7205605 L9.83888626,20.47506 C9.83888626,20.7862285 10.021058,21.0384804 10.2457782,21.0384804 L13.6817549,21.0384804 C13.9064751,21.0384804 14.0886469,20.7862285 14.0886469,20.47506 L14.0886469,17.7205605 C14.0886469,17.409392 13.9064751,17.1571401 13.6817549,17.1571401 Z M13.3264618,17.8502365 L13.3264618,20.3453838 L10.6010717,20.3453838 L10.6010717,17.8502365 L13.3264618,17.8502365 Z M16.546875,1.921875 C16.9610886,1.921875 17.296875,2.25766144 17.296875,2.671875 L17.296875,6.890625 C17.296875,7.30483856 16.9610886,7.640625 16.546875,7.640625 L12.5854375,7.639875 L12.5854375,8.624875 L18.6485848,8.625 C19.1495841,8.625 19.5732626,8.99573756 19.6397419,9.49230664 L20.1903984,13.6054521 C20.192456,13.6208228 20.1952381,13.6361121 20.1987369,13.6512825 L20.2045218,13.6739443 C20.4118346,14.4140172 19.8911904,15.1605512 19.0333121,15.3528216 C18.1859869,15.5427268 17.3179845,15.1228291 17.0651749,14.40656 L17.0558715,14.3792181 C16.8767066,13.8324135 15.9854163,13.8231131 15.7840061,14.3544866 L15.7762222,14.376325 C15.5759875,14.9753398 14.9379679,15.3881581 14.2120821,15.3881581 C13.4980959,15.3881581 12.8691189,14.9887639 12.658141,14.4056336 L12.6479419,14.376325 C12.4659317,13.8318296 11.5778511,13.8245697 11.3770123,14.3545452 L11.3692501,14.376325 C11.1690155,14.9753398 10.5309959,15.3881581 9.80511002,15.3881581 C9.0911239,15.3881581 8.46214684,14.9887639 8.25116892,14.4056336 L8.2409699,14.376325 C8.05694037,13.8257888 7.15009717,13.823999 6.96312843,14.373803 C6.7163371,15.0995225 5.84205534,15.5251736 4.99000592,15.3341617 C4.14891091,15.1456055 3.63095886,14.4237191 3.80811066,13.6965004 L3.82039334,13.6476422 C3.82350716,13.6336666 3.82601351,13.6195934 3.82790652,13.6054521 L4.37849722,9.49232173 C4.44496971,8.9957459 4.86865124,8.625 5.36965638,8.625 L11.4604375,8.624875 L11.4604375,7.639875 L7.4765625,7.640625 C7.06234894,7.640625 6.7265625,7.30483856 6.7265625,6.890625 L6.7265625,2.671875 C6.7265625,2.25766144 7.06234894,1.921875 7.4765625,1.921875 L16.546875,1.921875 Z M10.038722,2.8359375 C9.37983802,2.8359375 8.94796445,3.38851902 8.94796445,3.38851902 C8.91889604,3.42235054 8.91785788,3.46886889 8.9331707,3.50428626 L8.95350129,3.53512228 L9.21926964,3.80577446 C9.26356436,3.85088315 9.32446961,3.85088315 9.36876433,3.80577446 C9.49611167,3.66480978 9.72312213,3.47309783 9.98889048,3.47309783 C10.387543,3.47309783 10.5757956,3.73247283 10.5757956,3.98620924 C10.5757956,4.1779212 10.4650588,4.39782609 10.2934167,4.61209239 C9.9636671,5.05816727 9.37580501,5.83838064 8.99258576,6.32306707 L8.859375,6.48974185 L8.859375,6.61942935 C8.859375,6.66171875 8.88429078,6.70083645 8.92244307,6.71775221 L8.96457497,6.7265625 L11.1460902,6.7265625 C11.1876165,6.7265625 11.2260283,6.69801715 11.2426388,6.65995669 L11.2512901,6.61942935 L11.2512901,6.23036685 C11.2512901,6.18807745 11.2232599,6.14895975 11.1858862,6.13204399 L11.1460902,6.1232337 L9.9501326,6.1232337 C10.2435851,5.74544837 10.664385,5.2154212 10.9024692,4.87146739 C11.118406,4.55570652 11.2734375,4.32452446 11.2734375,3.9580163 C11.2734375,3.34904891 10.8304903,2.8359375 10.038722,2.8359375 Z M14.5251657,2.8359375 L14.2220635,2.8359375 C14.1958695,2.8359375 14.1746648,2.84344474 14.1584495,2.85345438 L14.1378685,2.86972006 L12.1171875,5.33584705 L12.1171875,5.80317249 C12.1171875,5.84540069 12.142446,5.88446177 12.1811231,5.90135305 L12.2238346,5.9101506 L13.9582524,5.9101506 L13.9582524,6.61958439 C13.9582524,6.66181259 13.9866682,6.70087368 14.024556,6.71776496 L14.0648995,6.7265625 L14.5307787,6.7265625 C14.5728762,6.7265625 14.6118164,6.69805846 14.6286554,6.66005308 L14.6374257,6.61958439 L14.6318127,5.89888974 L15.0808529,5.89888974 C15.1271602,5.89888974 15.1639956,5.87038571 15.179519,5.83238033 L15.1875,5.79191163 L15.1875,5.44282516 C15.1875,5.40059696 15.1622415,5.36470299 15.1235644,5.34939527 L15.0808529,5.34147748 L14.6318127,5.34147748 L14.6318127,2.94291561 C14.6318127,2.88098092 14.5812957,2.8359375 14.5251657,2.8359375 Z M13.9921875,4.0078125 L13.9921875,5.34375 L12.890625,5.34375 L13.9921875,4.0078125 Z"
    />
  </svg>
));

export default React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));
