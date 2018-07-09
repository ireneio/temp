import React from 'react';
import radium from 'radium';

import * as styles from './styles/emptyCartIcon';

@radium
export default class EmptyCart extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg
        viewBox="0 0 109 97"
        stroke="#E6E6E6"
        strokeWidth="5.824"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        style={styles.root}
      >
        <polyline points="4 3.31850893 16.8156418 3.31850893 39.1044776 55.0357143" />

        <polyline points="24.6881134 20.5238661 106.694717 20.5238661 93.2588303 55.0357143" />

        <path d="M37.8389285,55.3542232 L91.3428317,55.3542232 C95.4466375,55.3542232 98.8042285,58.199523 98.8042285,61.6771116 C98.8042285,65.1547002 95.4466375,68 91.3428317,68 L38.6418797,68" />

        <path d="M42.7257338,32 L87.9765612,32" />

        <path d="M42.7257338,32 L87.9765612,32" strokeLinejoin="bevel" />

        <path d="M47.8304669,44 L82.8713772,44" />

        <path
          d="M54,86.5 C54,90.64225 50.641875,94 46.5,94 C42.35775,94 39,90.64225 39,86.5 C39,82.35775 42.35775,79 46.5,79 C50.641875,79 54,82.35775 54,86.5 Z"
          strokeWidth="5.2416"
        />

        <path
          d="M95,86.5 C95,90.64225 91.641875,94 87.5,94 C83.35775,94 80,90.64225 80,86.5 C80,82.35775 83.35775,79 87.5,79 C91.641875,79 95,82.35775 95,86.5 Z"
          strokeWidth="5.2416"
        />
      </svg>
    );
  }
}
