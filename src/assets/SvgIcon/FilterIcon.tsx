import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const FilterIcon = ({height = 22, width = 22, fill = Colors.white}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
      <Path
        d="M8.25 17.75V12.25H9.74995V14.25H17.75V15.75H9.74995V17.75H8.25ZM0.25 15.75V14.25H5.74995V15.75H0.25ZM4.25 11.75V9.74995H0.25V8.25H4.25V6.25H5.74995V11.75H4.25ZM8.25 9.74995V8.25H17.75V9.74995H8.25ZM12.25 5.74995V0.25H13.75V2.25H17.75V3.74995H13.75V5.74995H12.25ZM0.25 3.74995V2.25H9.74995V3.74995H0.25Z"
        fill={fill}
      />
    </Svg>
  );
};

export default FilterIcon;
