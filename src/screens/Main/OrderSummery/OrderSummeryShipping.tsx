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
  useGetCart,
  useGetCheckoutPriceDetails,
  useUpdateShipping,
} from '../../../Api/hooks';
import {useRoute} from '@react-navigation/native';
import { AppEventsLogger } from 'react-native-fbsdk-next';

const OrderSummeryShipping = ({route, navigation}: any) => {
  enum DeliveryMethod {
    SHIP,
    PICKUP,
  }
  const [deliveryMethod, setDeliveryMethod]: any = useState(null);
  const {cartDetails, getCartData}: any = useGetCart();
  const {priceDetails, getPriceDetails}: any = useGetCheckoutPriceDetails();
  const {checkout, checkoutWithShipping}: any = useCheckout();
  const {shippingUpdateData, updateShppingMethod}: any = useUpdateShipping();
  const [webUrl, setWebUrl]: any = useState('');

  const {email, firstName, lastName, buildingNumber, place, city, number} =
    route.params;

  useEffect(() => {
    console.log('summery shippiing');

    getPriceDetails();
    checkoutWithShipping(
      number,
      firstName,
      lastName,
      buildingNumber,
      place,
      city,
    );
  }, []);

  useEffect(() => {
    if (cartDetails) {
      setDeliveryMethod(
        cartDetails?.node?.availableShippingRates?.shippingRates
          ? cartDetails?.node?.availableShippingRates?.shippingRates.length > 0
            ? cartDetails?.node?.availableShippingRates?.shippingRates[0]
            : null
          : null,
      );
    }
  }, [cartDetails]);

  useEffect(() => {
    if (checkout) {
      setWebUrl(checkout?.checkoutShippingAddressUpdateV2?.checkout?.webUrl);
      getCartData();
    }
  }, [checkout]);

  useEffect(() => {
    if (shippingUpdateData) {
      setWebUrl(
        shippingUpdateData?.checkoutShippingLineUpdate?.checkout?.webUrl,
      );
    }
  }, [shippingUpdateData]);

  useEffect(() => {
    if (deliveryMethod) {
      updateShppingMethod(deliveryMethod?.handle);
    }
  }, [deliveryMethod]);

  const next = () => {
    const dataToPass = {
      url: webUrl,
    };
    navigation.navigate(screens.payment, dataToPass);
  };
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  const priceCard = (label: any, price: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '95%',
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: getHeight(45)}}>{label} </Text>
        <Text style={{fontSize: getHeight(45)}}>{price} </Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={[CommonStyles.containerFlex1, {backgroundColor: Colors.white}]}>
      <ScrollView style={{paddingBottom: getHeight(2)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgIcon.BackArrow
              width={getWidth(10)}
              height={getWidth(10)}
              fill={Colors.black}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: Colors.black,
              fontSize: getHeight(35),
              marginBottom: getHeight(45),
              marginRight: 10,
              marginTop: 15,
            }}>
            Order summary
          </Text>
        </View>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              paddingBottom: 50,
              marginBottom: 20,
            }}>
            <Image
              style={{height: getHeight(28), width: getHeight(28)}}
              source={icons.check_circle}
            />
            <Text>Information ----</Text>
            <Image
              style={{height: getHeight(28), width: getHeight(28)}}
              source={icons.check_circle}
            />

            <Text>Shipping ----</Text>
            <Image
              style={{height: getHeight(28), width: getHeight(28)}}
              source={icons.check_circle_gray}
            />
            <Text>Payment</Text>
          </View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginBottom: 10,
            }}>
            Contact
          </Text>
          <View
            style={{borderWidth: 0.5, borderRadius: 6, padding: getHeight(50)}}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: getHeight(50),
                marginBottom: 10,
                color: Colors.black,
              }}>
              {email}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: getHeight(50),
                marginBottom: 10,
                color: Colors.black,
              }}>
              {number}
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginBottom: 10,
              marginTop: 10,
            }}>
            Ship To
          </Text>
          <View
            style={{borderWidth: 0.5, borderRadius: 6, padding: getHeight(50)}}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: getHeight(50),
                marginBottom: 10,
                color: Colors.black,
              }}>
              {firstName}, {lastName}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: getHeight(50),
                marginBottom: 10,
                color: Colors.black,
              }}>
              {buildingNumber}, {place}, {city}, Qatar
            </Text>
          </View>

          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginBottom: 10,
              marginTop: 10,
            }}>
            Shipping method
          </Text>
          {deliveryMethod && (
            <FlatList
              scrollEnabled={false}
              data={cartDetails?.node?.availableShippingRates?.shippingRates}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setDeliveryMethod(item)}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 0.5,
                      backgroundColor:
                        deliveryMethod == item ? Colors.accent : Colors.white,
                      padding: getHeight(50),
                    }}>
                    <View
                      style={{
                        borderWidth: deliveryMethod == item ? 5 : 0.5,
                        borderColor:
                          deliveryMethod == item
                            ? Colors.primary
                            : Colors.black,
                        height: getHeight(40),
                        width: getHeight(40),
                        borderRadius: getHeight(40) / 2,
                        alignSelf: 'center',
                      }}
                    />
                    <View style={{left: '50%'}}>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: getHeight(50),
                          color: Colors.primary,
                        }}>
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: getHeight(50),
                          color: Colors.black,
                        }}>
                        {item.price?.currencyCode} {item.price?.amount}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item: any, index: any) => index}
            />
          )}

          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginBottom: 30,
              marginTop: 20,
            }}>
            Price details ( {cartDetails?.node?.lineItems?.edges?.length} items
            selected )
          </Text>

          {priceCard(
            'Subtotal',
            `${priceDetails?.node?.subtotalPriceV2?.currencyCode} ${priceDetails?.node?.subtotalPriceV2?.amount}`,
          )}
          {deliveryMethod &&
            priceCard(
              'Shipping',
              `${deliveryMethod?.price?.currencyCode} ${deliveryMethod?.price?.amount}`,
            )}
          {/* {priceCard('Discount', ' QAR 100.00')}
          {priceCard('Coupon discount', 'QAR 20.00')} */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
              alignSelf: 'center',
              marginBottom: 10,
              marginTop: 10,
            }}>
            <Text style={{fontSize: getHeight(40), fontWeight: '500'}}>
              Total amount
            </Text>
            <Text
              style={{
                fontSize: getHeight(40),
                fontWeight: '500',
                color: Colors.primary,
              }}>
              {`${priceDetails?.node?.totalPriceV2?.currencyCode} ${
                Number(priceDetails?.node?.totalPriceV2?.amount) +
                Number(deliveryMethod?.price?.amount)
              }`}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          {
            height: getHeight(8),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.transparentBlack,
          },
          CommonStyles.shadow,
        ]}>
        <View
          style={[
            {
              height: getHeight(8),
              width: '100%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.white,
            },
            CommonStyles.shadow,
          ]}>
          <Text style={{color: Colors.black}}>
            {cartDetails?.node?.lineItems?.edges?.length} items selected for
            order
          </Text>
          <TouchableOpacity
            onPress={() => next()}
            style={{
              width: '90%',
              height: getHeight(18),
              backgroundColor: Colors.primary,
              marginTop: 10,
              alignSelf: 'center',
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontWeight: '500',
                fontSize: getHeight(35),
              }}>
              Continue to payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OrderSummeryShipping;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: getHeight(2),
  },
});
