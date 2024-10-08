import {Svg, Path, Mask, G, Rect} from 'react-native-svg';
import React from 'react';

const AwesomeStar = ({height = 22, width = 22, fill = '#7C1E51'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 17" fill="none">
      <Mask
        id="mask0_1_166"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="17"
        height="17">
        <Rect width="17" height="17" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1_166)">
        <Path
          d="M13.1042 6.0889L12.355 4.42706L10.6931 3.67787L12.355 2.92868L13.1042 1.26685L13.8534 2.92868L15.5152 3.67787L13.8534 4.42706L13.1042 6.0889ZM13.1042 15.7331L12.355 14.0713L10.6931 13.3221L12.355 12.5729L13.1042 10.9111L13.8534 12.5729L15.5152 13.3221L13.8534 14.0713L13.1042 15.7331ZM6.29328 13.3084L4.7949 9.99835L1.48486 8.49997L4.7949 7.0016L6.29328 3.69154L7.79167 7.0016L11.1017 8.49997L7.79167 9.99835L6.29328 13.3084Z"
          fill={fill}
        />
      </G>
    </Svg>
  );
};

export default AwesomeStar;
