import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {getHeight, getWidth} from '../../../Theme/Constants';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function DeatailsSkeleton() {
  return (
    <View>
      <View style={styles.containerImage}>
        <ShimmerPlaceholder style={styles.Image}></ShimmerPlaceholder>
      </View>
      <View style={{marginTop: getHeight(40), marginLeft: getWidth(40)}}>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
      </View>
      <View style={{marginTop: getHeight(40), marginLeft: getWidth(40)}}>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.textStyle}></ShimmerPlaceholder>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: getHeight(30),
        }}>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: getHeight(30),
        }}>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: getHeight(30),
        }}>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
        <ShimmerPlaceholder style={styles.footerView}></ShimmerPlaceholder>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  Image: {
    width: getWidth(1.2),
    backgroundColor: 'red',
    height: getHeight(3.9),
    marginTop: getHeight(30),
  },
  textStyle: {
    width: getWidth(1.9),
    height: getHeight(50),
    marginTop: getHeight(40),
  },
  footerView: {
    width: getWidth(5),
    height: getHeight(80),
  },
});
