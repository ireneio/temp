// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M21.8265379,9.2109724 L21.92512,9.2187546 C22.2357202,9.28198321 22.4586168,9.55297981 22.458518,9.86723082 L22.4533064,9.95446369 L22.4533064,9.95446369 L22.4363838,10.0402242 L21.3203813,14.1655025 C21.2323312,14.4941109 21.0723478,14.798549 20.8527681,15.0576191 L20.7139675,15.2074474 L18.4618603,17.4394275 C18.0646491,17.8308648 17.8245043,18.3493997 17.7816321,18.8988629 L17.774703,19.0830308 L17.774703,19.9376552 C17.774703,20.0855886 17.6719112,20.2095137 17.5338564,20.2419019 L17.462203,20.2501552 L14.4018149,20.2501552 C14.2538815,20.2501552 14.1299564,20.1473634 14.0975683,20.0093086 L14.0893149,19.9376552 L14.0893149,17.1352779 C14.090422,16.3645121 14.4756532,15.6483357 15.1109528,15.2168581 L15.2619384,15.1224449 L18.5640461,13.2327991 C18.7714801,13.1122786 19.0281701,13.1111504 19.2366746,13.2298427 C19.4451791,13.3485351 19.5735281,13.568849 19.5729995,13.8071516 C19.5725464,14.011411 19.4774672,14.2020418 19.3186776,14.3265113 L19.2341166,14.3829894 L17.2721501,15.5056203 C17.1676355,15.5645116 17.1029729,15.6743879 17.1027086,15.7935392 C17.1024443,15.9126905 17.1666189,16.0228475 17.2708711,16.0821936 C17.3542729,16.1296706 17.453094,16.1388049 17.5423895,16.1097064 L17.6071853,16.0807154 L19.5691519,14.9580846 C20.2100987,14.5913115 20.4296958,13.779047 20.0596436,13.1438121 L20.0350185,13.1092384 L20.0350185,13.1092384 L20.0103934,13.0754117 L21.1304163,9.75002032 C21.2006086,9.45993533 21.4443731,9.25276575 21.7299702,9.21658057 L21.8265379,9.2109724 Z M2.85339508,9.67364148 L2.88169975,9.76994278 L3.99636213,13.078068 C3.98028044,13.0999827 3.96118343,13.1199051 3.94677691,13.1444762 C3.60033318,13.7399515 3.7717763,14.4906593 4.32245291,14.8842745 L4.4376036,14.9580845 L6.3995702,16.0807154 C6.50328721,16.1409756 6.63163221,16.1415397 6.73588445,16.0821936 C6.84013669,16.0228474 6.90431124,15.9126904 6.90404693,15.7935391 C6.90383549,15.6982181 6.86240912,15.6088331 6.7923356,15.5467395 L6.73460548,15.5056202 L4.77263888,14.3829894 C4.4548823,14.1983707 4.34705789,13.7941829 4.53122952,13.4780484 C4.69698398,13.1935274 5.04331723,13.0763483 5.34435206,13.1872873 L5.44270944,13.2327991 L8.74481717,15.1224448 C9.4177488,15.5088072 9.85095165,16.1974991 9.91041401,16.9584866 L9.91744065,17.1352778 L9.91744065,19.9376551 C9.91744065,20.0855885 9.81464889,20.2095136 9.67659404,20.2419017 L9.60494065,20.2501551 L6.54455256,20.2501551 C6.39661915,20.2501551 6.27269404,20.1473633 6.24030591,20.0093085 L6.23205256,19.9376551 L6.23205256,19.0830307 C6.23354801,18.5280219 6.03337475,17.9932345 5.67171088,17.5747974 L5.54523024,17.4397595 L3.29278804,15.2074473 C3.04972002,14.9669988 2.86382642,14.6769468 2.74743507,14.3584885 L2.68603915,14.1641743 L1.56869649,10.0395601 C1.5223657,9.86368875 1.5504942,9.67669471 1.64657076,9.52186372 C1.74264732,9.36703273 1.89834228,9.25778836 2.07761508,9.21941868 C2.41628659,9.16924508 2.73782077,9.36374572 2.85339508,9.67364148 Z M10.59375,3.8203125 L10.59375,7.3265625 C10.5939896,7.44403079 10.6654692,7.55185911 10.7797672,7.60717299 C10.8712056,7.65142409 10.9781905,7.65632765 11.0725078,7.62313909 L11.1404297,7.591125 L12,7.0715625 L12.8595703,7.5917625 C12.9674503,7.65702089 13.1061944,7.66313123 13.2205424,7.60765983 C13.3120208,7.56328271 13.375999,7.48525961 13.3979213,7.39562312 L13.40625,7.3265625 L13.40625,3.8203125 L16.5703125,3.8203125 C16.7402048,3.8203125 16.8819506,3.92957426 16.9147325,4.07482326 L16.921875,4.1390625 L16.921875,13.0640625 C16.921875,13.2180982 16.8013657,13.3466144 16.6411646,13.3763366 L16.5703125,13.3828125 L7.4296875,13.3828125 C7.25979522,13.3828125 7.11804939,13.2735507 7.0852675,13.1283017 L7.078125,13.0640625 L7.078125,4.1390625 C7.078125,3.98502683 7.19863429,3.85651061 7.35883539,3.82678837 L7.4296875,3.8203125 L10.59375,3.8203125 Z M12.6796875,3.796875 L12.6796875,6.7265625 L12.1716797,6.4175833 C12.0771693,6.36003564 11.9597338,6.34852611 11.8560534,6.38305471 L11.7814453,6.4175833 L11.2734375,6.7265625 L11.2734375,3.796875 L12.6796875,3.796875 Z" />
  </svg>
));

export default React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));