import { Svg, Path, Circle } from "react-native-svg";
import React from "react";
import Colors from "../../Theme/Colors";

const OrderIcon = ({ height = 26, width = 26 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1422 4.21953L22.2042 10.4451C22.5347 10.6157 22.7433 10.9555 22.7458 11.3274C22.7483 11.6992 22.5444 12.0418 22.2162 12.2169L17.7143 14.6179C17.1345 14.9272 16.4397 14.9321 15.8556 14.6309L3.79654 8.40327C3.46605 8.23272 3.25745 7.89292 3.25491 7.52103C3.25241 7.14914 3.45639 6.80654 3.78454 6.63153L8.28641 4.23053C8.86579 3.92286 9.55919 3.91875 10.1422 4.21953Z"
        stroke={Colors.primary}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.8586 4.21953L3.79654 10.4451C3.46605 10.6157 3.25745 10.9555 3.25491 11.3274C3.25241 11.6992 3.45639 12.0418 3.78454 12.2169L8.28641 14.6179C8.86626 14.9272 9.56106 14.9321 10.1452 14.6309L22.2042 8.40327C22.5347 8.23272 22.7433 7.89292 22.7458 7.52103C22.7483 7.14914 22.5444 6.80654 22.2162 6.63153L17.7143 4.23053C17.135 3.92286 16.4416 3.91875 15.8586 4.21953Z"
        stroke={Colors.primary}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.1083 13.3413V17.2789C20.1083 18.018 19.701 18.6969 19.0488 19.0447L13.9467 21.7688C13.3583 22.0825 12.6523 22.0825 12.0639 21.7688L6.96178 19.0447C6.30962 18.6969 5.90234 18.018 5.90234 17.2789V13.3413"
        stroke={Colors.primary}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.0002 22.004V13.1543"
        stroke={Colors.primary}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default OrderIcon;
