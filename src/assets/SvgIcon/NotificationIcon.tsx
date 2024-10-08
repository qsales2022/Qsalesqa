import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const NotificationIcon = ({height = 22, width = 22, fill = Colors.black}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.736 6.67598C14.958 6.04798 13.982 5.65698 12.905 5.65698H12.907H11.094C8.592 5.65698 6.563 7.68498 6.563 10.188V10.188V12.985C6.563 13.515 6.352 14.024 5.977 14.399L5.336 15.04C4.961 15.415 4.75 15.924 4.75 16.454V16.454C4.75 17.498 5.596 18.344 6.64 18.344H17.361C18.405 18.344 19.251 17.498 19.251 16.454V16.454C19.251 15.924 19.04 15.415 18.665 15.04L18.024 14.399C17.649 14.024 17.438 13.515 17.438 12.985V10.999"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.70801 18.344V18.709C9.70801 19.974 10.734 21 12 21V21C13.266 21 14.292 19.974 14.292 18.708V18.343"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.833 5.751V4.833C13.833 3.821 13.013 3 12 3V3C10.987 3 10.167 3.821 10.167 4.833V5.751"
        stroke={fill}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.436 6C18.817 6 19.936 7.119 19.936 8.5C19.936 9.881 18.817 11 17.436 11C16.055 11 14.936 9.881 14.936 8.5C14.936 7.119 16.056 6 17.436 6Z"
        fill="#8F1D3F"
      />
      <Path
        d="M17.436 6C18.817 6 19.936 7.119 19.936 8.5C19.936 9.881 18.817 11 17.436 11C16.055 11 14.936 9.881 14.936 8.5C14.936 7.119 16.056 6 17.436 6"
        stroke="#8F1D3F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default NotificationIcon;
