import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header, SectionItem} from '../../../components';
import {getHeight, getWidth, lightenColor} from '../../../Theme/Constants';
import Colors from '../../../Theme/Colors';
import screens from '../../../Navigation/screens';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import useMyOrder from '../../../Api/hooks/useMyOrder';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {t} from 'i18next';
import {getLogin} from '../../../AsyncStorage/StorageUtil';
import {AppEventsLogger} from 'react-native-fbsdk-next';
import BottomSheetOrderTrack from './BottomSheetOrderTrack';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const MyOrderList = ({route, navigation}: any) => {
  const [trackOrder, setTrackOrder] = useState<boolean>(false);
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const {orderList, getMyOrder} = useMyOrder();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(null);
  // const [isBlur,setIsblur] = useState<boolean>(false)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    getLogin().then(value => {
      setToken(value);
    });
  }, [isFocused]);

  useEffect(() => {
    if (token) {
      getMyOrder(token);
    }
  }, [token]);
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
      <View style={{backgroundColor: '#EEEEEE'}}>
        <Header
          title={`${t('orders')}`}
          cartCount={count}
          onSearch={null}
          searchValue={null}
          hideSearch={true}
          onCloseSearch={null}
          hideCart={true}
          track={true}
          orderOpen={orderOpen}
        />

        <FlatList
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          data={orderList}
          renderItem={({item, index}: any) => {
            return (
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
                    // borderBottomWidth: 0.5,
                    // borderColor: 'grey',
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
                      uri: item?.node?.lineItems?.nodes[0]?.variant?.image?.url,
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
                        {moment(item?.node?.processedAt).format('MMMM DD YYYY')}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={{color: Colors.black, fontSize: 14, marginTop: 6}}>
                      {item?.node?.lineItems?.nodes[0]?.title}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 6}}>
                      <Text style={{color: Colors.primary, fontSize: 12}}>
                        {t('paymentStatus')}
                      </Text>
                      <Text style={{color: Colors.black, fontSize: 12}}>
                        {item?.node?.financialStatus}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: Colors.primary, fontSize: 12}}>
                        {t('fulfillmentStatus')}
                      </Text>
                      <Text style={{color: Colors.black, fontSize: 12}}>
                        {item?.node?.fulfillmentStatus}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <BottomSheetOrderTrack bottomSheetModalRef={bottomSheetModalRef} />
    </>
  );
};
const styles = StyleSheet.create({
  sortFilterContainer: {
    position: 'absolute',
    bottom: getHeight(6),
    minHeight: getHeight(16),
    backgroundColor: Colors.primary,
    width: getWidth(1.5),
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFilter: {
    color: Colors.white,
    fontWeight: '500',
    marginLeft: 10,
    fontSize: getHeight(55),
  },
  borderLine: {
    borderRightWidth: 1,
    height: '60%',
    borderRightColor: Colors.white,
  },
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingBottom: getHeight(9),

    // alignSelf: 'center',
  },
});
export default MyOrderList;
