import {Svg, Path, Mask, Rect, G} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const SortIcon = ({height = 22, width = 22, fill = Colors.white}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Mask
        id="mask0_109_1811"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}>
        <Rect width={height} height={height} fill={fill} />
      </Mask>
      <G mask="url(#mask0_109_1811)">
        <Path
          d="M3.25 17.7498V16.2499H8.74995V17.7498H3.25ZM3.25 12.5575V11.0576H14.75V12.5575H3.25ZM3.25 7.36521V5.86523H20.75V7.36521H3.25Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default SortIcon;
