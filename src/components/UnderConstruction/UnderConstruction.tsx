import {StyleSheet, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {getWidth} from '../../Theme/Constants';
import Animations from '../../assets/Animations';
const UnderConstruction = () => {
  return (
    <View style={styles.container}>
      <Lottie
        resizeMode="contain"
        autoPlay
        loop
        source={Animations.construction}
        style={{height: getWidth(1.5), width: getWidth(1.5)}}
      />
    </View>
  );
};

export default UnderConstruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
