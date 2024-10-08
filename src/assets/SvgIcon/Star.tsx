import {Svg, Path} from 'react-native-svg';
import React from 'react';

const Star = ({height = 22, width = 22, fill = '#E276B1'}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 10 9" fill="none">
      <Path
        d="M2.4972 8.83013L3.23742 5.64274L0.764404 3.49958L4.02732 3.21642L5.30009 0.210842L6.57286 3.21642L9.83578 3.49958L7.36277 5.64274L8.10298 8.83013L5.30009 7.13907L2.4972 8.83013Z"
        fill={fill}
      />
    </Svg>
  );
};

export default Star;
