import { Svg, Path, Circle, Mask, Rect, G } from "react-native-svg";
import React from "react";
import Colors from "../../Theme/Colors";
import { View } from "react-native";

const CoupenIcon = ({ height = 26, width = 26 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 23" fill="none">
      <Mask
        id="mask0_109_2362"
        maskUnits="userSpaceOnUse"
        x={0}
        y={-1}
        width={23}
        height={24}
      >
        <Rect y={-0.5} width={23} height={23} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_109_2362)">
        <Path
          d="M11.5006 21.1657L8.49088 18.1874H4.31315V14.0096L1.33496 10.9999L4.31315 7.99015V3.81242H8.49088L11.5006 0.834229L14.5104 3.81242H18.6881V7.99015L21.6663 10.9999L18.6881 14.0096V18.1874H14.5104L11.5006 21.1657ZM11.5006 19.1457L13.8965 16.7499H17.2506V13.3957L19.6465 10.9999L17.2506 8.60406V5.24989H13.8965L11.5006 2.85406L9.10479 5.24989H5.75063V8.60406L3.35479 10.9999L5.75063 13.3957V16.7499H9.10479L11.5006 19.1457ZM11.5006 15.6109L12.8677 14.2439H14.7446V12.367L16.1117 10.9999L14.7446 9.63281V7.75594H12.8677L11.5006 6.38885L10.1335 7.75594H8.25667V9.63281L6.88958 10.9999L8.25667 12.367V14.2439H10.1335L11.5006 15.6109Z"
          fill="#8F1D3F"
        />
      </G>
    </Svg>
  );
};

export default CoupenIcon;
