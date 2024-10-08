import {
  Svg,
  Path,
  Circle,
  G,
  Defs,
  Stop,
  ClipPath,
  Rect,
  LinearGradient,
} from "react-native-svg";
import React from "react";
import Colors from "../../Theme/Colors";
import { View } from "react-native-animatable";

const WhatsappIcon = ({ height = 22, width = 22, fill = null }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 42 42" fill="none">
      <G clipPath="url(#clip0_109_3789)">
        <Path d="M35.8782 6.10346C31.93 2.16988... (The rest of your SVG path data)" />
        {/* Add other paths here if needed */}
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_109_3789"
          x1="20.9995"
          y1="40.8035"
          x2="20.9995"
          y2="0.722967"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#20B038" />
          <Stop offset="1" stopColor="#60D66A" />
        </LinearGradient>
        <ClipPath id="clip0_109_3789">
          <Rect width="42" height="42" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default WhatsappIcon;
