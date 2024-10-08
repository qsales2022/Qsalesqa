import { Svg, Path, Circle, Mask, Rect, G } from "react-native-svg";
import React from "react";
import Colors from "../../Theme/Colors";
import { View } from "react-native";

const SelectLanguageIcon = ({ height = 26, width = 26 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 15H7.5C7.22386 15 7 14.7761 7 14.5V9.5C7 9.22386 7.22386 9 7.5 9H11"
      stroke={Colors.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 12H7"
      stroke={Colors.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5 15V12.5C13.5 11.6716 14.1716 11 15 11H15.5C16.3284 11 17 11.6716 17 12.5V15"
      stroke={Colors.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5 12.5V11"
      stroke={Colors.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect
      x={3}
      y={3}
      width={18}
      height={18}
      rx={5}
      stroke={Colors.primary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  );
};

export default SelectLanguageIcon;
