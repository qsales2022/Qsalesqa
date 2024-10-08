import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const HomeIcon = ({height = 22, width = 22, fill = null}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 23" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.1885 7.72166L12.6885 3.44358C11.6958 2.67083 10.3052 2.67083 9.3115 3.44358L3.8115 7.72166C3.14142 8.24233 2.75 9.04349 2.75 9.89233V16.6142C2.75 18.1332 3.98108 19.3642 5.5 19.3642H16.5C18.0189 19.3642 19.25 18.1332 19.25 16.6142V9.89233C19.25 9.04349 18.8586 8.24233 18.1885 7.72166Z"
        fill={fill ? fill : Colors.iconGray}
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.6666 13.1658C12.6408 15.1916 9.35725 15.1916 7.33325 13.1658H14.6666Z"
        fill={fill ? fill : Colors.iconGray}
      />
      <Path
        d="M14.6666 13.1658C12.6408 15.1916 9.35725 15.1916 7.33325 13.1658"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default HomeIcon;
