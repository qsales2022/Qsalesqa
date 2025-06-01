/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {getHeight, getWidth} from '../../../Theme/Constants';
import CommonStyles from '../../../Theme/CommonStyles';
import {CartItem} from '../../../components';
import screens from '../../../Navigation/screens';
import {useCheckout, useGetCart} from '../../../Api/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import products from '../../../DummyData/products';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {updateCount} from '../../../redux/reducers/CartReducer';
import SvgIcon from '../../../assets/SvgIcon';
import {updateSelectedTab} from '../../../redux/reducers/GlobalReducer';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useTranslation} from 'react-i18next';
import {formatPrice} from '../../../Utils';
import CartSeklton from './CartSeklton';
import useChekoutUrl from '../../../Api/hooks/useChekoutUrl';
import {ActivityIndicator} from 'react-native';
import {tokenSlice} from '../../../redux/reducers/TokenReducer';
import {AppEventsLogger} from 'react-native-fbsdk-next';
import LottieView from 'lottie-react-native';

const Cart = ({navigation}: any) => {
  const {cartDetails, getCartData, loading}: any = useGetCart();
  const [checkoutId, setCheckoutId] = useState<any>('');
  const isFocused = useIsFocused();
  const {checkout, checkoutWithShipping}: any = useCheckout();
  const {checkoutUrl, createChekout}: any = useChekoutUrl();
  const [checkLoading, setCheckLoading] = useState<boolean>(false);
  const [eventId, setEventId] = useState('');
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [eventPrice, setEventPrice] = useState(0);

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const getCheckoutId = async () => {
    try {
      const value = await AsyncStorage.getItem('checkoutId');
      
      if (value !== null) {
        console.log(value,'console.log(value)');

        setCheckoutId(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getCheckoutId();
  }, []);

  useEffect(() => {
    const calculateTotalDiscount = (lines: any) => {
      return lines?.reduce((acc: any, line: any) => {
        const lineDiscount = line?.node?.discountAllocations?.reduce(
          (sum: any, allocation: any) =>
            sum + parseFloat(allocation?.discountedAmount?.amount),
          0,
        );
        return acc + lineDiscount;
      }, 0);
    };

    const discount = calculateTotalDiscount(cartDetails?.cart?.lines?.edges);

    // Update state with the calculated discount
    setTotalDiscount(discount);
  }, [cartDetails]);

  //check checkoutId present in local storage
  useEffect(() => {
    if (isFocused) {
      dispatch(updateSelectedTab(2));
      getCartData();
    }
  }, [isFocused]);

  const next = () => {
    setCheckLoading(true);
    checkoutWithShipping('', '', '', '', '', '');
  };

  useEffect(() => {
    const handleCheckout = async () => {
      if (!checkoutId) return;
      // Ensure checkoutId is available
      if (checkout) {
        const url = await createChekout(checkoutId);
        if (url) {
          setCheckLoading(false);
          navigation.navigate(screens.payment, {url, eventPrice, eventId});

        } else {
        }
      }
    };

    handleCheckout();
  }, [checkout]);

  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  useEffect(() => {
    const mapData = cartDetails?.cart?.lines?.edges?.map((val: any, i: any) => {
      return val?.node?.merchandise?.id;
    });
    setEventId(mapData);
     setEventPrice(parseFloat(cartDetails?.cart?.cost?.totalAmount?.amount));

  }, [cartDetails]);
  return (
    <>
      <SafeAreaView
        style={[CommonStyles.containerFlex1, {backgroundColor: Colors.white}]}>
        <View style={styles.container}>
          <View
            style={[
              CommonStyles.flexRowContainer,
              {marginTop: getHeight(80), marginBottom: getHeight(80)},
            ]}>
            <Text
              style={{
                color: Colors.black,
                fontSize: getHeight(35),
                marginRight: 10,
                alignSelf: 'center',
                marginLeft: 16,
              }}>
              {t('cart')}
            </Text>

            <View
              style={{
                backgroundColor: Colors.primary,
                borderRadius: 100,
                height: getHeight(35),
                minWidth: getHeight(25),
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.badgeText}>
                {cartDetails?.cart?.lines?.edges?.length}
              </Text>
            </View>
          </View>
          {!loading ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={cartDetails?.cart?.lines?.edges}
              renderItem={({item, index}: any) => {
                return (
                  <CartItem
                    key={index}
                    product={item?.node}
                    checkoutId={checkoutId}
                    updateCallBack={() => {
                      getCartData();
                    }}
                    removedCallBack={() => {
                      Toast.show({
                        type: 'success',
                        text1: `${t('cartItemRemoved')}`,
                        position: 'bottom',
                      });
                      getCartData();
                    }}
                  />
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      height: getHeight(1.2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <LottieView
                      source={require('../../../assets/Animations/EmptyAnimation.json')}
                      autoPlay
                      loop
                      style={{width: getWidth(4), height: getHeight(4)}}
                      colorFilters={[{keypath: 'LayerName', color: '#FF0000'}]}
                    />
                    {/* <View
                      style={{
                        justifyContent: 'center',
                        width: getHeight(10),
                        alignSelf: 'center',
                      }}>
                      <View style={{left: getHeight(15)}}>
                        <SvgIcon.EmptyCartTwo
                          width={getHeight(10)}
                          height={getHeight(10)}
                        />
                      </View>
                      <SvgIcon.EmptyCartOne
                        width={getHeight(10)}
                        height={getHeight(10)}
                      />
                    </View> */}

                    <Text
                      style={{
                        color: Colors.black,
                        alignSelf: 'center',
                        fontSize: getHeight(40),
                        fontWeight: '600',
                        marginTop: 10,
                      }}>
                      {t('cartEmpty')}
                    </Text>
                    <Text
                      style={{
                        color: Colors.black,
                        alignSelf: 'center',
                        fontSize: getHeight(50),
                        fontWeight: '400',
                        width: getWidth(1.5),
                        marginTop: 10,
                        textAlign: 'center',
                      }}>
                      {t('cartEmptySub')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(screens.home)}>
                      <Text
                        style={{
                          color: Colors.primary,
                          alignSelf: 'center',
                          fontSize: getHeight(40),
                          fontWeight: '600',
                          width: getWidth(1.5),
                          marginTop: 10,
                          textAlign: 'center',
                          textDecorationLine: 'underline',
                        }}>
                        {t('shopOurProduct')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <>
                    {cartDetails?.cart?.lines?.edges?.length > 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          paddingBottom: 24,
                          paddingTop: 24,
                          elevation: 6,
                          backgroundColor: 'white',
                          padding: 16,
                          borderTopWidth: 6,
                          borderColor: Colors.transparentBlack,
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                          }}>
                          {totalDiscount !== 0 && (
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                color: 'grey',
                                fontWeight: '600',
                              }}>
                              {formatPrice(
                                Number(
                                  cartDetails?.cart?.cost?.totalAmount?.amount,
                                ) + totalDiscount,
                              )}{' '}
                              {
                                cartDetails?.cart?.cost?.subtotalAmount
                                  ?.currencyCode
                              }
                            </Text>
                          )}

                          <Text
                            style={{
                              color: Colors.black,
                              fontWeight: '600',
                            }}>
                            {formatPrice(
                              Number(
                                cartDetails?.cart?.cost?.totalAmount?.amount,
                              ),
                            )}{' '}
                            {cartDetails?.cart?.cost?.totalAmount?.currencyCode}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            next();
                          }}
                          style={{
                            backgroundColor: Colors.primary,
                            alignSelf: 'center',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: 8,
                            paddingBottom: 8,
                            flex: 1,
                          }}>
                          {!checkLoading ? (
                            <Text
                              style={{
                                color: Colors.white,
                                fontWeight: '500',
                                fontSize: 16,
                              }}>
                              {t('placeOrder')}
                            </Text>
                          ) : (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                );
              }}
            />
          ) : (
            <CartSeklton />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // width: "95%",
    // alignSelf: "center",
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
