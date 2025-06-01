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
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {getHeight, getWidth} from '../../../Theme/Constants';
import CommonStyles from '../../../Theme/CommonStyles';
import icons from '../../../assets/icons';
import SvgIcon from '../../../assets/SvgIcon';
import {RoundItem, TextInputBox} from '../../../components';
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
import {useDispatch} from 'react-redux';
import {toggleLoader} from '../../../redux/reducers/GlobalReducer';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const PaymentWebView = ({route, navigation}: any) => {
  const {cart, createCart}: any = useCreateCart();
  const {url, eventPrice, eventId} = route.params;
  const [checkoutCompleted, setCheckoutCompleted]: any = useState(false);
  const dispatch = useDispatch();
  // const {} =
  useEffect(() => {
    dispatch(toggleLoader(true));
  }, []);

  useEffect(() => {
    if (url == undefined) {
      console.log(url, 'this is url');
      createCart();
    }

    console.log(url, 'this not is url');
  }, [url]);

  useEffect(() => {
    if (cart) {
      storeCheckoutId(cart?.checkoutCreate?.checkout?.id);
    }
  }, [cart]);

  const storeCheckoutId = async (value: any) => {
    try {
      console.log(value, 'this is value');

      await AsyncStorage.setItem('checkoutId', value);
      if (checkoutCompleted) {
        navigation.replace(screens.successScreen);
      } else {
        navigation.goBack();
      }
    } catch (e) {
      // saving error
    }
  };

  const handleWebViewMessage = async (message: any) => {
    if (JSON.parse(message)?.checkout_completed) {
      await setCheckoutCompleted(true);
      await AsyncStorage.removeItem('checkoutId');
      createCart();
    }
  };
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
    AppEventsLogger.logPurchase(eventPrice, 'QAR', {
      content_ids: eventId,
      content_type: 'product',
    });
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: `${url}`}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={event => handleWebViewMessage(event.nativeEvent.data)}
        style={styles.webView}
        onLoad={() => dispatch(toggleLoader(false))}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
      />
    </View>
  );
};

export default PaymentWebView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
