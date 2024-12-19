import {Dimensions} from 'react-native';
export const getHeight = (percent: number) => {
  // console.log(Dimensions.get('window').height);
  
  return percent === 0 ? 0 : Dimensions.get('window').height / percent;
};

export const getWidth = (percent: number) => {
  // console.log(Dimensions.get('window').width);
  
  return percent === 0 ? 0 : Dimensions.get('window').width / percent;
};
export const lightenColor = (hex:any, percent:any) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * percent / 100);
  const g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent / 100);
  const b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent / 100);

  // Ensure values stay within 0–255
  const newR = Math.min(255, Math.max(0, r));
  const newG = Math.min(255, Math.max(0, g));
  const newB = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1).toUpperCase()}`;
};
