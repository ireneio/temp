import React from 'react';
import './styles/ship.less';

export default () => (
  <div className="server_error_space">
    <svg
      className="server_error_stars"
      width="375"
      height="341"
      viewBox="0 0 544 361"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Stars</title>
      <defs>
        <radialGradient
          cx="51.204%"
          cy="59.299%"
          fx="51.204%"
          fy="59.299%"
          r="39.57%"
          gradientTransform="matrix(0 -1 1.40643 0 -.322 1.105)"
          id="a"
        >
          <stop stopColor="#ADF7F8" offset="0%" />
          <stop stopColor="#B4F7F8" offset="34.842%" />
          <stop stopColor="#B7F8F8" stopOpacity=".939" offset="61.143%" />
          <stop stopColor="#E4FAFA" stopOpacity="0" offset="100%" />
        </radialGradient>
        <filter
          x="-2.1%"
          y="-4%"
          width="104.2%"
          height="111.1%"
          filterUnits="objectBoundingBox"
          id="b"
        >
          <feOffset
            dx="0"
            dy="2"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="2"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0.378684944 0 0 0 0 0.90119772 0 0 0 0 0.996200043 0 0 0 1 0"
            type="matrix"
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path fill="url(#a)" d="M1-90h544v450H1z" />
        <g
          filter="url(#b)"
          transform="translate(106 78)"
          fill="#FFF"
          fillRule="nonzero"
        >
          <path d="M228 9h5.258c1.514 0 2.742 1.12 2.742 2.5s-1.228 2.5-2.742 2.5H228v5.53a2.5 2.5 0 1 1-5 0V14h-5.258c-1.514 0-2.742-1.12-2.742-2.5s1.228-2.5 2.742-2.5H223V2.5a2.5 2.5 0 1 1 5 0V9zM326 112h5.258c1.514 0 2.742 1.12 2.742 2.5s-1.228 2.5-2.742 2.5H326v5.53a2.5 2.5 0 1 1-5 0V117h-5.258c-1.514 0-2.742-1.12-2.742-2.5s1.228-2.5 2.742-2.5H321v-6.5a2.5 2.5 0 1 1 5 0v6.5zM13 101h5.258c1.514 0 2.742 1.12 2.742 2.5s-1.228 2.5-2.742 2.5H13v5.53a2.5 2.5 0 1 1-5 0V106H2.742C1.228 106 0 104.88 0 103.5s1.228-2.5 2.742-2.5H8v-6.5a2.5 2.5 0 1 1 5 0v6.5z" />
        </g>
      </g>
    </svg>

    {/* Smoke */}
    <div className="server_error_smoke_wrapper">
      <svg
        className="server_error_smoke"
        width="51"
        height="51"
        viewBox="0 0 51 51"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Smoke</title>
        <path
          d="M39.845 11.631c6.12 1.016 10.785 6.334 10.785 12.742 0 7.03-5.615 12.748-12.604 12.913.003.106.004.213.004.32 0 7.133-5.782 12.916-12.915 12.916-7.133 0-12.915-5.783-12.915-12.917 0-.137.002-.273.006-.41C5.813 36.423.86 30.976.86 24.374c0-7.134 5.782-12.917 12.915-12.917.137 0 .273.003.41.007C14.957 5.069 20.402.115 27.004.115c6.66 0 12.142 5.041 12.84 11.516z"
          fill="#B8BCCB"
          stroke="none"
          strokeWidth="1"
          fillRule="evenodd"
        />
      </svg>
    </div>

    {/* Ship */}
    <svg
      className="server_error_ship"
      width="265"
      height="341"
      viewBox="0 0 365 341"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>Ship</title>
      <defs>
        <linearGradient x1="50%" y1="98.029%" x2="50%" y2="0%" id="a">
          <stop stopColor="#FFFCB3" offset="0%" />
          <stop stopColor="#F1FBD7" offset="50.484%" />
          <stop stopColor="#E4FAFA" stopOpacity="0" offset="100%" />
        </linearGradient>
        <path id="b" d="M0 0h125.824v51.649H0z" />
      </defs>
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g opacity=".383">
          <path
            d="M161.04 255c.032-.773.444-1.391.96-1.446v-.011c-.538-.057-.963-.725-.963-1.543 0 .855-.464 1.548-1.037 1.548.551 0 1 .642 1.034 1.452h.006z"
            fill="#FFF5B1"
          />
          <path
            d="M160.56 335c.049-1.288.665-2.319 1.44-2.41v-.019c-.807-.095-1.444-1.208-1.444-2.571 0 1.425-.697 2.58-1.556 2.58.826 0 1.5 1.07 1.55 2.42h.01z"
            fill="#FFF"
          />
          <path
            className="server_error_light-out"
            fill="#fffcb3"
            opacity=".384"
            transform="matrix(1 0 0 -1 7 341.429)"
            d="M.594.768h356.994L280.562 162.66H83.754z"
          />
        </g>
        <g transform="translate(61 158)" fill="#FCEDB0">
          <ellipse
            className="server_error_lights"
            cx="37"
            cy="29.5"
            rx="37"
            ry="18.5"
          />
          <ellipse
            className="server_error_lights"
            cx="211"
            cy="29.5"
            rx="37"
            ry="18.5"
          />
          <ellipse
            className="server_error_lights"
            cx="122"
            cy="18.5"
            rx="37"
            ry="18.5"
          />
        </g>
        <g transform="translate(.56 .395)">
          <g transform="translate(138.34 47.887)">
            <g transform="translate(21.606 8.396)">
              <path
                d="M15.974 2.664C21.935.3 26.278.3 29.003 2.664 31.728 5.028 34.796 4.14 38.207 0c.638 5.911-1.055 8.755-5.08 8.531-4.024-.223-9.742-2.179-17.153-5.867z"
                fill="#72625D"
              />
              <g transform="translate(0 1.882)">
                <path
                  fill="#F1F8FF"
                  d="M16.359 37.343l-7.707 2.575v34.473h22.274V39.667l-7.134-2.324z"
                />
                <ellipse
                  fill="#72625D"
                  cx="19.955"
                  cy="15.227"
                  rx="16.327"
                  ry="15.161"
                />
                <ellipse
                  fill="#FFD8D8"
                  cx="35.863"
                  cy="21.347"
                  rx="3.489"
                  ry="3.477"
                />
                <ellipse
                  fill="#FFD8D8"
                  cx="4.884"
                  cy="21.347"
                  rx="3.489"
                  ry="3.477"
                />
                <ellipse
                  fill="#FFB2B2"
                  cx="5.163"
                  cy="21.347"
                  rx="2.093"
                  ry="2.086"
                />
                <ellipse
                  fill="#FFB2B2"
                  cx="36.142"
                  cy="21.347"
                  rx="2.093"
                  ry="2.086"
                />
                <path
                  d="M15.073 38.456h-.002v-5.564H24v5.564H24c-.076 2.317-2.045 4.173-4.463 4.173s-4.387-1.856-4.463-4.173z"
                  fill="#FFD7D8"
                />
                <path
                  d="M15.08 35.674h-.01v-2.782h8.932v2.782h-.01c-.153 1.088-2.09 1.948-4.456 1.948-2.366 0-4.302-.86-4.455-1.948z"
                  fill="#FFB2B2"
                />
                <ellipse
                  fill="#FFD8D8"
                  cx="20.234"
                  cy="20.513"
                  rx="15.489"
                  ry="15.44"
                />
                <ellipse
                  fill="#56443B"
                  cx="13.675"
                  cy="16.757"
                  rx="1.395"
                  ry="1.391"
                />
                <ellipse
                  fill="#56443B"
                  cx="26.792"
                  cy="16.757"
                  rx="1.395"
                  ry="1.391"
                />
                <ellipse
                  fill="#FFB2B2"
                  cx="9.768"
                  cy="20.711"
                  rx="1.395"
                  ry="1.399"
                />
                <ellipse
                  fill="#FFB2B2"
                  cx="30.421"
                  cy="20.431"
                  rx="1.395"
                  ry="1.399"
                />
                <ellipse
                  fill="#FFB2B2"
                  cx="20.234"
                  cy="19.122"
                  rx="2.372"
                  ry="2.365"
                />
                <path
                  d="M14.311 26.278c4.194-3.974 8.188-3.974 11.605.055a.694.694 0 0 1-.082.98.7.7 0 0 1-.984-.082c-2.875-3.39-5.942-3.39-9.578.055a.7.7 0 0 1-.986-.025.694.694 0 0 1 .025-.983z"
                  fill="#FF7D7B"
                  fillRule="nonzero"
                />
                <path
                  d="M7.588 41.278C2.192 47.554-.14 58.6.34 74.466a2.508 2.508 0 0 0 2.586 2.428 2.507 2.507 0 0 0 2.435-2.578c-.445-14.734 1.654-24.676 6.041-29.78.903-1.05.78-2.63-.273-3.53a2.517 2.517 0 0 0-3.541.272zM31.49 41.834c5.396 6.276 7.727 17.323 7.248 33.189a2.508 2.508 0 0 1-2.586 2.427 2.507 2.507 0 0 1-2.435-2.578c.445-14.733-1.654-24.676-6.041-29.78a2.498 2.498 0 0 1 .273-3.53 2.517 2.517 0 0 1 3.541.272z"
                  fill="#FFB2B2"
                  fillRule="nonzero"
                />
                <path
                  d="M9.727 57.061c3.988-8.33 5.855-12.991 5.6-13.982-.255-.991-1.871-2.254-4.85-3.788-1.912.525-3.002.91-3.269 1.153-.4.366-6.335 9.943-6.64 15.26-.204 3.543 2.85 3.996 9.159 1.357zM31.299 57.34c-3.988-8.331-5.855-12.992-5.6-13.983.255-.991 1.871-2.254 4.85-3.788 1.912.525 3.002.91 3.269 1.153.4.366 6.335 9.943 6.64 15.26.204 3.544-2.85 3.996-9.159 1.357z"
                  fill="#F1F8FF"
                />
                <path
                  fill="#FFF"
                  d="M14.921 37.343l4.682 5.41-1.721 2.588-6.16-6.983z"
                />
                <path
                  fill="#FFF"
                  d="M24.218 37.343l3.199 1.015-6.16 6.983-1.721-2.588z"
                />
              </g>
              <path
                fill="#FECF55"
                d="M20.017 44.32l-1.381 1.997v1.207h2.663v-1.207zM18.015 48.058h2.314l.97 13.168-2.091 3.92-2.169-3.92z"
              />
              <path d="M24.494 51.537h5.857" stroke="#9B9B9B" strokeWidth="3" />
              <ellipse fill="#9B9B9B" cx="26.89" cy="52.597" rx="1" ry="1" />
            </g>
            <path
              d="M4.7 101.036c1.49 4.388 16.861 7.837 35.605 7.837 18.744 0 34.116-3.45 35.605-7.837h.118v-20.99H4.582v20.99H4.7z"
              fill="#E45869"
            />
            <path
              d="M4.62 79.486c6.56 5.311 20.076 8.956 35.685 8.956 15.61 0 29.125-3.645 35.685-8.956 2.703 2.188 4.225 4.66 4.225 7.277 0 8.965-17.869 16.233-39.91 16.233-22.041 0-39.91-7.268-39.91-16.233 0-2.617 1.522-5.089 4.225-7.277z"
              fill="#F76C7D"
            />
            <ellipse
              fill="#4191EE"
              cx="19.373"
              cy="68.85"
              rx="4.186"
              ry="4.198"
            />
            <ellipse
              fill="#4191EE"
              cx="62.074"
              cy="70.809"
              rx="4.186"
              ry="4.198"
            />
            <rect
              fill="#2575D2"
              transform="rotate(-20 22.38 77.25)"
              x="20.844"
              y="68.574"
              width="3.07"
              height="17.353"
              rx="1.535"
            />
            <rect
              fill="#2575D2"
              transform="rotate(20 59.443 77.729)"
              x="57.908"
              y="70.032"
              width="3.07"
              height="15.393"
              rx="1.535"
            />
            <ellipse
              fill="#FFD8D8"
              cx="19.234"
              cy="75.707"
              rx="4.884"
              ry="4.898"
            />
            <ellipse
              fill="#FFD8D8"
              cx="59.423"
              cy="77.667"
              rx="4.884"
              ry="4.898"
            />
          </g>
          <path
            d="M70.56 134.839c4.03-58.091 52.415-103.965 111.51-103.965 59.095 0 107.48 45.874 111.51 103.965H70.56z"
            fill="#FBFFFE"
            opacity=".549"
          />
          <g transform="translate(119.07)">
            <mask id="c" fill="#fff">
              <use xlinkHref="#b" />
            </mask>
            <path
              d="M125.824 49.289s-15.47-19.536-44.997-24.462c-8.516-1.423-6.887-11.863 2.277-12.774C92.27 11.142 99.282 6.753 94.649 0c-1.52 5.517-3.519 7.348-11.892 6.324 0 0-22.044-5.369-32.278 15.575C46.514 30.016 22.581 26.306 0 51.65c46.435-27.603 105.759-14.114 125.824-2.36"
              fill="#337A85"
              mask="url(#c)"
            />
          </g>
          <path
            d="M292.933 135.833a7.25 7.25 0 0 0-3.695-.994H74.272c-1.32 0-2.607.346-3.696.994L2.862 176.116c-5.312 3.16-2.74 10.39 3.696 10.39h350.394c6.436 0 9.008-7.23 3.696-10.39l-67.715-40.283z"
            fill="#E84D60"
          />
          <rect
            fill="#F76C7D"
            x="68.67"
            y="127.908"
            width="226.8"
            height="10.081"
            rx="5.041"
          />
          <path
            stroke="#C82B3E"
            strokeWidth="5"
            d="M295.654 138.619L270.08 150.19l9.664 8.128-27.114 8.838"
          />
          <g transform="rotate(20 -85.802 366.493)" fill="#FFE8C1">
            <rect x="16" y="0" width="12.6" height="42.959" rx="6.3" />
            <rect
              transform="rotate(90 22.224 21.147)"
              x="15.924"
              y="-.332"
              width="12.6"
              height="42.959"
              rx="6.3"
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
);
