/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Linking,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {getHeight, getWidth} from '../../../Theme/Constants';
import CommonStyles from '../../../Theme/CommonStyles';
import icons from '../../../assets/icons';
import SvgIcon from '../../../assets/SvgIcon';
import {Header, RoundItem, TextInputBox} from '../../../components';
import screens from '../../../Navigation/screens';
import {
  useCheckout,
  useCreateCart,
  useGetCart,
  useGetCheckoutPriceDetails,
} from '../../../Api/hooks';
import {useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLoader} from '../../../redux/reducers/GlobalReducer';
import {RootState} from '../../../redux/store';
import images from '../../../assets/Images';
import {t} from 'i18next';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const HelpCenter = ({route, navigation}: any) => {
  const {count} = useSelector((state: RootState) => state.CartReducer);

  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={`${t('helpCenter')}`}
        cartCount={count}
        onSearch={null}
        searchValue={null}
        hideSearch={true}
        onCloseSearch={null}
        hideCart={true}
      />
      <View style={{padding: 16}}>
        <Text style={{color: Colors.black, fontWeight: '500', fontSize: 16}}>
          {t('chatWithUs')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',
            )
              .then(data => {
                console.log('WhatsApp Opened: ', data);
              })
              .catch(() => {
                console.log('Unable to open WhatsApp');
              });
            //navigation.navigate(screens.webView,{url:'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',title:`${t('muhammedIrfan')}`})
          }}
          style={{
            flexDirection: 'row',
            backgroundColor: '#DEF4DC',
            padding: 16,
            borderRadius: 10,
            marginTop: 6,
          }}>
          <Image
            style={{height: 24, width: 24}}
            source={images.whatsapp}></Image>
          <Text style={{flex: 1, marginLeft: 6, color: Colors.black}}>
            {t('chatWithUseSub')}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',
            )
              .then(data => {
                console.log('WhatsApp Opened: ', data);
              })
              .catch(() => {
                console.log('Unable to open WhatsApp');
              });
            //  navigation.navigate(screens.webView,{url:'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',title:`${t('fathimaSana')}`})
          }}
          style={{
            flexDirection: 'row',
            marginTop: 16,
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Image
            style={{height: 25, width: 25, alignSelf: 'center'}}
            source={images.helpFemale}></Image>
          <View style={{marginLeft: 6, alignSelf: 'center'}}>
            <Text style={{color: Colors.black, fontWeight: '500'}}>
              {t('fathimaSana')}
            </Text>
            <Text style={{fontSize: 12, color: 'grey'}}>
              {t('designationHelp')}
            </Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',
            )
              .then(data => {
                console.log('WhatsApp Opened: ', data);
              })
              .catch(() => {
                console.log('Unable to open WhatsApp');
              });
            //navigation.navigate(screens.webView,{url:'https://api.whatsapp.com/send?phone=97470119277&text=Hi,%20I%20need%20help...',title:`${t('muhammedIrfan')}`})
          }}
          style={{
            flexDirection: 'row',
            marginTop: 6,
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Image
            style={{height: 25, width: 25, alignSelf: 'center'}}
            source={images.helpMale}></Image>
          <View style={{marginLeft: 6, alignSelf: 'center'}}>
            <Text style={{color: Colors.black, fontWeight: '500'}}>
              {t('muhammedIrfan')}
            </Text>
            <Text style={{fontSize: 12, color: 'grey'}}>
              {t('designationHelp')}
            </Text>
          </View>
        </TouchableOpacity> */}
        <Text style={{marginTop: 6, fontSize: 12, color: 'grey'}}>
          {t('helpWarning')}
        </Text>
        <Text
          style={{
            marginTop: 24,
            fontSize: 16,
            fontWeight: '500',
            color: Colors.black,
          }}>
          {t('connectUs')}
        </Text>
        <Text style={{marginTop: 6, fontSize: 14, color: Colors.black}}>
          {t('email')} : info@qsales.qa
        </Text>
        <Text style={{marginTop: 6, fontSize: 14, color: Colors.black}}>
          {t('phone')} : +974 31223030
        </Text>
      </View>
    </View>
  );
};

export default HelpCenter;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
