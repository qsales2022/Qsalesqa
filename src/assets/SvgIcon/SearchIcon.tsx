import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const SearchIcon = ({height = 22, width = 22, fill = Colors.black}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
      <Path
        d="M9.10409 17.125C13.2577 17.125 16.6249 13.7578 16.6249 9.60421C16.6249 5.45057 13.2577 2.08337 9.10409 2.08337C4.95044 2.08337 1.58325 5.45057 1.58325 9.60421C1.58325 13.7578 4.95044 17.125 9.10409 17.125Z"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M17.4166 17.9167L15.8333 16.3334"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SearchIcon;
