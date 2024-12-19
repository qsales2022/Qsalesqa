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
import {AppEventsLogger} from 'react-native-fbsdk-next';

const WebViewScreen = ({route, navigation}: any) => {
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const {url, html_, title} = route.params;
  const [checkoutCompleted, setCheckoutCompleted]: any = useState(false);
  const dispatch = useDispatch();
  console.log(url, 'URLLLLL');
  useEffect(() => {
    dispatch(toggleLoader(true));
  }, []);

  useEffect(() => {
    console.log('URL : ', url);
  }, [url]);

  useEffect(() => {
    console.log('html : ', html_);
  }, [html_]);

  const handleWebViewMessage = async (message: any) => {
    console.log(message);
  };
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
        title={title ?? ''}
        cartCount={count}
        onSearch={null}
        searchValue={null}
        hideSearch={true}
        onCloseSearch={null}
        hideCart={true}
      />
      {url ? (
        <WebView
          source={{uri: `${url}`}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={event => handleWebViewMessage(event.nativeEvent.data)}
          style={styles.webView}
          onLoadStart={() => dispatch(toggleLoader(true))}
          onLoadEnd={() => dispatch(toggleLoader(false))}
        />
      ) : (
        <WebView
          source={{html: html_}}
          style={{flex: 1, width: '100%'}}
          scalesPageToFit={true}
          onLoadStart={() => dispatch(toggleLoader(true))}
          onLoadEnd={() => dispatch(toggleLoader(false))}
        />
      )}
    </View>
  );
};

export default WebViewScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
