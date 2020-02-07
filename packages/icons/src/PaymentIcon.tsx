// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="64 64 896 896">
    <path d="M512,112 C291.107143,112 112,291.107143 112,512 C112,732.892857 291.107143,912 512,912 C732.892857,912 912,732.892857 912,512 C912,291.107143 732.892857,112 512,112 Z M511.999992,844.142845 C328.607138,844.142845 179.85714,695.392847 179.85714,511.999992 C179.85714,328.607138 328.607138,179.85714 511.999992,179.85714 C695.392847,179.85714 844.142845,328.607138 844.142845,511.999992 C844.142845,695.392847 695.392847,844.142845 511.999992,844.142845 Z M554.589275,491.285715 L531.910704,486.017858 L531.910704,366.107147 C565.839276,370.750004 586.821419,392.000003 590.392847,418.071431 C590.839276,421.64286 593.87499,424.232145 597.446419,424.232145 L637.535705,424.232145 C641.732134,424.232145 645.035705,420.571431 644.678563,416.375003 C639.232134,360.750004 593.428562,325.035721 532.267846,318.875006 L532.267846,289.678578 C532.267846,285.750006 529.053561,282.535721 525.124989,282.535721 L500.035703,282.535721 C496.107132,282.535721 492.892846,285.750006 492.892846,289.678578 L492.892846,319.142863 C429.678559,325.303577 380.214273,360.21429 380.214273,425.39286 C380.214273,485.750001 424.678559,514.857143 471.374988,526.017857 L493.42856,531.642857 L493.42856,659.053567 C453.964274,653.78571 431.821416,632.714282 427.267845,604.321426 C426.73213,600.928569 423.696416,598.428569 420.214273,598.428569 L378.964273,598.428569 C374.767844,598.428569 371.464272,601.999997 371.821415,606.196426 C375.839273,655.303567 413.071416,700.482137 492.535703,706.285709 L492.535703,734.321422 C492.535703,738.249994 495.749989,741.464279 499.67856,741.464279 L525.035704,741.464279 C528.964275,741.464279 532.178561,738.249994 532.178561,734.232137 L531.999989,705.928566 C601.910705,699.767852 651.910706,662.357139 651.910706,595.214283 C651.82142,533.249999 612.446419,505.571429 554.589275,491.285715 Z M493.339287,476.821434 C488.339287,475.392863 484.142858,474.053577 479.946429,472.357148 C449.767857,461.464291 435.75,443.875005 435.75,421.196433 C435.75,388.785719 460.303572,370.303576 493.339287,366.107147 L493.339287,476.821434 Z M531.910706,659.321442 L531.910706,539.946442 C534.678563,540.750013 537.178563,541.375013 539.767848,541.910727 C581.99999,554.76787 596.196419,572.625013 596.196419,600.035727 C596.196419,634.946442 569.946419,655.928585 531.910706,659.321442 Z" />
  </svg>
));

export default React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));
