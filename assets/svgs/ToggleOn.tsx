import React from "react";

const ToggleOn = () => (
  <svg
    width="37"
    height="26"
    viewBox="0 0 37 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_927_18)">
      <path
        d="M8 11C8 7.13401 11.134 4 15 4H30C33.866 4 37 7.13401 37 11C37 14.866 33.866 18 30 18H15C11.134 18 8 14.866 8 11Z"
        fill="#3F8AE2"
      />
      <path
        d="M26 11C26 15.9706 21.9706 20 17 20C12.0294 20 8 15.9706 8 11C8 6.02944 12.0294 2 17 2C21.9706 2 26 6.02944 26 11Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_927_18"
        x="0"
        y="0"
        width="37"
        height="26"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-4" dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_927_18"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_927_18"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default ToggleOn;
