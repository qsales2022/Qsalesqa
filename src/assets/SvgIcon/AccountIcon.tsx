import {Svg, Path, Circle} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const AccountIcon = ({height = 22, width = 22, fill = null}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Circle
        cx="10.9999"
        cy="9.62516"
        r="2.29167"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M6.875 15.5835C7.23883 14.7488 8.06263 14.2089 8.9732 14.2085H13.0268C13.9374 14.2089 14.7612 14.7488 15.125 15.5835"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.6667 19.2501H7.33333C4.80203 19.2501 2.75 17.1981 2.75 14.6668V10.2668C2.75001 8.87444 3.38292 7.55761 4.47015 6.68782L8.13682 3.75449C9.81075 2.41533 12.1893 2.41533 13.8632 3.75449L17.5299 6.68782C18.6171 7.55762 19.25 8.87445 19.25 10.2668V14.6668C19.25 17.1981 17.198 19.2501 14.6667 19.2501Z"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default AccountIcon;
