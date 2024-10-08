import {Svg, Path} from 'react-native-svg';
import React from 'react';
import Colors from '../../Theme/Colors';

const ExploreIcon = ({height = 22, width = 22, fill = null}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 23" fill="none">
      <Path
        d="M18.6697 19.6567L15.4868 16.4738"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.4839 6.12862C18.3397 8.98448 18.3397 13.6147 15.4838 16.4705C12.628 19.3264 7.99775 19.3264 5.1419 16.4705C2.28605 13.6147 2.28603 8.98448 5.14186 6.12862C6.51329 4.75717 8.37336 3.98669 10.3129 3.98669C12.2524 3.98669 14.1124 4.75717 15.4839 6.12862"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.3159 7.875V11.0305"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.7434 11.7922C13.7434 11.3713 13.4023 11.0302 12.9815 11.0302H7.64988C7.22907 11.0302 6.88794 11.3713 6.88794 11.7922"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.8673 14.7305H12.7641C13.305 14.7305 13.7434 14.292 13.7434 13.7511V10.2597C13.7434 9.86288 13.6631 9.47013 13.5074 9.10507L13.2352 8.46947C13.0811 8.10907 12.7271 7.87521 12.3351 7.875H8.29626C7.90397 7.87482 7.54942 8.10874 7.39525 8.46947L7.12396 9.10409C6.96881 9.46793 6.88854 9.8593 6.88794 10.2548V13.7511C6.88794 14.292 7.32641 14.7305 7.8673 14.7305Z"
        stroke={fill ? fill : Colors.iconGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ExploreIcon;
