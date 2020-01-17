// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="64 64 896 896">
    <g stroke="none" strokeWidth="1" fill="#000000" fillRule="evenodd">
      <path d="M880,112 C897.673112,112 912,126.326888 912,144 L912,880 C912,897.673112 897.673112,912 880,912 L144,912 C126.326888,912 112,897.673112 112,880 L112,144 C112,126.326888 126.326888,112 144,112 L880,112 Z M840,432 L184,432 L184,840 L410,840 L410,432 L474,432 L474,840 L840,840 L840,670.998 L474,670.095854 L474.081507,606 L840,606.902 L840,432 Z M840,184 L184,184 L184,368 L840,368 L840,184 Z" />
    </g>
  </svg>
));

export default React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));
