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

const Cart = ({navigation}: any) => {
  const {cartDetails, getCartData, loading}: any = useGetCart();
  const [checkoutId, setCheckoutId] = useState<any>('');
  const isFocused = useIsFocused();
  const {checkout, checkoutWithShipping}: any = useCheckout();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const getCheckoutId = async () => {
    try {
      const value = await AsyncStorage.getItem('checkoutId');
      if (value !== null) {
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
    console.log('cartDetails: ', cartDetails?.node?.lineItems?.edges.length);
  }, [cartDetails]);

  //check checkoutId present in local storage
  useEffect(() => {
    if (isFocused) {
      dispatch(updateSelectedTab(2));
      getCartData();
    }
  }, [isFocused]);

  const next = () => {
    checkoutWithShipping('', '', '', '', '', '');
  };

  useEffect(() => {

    if (checkout) {
      const dataToPass = {
        url: checkout?.checkoutShippingAddressUpdateV2?.checkout?.webUrl,
      };
      navigation.navigate(screens.payment, dataToPass);
    }

  }, [checkout]);
  return (
    <View
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
              {cartDetails?.node?.lineItems?.edges.length}
            </Text>
          </View>
        </View>
        {!loading ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cartDetails?.node?.lineItems?.edges}
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
                  style={{height: getHeight(1.2), justifyContent: 'center'}}>
                  <View
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
                  </View>
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
                  {cartDetails?.node?.lineItems?.edges.length > 0 && (
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
                        {cartDetails?.node?.lineItemsSubtotalPrice?.amount !=
                          cartDetails?.node?.totalPrice?.amount && (
                          <Text
                            style={{
                              textDecorationLine: 'line-through',
                              color: 'grey',
                              fontWeight: '600',
                            }}>
                            {formatPrice(
                              Number(
                                cartDetails?.node?.lineItemsSubtotalPrice
                                  ?.amount,
                              ),
                            )}{' '}
                            {
                              cartDetails?.node?.lineItemsSubtotalPrice
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
                            Number(cartDetails?.node?.totalPrice?.amount),
                          )}{' '}
                          {cartDetails?.node?.totalPrice?.currencyCode}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => next()}
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
                        <Text
                          style={{
                            color: Colors.white,
                            fontWeight: '500',
                            fontSize: 16,
                          }}>
                          {t('placeOrder')}
                        </Text>
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
    </View>
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
