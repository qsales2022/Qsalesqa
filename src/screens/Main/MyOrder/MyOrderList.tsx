import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header, SectionItem} from '../../../components';
import {getHeight, getWidth, lightenColor} from '../../../Theme/Constants';
import Colors from '../../../Theme/Colors';
import screens from '../../../Navigation/screens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import useMyOrder from '../../../Api/hooks/useMyOrder';
import {ThemeProvider, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {t} from 'i18next';
import {getLogin} from '../../../AsyncStorage/StorageUtil';
import {AppEventsLogger} from 'react-native-fbsdk-next';
import BottomSheetOrderTrack from './BottomSheetOrderTrack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import {Tooltip} from '@rneui/themed';
import FastImage from 'react-native-fast-image';

const MyOrderList = ({route, navigation}: any) => {
  const [trackOrder, setTrackOrder] = useState<boolean>(false);
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const {orderList, getMyOrder, loading}: any = useMyOrder();
  const [token, setToken] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState<any>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    getLogin().then(value => {
      setToken(value);
    });
  }, []);

  useEffect(() => {
    if (token) {
      getMyOrder(token);
    }
  }, [token]);

  useEffect(() => {
    if (orderList?.length === 0) {
      setTooltipVisible(true);
    } else {
      setTooltipVisible(false);
    }
  }, [orderList]);

  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);

  const orderOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [trackOrder]);

  return (
    <>
      {!loading ? (
        <TouchableWithoutFeedback>
          <View style={{backgroundColor: '#EEEEEE', flex: 1}}>
            <Header
              title="Orders"
              cartCount={count}
              onSearch={null}
              hideSearch={true}
              onCloseSearch={null}
              hideCart={true}
              track={true}
              orderOpen={orderOpen}
            />

            {tooltipVisible && (
              <TouchableOpacity style={styles.container1}>
                <Tooltip
                  popover={
                    <Text style={{color: 'black'}}>
                      No orders found. Even if you placed an order on another
                      platform, you can still track it here.
                    </Text>
                  }
                  width={300}
                  height={80}
                  backgroundColor="#F8F08E"
                  visible={true}
                  withPointer={true}
                  onClose={() => {
                    setTooltipVisible(false);
                  }}
                />
              </TouchableOpacity>
            )}

            <FlatList
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
              data={orderList}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    style={{
                      width: '30%',
                      height: '20%',
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={require('../../../assets/Images/empty-cart-transparent.gif')}
                  />
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: getWidth(20),
                      fontWeight: '900',
                    }}>
                    No orders found
                  </Text>
                </View>
              )}
              renderItem={({item, index}: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screens.webView, {
                      url: item?.node?.statusUrl,
                      title: item?.node?.name,
                    });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: getHeight(5),
                    marginTop: getHeight(60),
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: getHeight(6),
                      alignItems: 'center',
                      marginTop: 6,
                      backgroundColor: '#EEEEEE',
                      gap: 20,
                      padding: getHeight(20),
                    }}>
                    <Image
                      style={{width: getWidth(7), height: getWidth(7)}}
                      source={{
                        uri: item?.node?.lineItems?.nodes[0]?.variant?.image
                          ?.url,
                      }}
                    />
                    <View
                      style={{
                        width: getWidth(1) - getWidth(4),
                        paddingRight: 16,
                        paddingBottom: 16,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: Colors.primary,
                            fontSize: 12,
                            fontWeight: '600',
                            flex: 1,
                          }}>
                          {item?.node?.name}
                        </Text>
                        <Text style={{color: Colors.black, fontSize: 12}}>
                          {moment(item?.node?.processedAt).format(
                            'MMMM DD YYYY',
                          )}
                        </Text>
                      </View>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={{
                          color: Colors.black,
                          fontSize: 14,
                          marginTop: 6,
                        }}>
                        {item?.node?.lineItems?.nodes[0]?.title}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 6}}>
                        <Text style={{color: Colors.primary, fontSize: 12}}>
                          Payment Status
                        </Text>
                        <Text style={{color: Colors.black, fontSize: 12}}>
                          {item?.node?.financialStatus}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: Colors.primary, fontSize: 12}}>
                          Fulfillment Status
                        </Text>
                        <Text style={{color: Colors.black, fontSize: 12}}>
                          {item?.node?.fulfillmentStatus}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#9F1B62" />
        </View>
      )}

      <BottomSheetOrderTrack bottomSheetModalRef={bottomSheetModalRef} />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingBottom: getHeight(9),
  },
  container1: {
    position: 'absolute',
    top: Platform.select({
      ios: getHeight(15),
      android: getWidth(4.5),
    }),
    right: Platform.select({
      ios: getWidth(20),
      android: getWidth(20),
    }),
  },
});

export default MyOrderList;
