import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../Theme/Colors';
import {getHeight} from '../../../Theme/Constants';
import icons from '../../../assets/icons';
import Navigation from '../../../Navigation';
import screens from '../../../Navigation/screens';

const SuccessScreen = ({navigation}: any) => {
  return (
    <View style={[styles.container]}>
      <Image
        style={{height: getHeight(4), width: getHeight(4)}}
        source={icons.success_tick}
      />
      <Text
        style={{fontWeight: 'bold', fontSize: getHeight(45), marginBottom: 10}}>
        Thank you for your purchase!
      </Text>
      <Text
        style={{fontWeight: '500', fontSize: getHeight(55), marginBottom: 10}}>
        Your order has been received
      </Text>
      {/* <Text style={{fontSize: getHeight(55), marginBottom: 60}}>
        Order ID : QS128768
      </Text> */}
      <TouchableOpacity onPress={() => navigation.navigate(screens.home)}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: getHeight(55),
            marginBottom: 10,
            color: Colors.primary,
          }}>
          Continue shopping
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
