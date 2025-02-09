/* eslint-disable react-hooks/exhaustive-deps */
import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import images from '../../../assets/Images';
import {getHeight, getWidth} from '../../../Theme/Constants';
import screens from '../../../Navigation/screens';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import {updateLaunch} from '../../../redux/reducers/GlobalReducer';
import { firstUserLaunch } from '../../../AsyncStorage/StorageUtil';

const LogoSplash = ({navigation}: any) => {
  const {language} = useSelector((state: RootState) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language) {
      handleLanguageChange(language);
    }
    const setLaunchStatus = async () => {
      await firstUserLaunch('launchStatus', 'true');  
      dispatch(updateLaunch(true));                      
    };
  
    setLaunchStatus();
    setTimeout(async () => {
      // const value = await AsyncStorage.getItem("hideWelcome");

      navigation.replace(screens.main);

      // if (value) {
      //   navigation.replace(screens.main);
      // } else {
      //   navigation.replace(screens.onBoarding);
      // }
    }, 1400);
  }, []);

  const handleLanguageChange = (language: string) => {
    i18next.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../../assets/Images/splashLogo.gif')}
        style={{
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

export default LogoSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
