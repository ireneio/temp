// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="64 64 896 896">
    <path d="M882.477037,270.227793 L882.477037,141.63437 C882.477037,123.866193 868.121956,109.511111 850.353778,109.511111 L171.749926,109.511111 C153.981748,109.511111 139.626667,123.866193 139.626667,141.63437 L139.626667,270.227793 C122.862341,271.231644 109.511111,285.185185 109.511111,302.250667 L109.511111,434.457956 C109.511111,458.951941 114.3296,482.74323 123.966578,505.129126 C128.283141,515.368415 133.603556,525.005393 139.626667,534.140444 L139.626667,880.469333 C139.626667,898.137126 153.981748,912.592593 171.749926,912.592593 L850.353778,912.592593 C868.121956,912.592593 882.477037,898.237511 882.477037,880.469333 L882.477037,534.140444 C888.600533,525.005393 893.820563,515.26803 898.137126,505.129126 C907.673719,482.74323 912.592593,458.951941 912.592593,434.457956 L912.592593,302.250667 C912.592593,285.185185 899.241363,271.231644 882.477037,270.227793 Z M211.904,181.788444 L810.199704,181.788444 L810.199704,270.127407 L211.904,270.127407 L211.904,181.788444 Z M575.29837,840.415644 L446.805333,840.415644 L446.805333,735.914667 L575.29837,735.914667 L575.29837,840.415644 Z M810.199704,840.415644 L639.544889,840.415644 L639.544889,703.791407 C639.544889,686.02323 625.189807,671.668148 607.42163,671.668148 L414.682074,671.668148 C396.913896,671.668148 382.558815,686.02323 382.558815,703.791407 L382.558815,840.415644 L211.904,840.415644 L211.904,597.282726 C214.81517,598.688119 217.826726,600.093511 220.938667,601.298133 C243.324563,610.734341 267.115852,615.452444 291.609837,615.452444 C316.103822,615.452444 339.794726,610.734341 362.281007,601.298133 C376.134163,595.475793 389.184237,588.047289 401.130074,579.113007 C401.330844,579.012622 401.531615,579.012622 401.732385,579.113007 C413.678222,588.047289 426.627911,595.475793 440.581452,601.298133 C462.967348,610.734341 486.758637,615.452444 511.252622,615.452444 C535.746607,615.452444 559.437511,610.734341 581.923793,601.298133 C595.776948,595.475793 608.827022,588.047289 620.772859,579.113007 C620.97363,579.012622 621.1744,579.012622 621.37517,579.113007 C633.321007,588.047289 646.270696,595.475793 660.224237,601.298133 C682.610133,610.734341 706.401422,615.452444 730.895407,615.452444 C755.389393,615.452444 779.080296,610.734341 801.566578,601.298133 C804.578133,599.993126 807.589689,598.688119 810.601244,597.282726 L810.601244,840.415644 L810.199704,840.415644 Z M840.315259,434.457956 C840.315259,494.488296 791.126519,543.175111 730.594252,543.175111 C689.637096,543.175111 653.89997,520.989985 635.027556,488.063644 C632.116385,483.044385 626.896356,479.932444 621.074015,479.932444 L620.471704,479.932444 C614.749748,479.932444 609.429333,483.044385 606.518163,488.063644 C587.746133,520.989985 552.009007,543.175111 511.051852,543.175111 C470.195081,543.175111 434.558341,521.09037 415.685926,488.264415 C412.67437,483.14477 407.25357,479.932444 401.330844,479.932444 C395.408119,479.932444 389.886933,483.14477 386.975763,488.264415 C368.002963,521.09037 332.366222,543.175111 291.509452,543.175111 C230.977185,543.175111 181.788444,494.488296 181.788444,434.457956 L181.788444,342.906667 C181.788444,342.605511 181.989215,342.404741 182.29037,342.404741 L839.813333,342.404741 C840.114489,342.404741 840.315259,342.605511 840.315259,342.906667 L840.315259,434.457956 L840.315259,434.457956 Z" />
  </svg>
));

export default React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));
