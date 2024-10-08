import {Dimensions} from 'react-native';
export const getHeight = (percent: number) => {
  // console.log(Dimensions.get('window').height);
  
  return percent === 0 ? 0 : Dimensions.get('window').height / percent;
};

export const getWidth = (percent: number) => {
  // console.log(Dimensions.get('window').width);
  
  return percent === 0 ? 0 : Dimensions.get('window').width / percent;
};
