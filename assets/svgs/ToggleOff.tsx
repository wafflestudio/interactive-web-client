import React from "react";

const ToggleOff = () => (
  <svg
    width="40"
    height="26"
    viewBox="0 0 40 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_927_15)">
      <path
        d="M0 11C0 7.13401 3.13401 4 7 4H22C25.866 4 29 7.13401 29 11C29 14.866 25.866 18 22 18H7C3.13401 18 0 14.866 0 11Z"
        fill="#7E7E7E"
      />
      <path
        d="M32 11C32 15.9706 27.9706 20 23 20C18.0294 20 14 15.9706 14 11C14 6.02944 18.0294 2 23 2C27.9706 2 32 6.02944 32 11Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_927_15"
        x="0"
        y="0"
        width="40"
        height="26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="4" dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_927_15"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_927_15"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default ToggleOff;
