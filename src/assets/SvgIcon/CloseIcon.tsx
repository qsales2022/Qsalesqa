import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const BackArrow = ({height = 22, width = 22, fill = '#BDAB35'}) => {
  return (
    <Svg
    width={width} height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={Colors.iconGray}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M18 6L6 18M6 6l12 12" />
  </Svg>
  );
};

export default BackArrow;
