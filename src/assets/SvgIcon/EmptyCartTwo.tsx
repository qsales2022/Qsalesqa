import { Svg, Path, Circle, G } from 'react-native-svg';
import React from 'react';

const EmptyCartTwo = ({ height = 22, width = 22, fill = null }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 67 48" fill="none">
      <Path d="M16.4906 14.4604C19.3179 22.1002 25.3414 28.1237 32.9812 30.9511C25.3414 33.7784 19.3179 39.8019 16.4906 47.4417C13.6633 39.8019 7.63977 33.7784 0 30.9511C7.63977 28.1237 13.6633 22.1002 16.4906 14.4604Z" fill="#D46F88" />
      <Path d="M44.2131 10L44.2795 10.1898C45.2295 12.908 47.3186 15.0762 49.9995 16.1268C47.3186 17.1773 45.2295 19.3455 44.2795 22.0637L44.2131 22.2535L44.1468 22.0637C43.1967 19.3455 41.1077 17.1773 38.4268 16.1268C41.1077 15.0762 43.1967 12.908 44.1468 10.1898L44.2131 10Z" fill="#EDCD8D" />
    </Svg>
  );
};

export default EmptyCartTwo;
