import { Svg, Path, Circle } from "react-native-svg";
import React from "react";
import Colors from "../../Theme/Colors";

const CartIcon = ({ height = 22, width = 22, fill = "black" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path
        d="M7.33333 16.0418L4.58333 3.2085H2.75"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.5625 16.0418H16.7292"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle
        cx="16.7292"
        cy="17.646"
        r="1.60417"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Circle
        cx="7.56242"
        cy="17.646"
        r="1.60417"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M5.17261 5.9585H18.3328C18.6176 5.95849 18.8862 6.09085 19.0597 6.31667C19.2332 6.54249 19.2919 6.83612 19.2185 7.11129L17.7524 12.6113C17.6454 13.0126 17.282 13.2918 16.8666 13.2918H6.74405"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CartIcon;
