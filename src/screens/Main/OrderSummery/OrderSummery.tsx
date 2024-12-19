/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import {getHeight, getWidth} from '../../../Theme/Constants';
import CommonStyles from '../../../Theme/CommonStyles';
import icons from '../../../assets/icons';
import SvgIcon from '../../../assets/SvgIcon';
import {TextInputBox} from '../../../components';
import screens from '../../../Navigation/screens';
import {t} from 'i18next';
import {useGetCart, useGetCheckoutPriceDetails} from '../../../Api/hooks';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const OrderSummery = ({navigation}: any) => {
  enum DeliveryMethod {
    SHIP,
    PICKUP,
  }
  const [deliveryMethod, setDeliveryMethoid] = useState(DeliveryMethod.SHIP);
  const {cartDetails, getCartData}: any = useGetCart();
  const {priceDetails, getPriceDetails}: any = useGetCheckoutPriceDetails();
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isInvalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidFirstNameMessage, setInvalidFirstNameMessage] = useState('');
  const [lastName, setLastName] = useState('');
  const [isInvalidLastName, setInvalidLastName] = useState(false);
  const [invalidLastNameMessage, setInvalidLastNameMessage] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [isInvalidBuildingNumber, setInvalidBuildingNumber] = useState(false);
  const [invalidBuildingNumberMessage, setInvalidBuildingNumberMessage] =
    useState('');
  const [place, setPlace] = useState('');
  const [isInvalidPlace, setInvalidPlace] = useState(false);
  const [invalidPlaceMessage, setInvalidPlaceMessage] = useState('');
  const [city, setCity] = useState('');
  const [isInvalidCity, setInvalidCity] = useState(false);
  const [invalidCityMessage, setInvalidCityMessage] = useState('');
  const [number, setNumber] = useState('');
  const [isInvalidNumber, setInvalidNumber] = useState(false);
  const [invalidNumberMessage, setInvalidNumberMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const emailContainerRef = useRef<View>(null);
  const firstNameContainerRef = useRef<View>(null);
  const lastNameContainerRef = useRef<View>(null);
  const buildingNumberContainerRef = useRef<View>(null);
  const placeContainerRef = useRef<View>(null);
  const phoneContainerRef = useRef<View>(null);
  const cityContainerRef = useRef<View>(null);

  useEffect(() => {
    getCartData();
    getPriceDetails();
  }, []);

  useEffect(() => {
    if (cartDetails) {
      console.log('cartDetails:pppppsumerry', cartDetails);
    }
  }, [cartDetails]);

  const isEmailValid = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const next = () => {
    if (!isEmailValid()) {
      setInvalidEmail(true);
      setInvalidEmailMessage('Enter a valid email');
      //Scroll to email view
      if (scrollViewRef.current && emailContainerRef.current) {
        emailContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidEmail(false);
      setInvalidEmailMessage('');
    }

    if (firstName.trim() == '') {
      setInvalidFirstName(true);
      setInvalidFirstNameMessage('Enter a valid first name');
      //Scroll to email view
      if (scrollViewRef.current && firstNameContainerRef.current) {
        firstNameContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidFirstName(false);
      setInvalidFirstNameMessage('');
    }

    if (lastName.trim() == '') {
      setInvalidLastName(true);
      setInvalidLastNameMessage('Enter a valid last name');
      //Scroll to email view
      if (scrollViewRef.current && lastNameContainerRef.current) {
        lastNameContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidLastName(false);
      setInvalidLastNameMessage('');
    }

    if (buildingNumber.trim() == '') {
      setInvalidBuildingNumber(true);
      setInvalidBuildingNumberMessage(
        'Enter a valid building/street/zone number',
      );
      //Scroll to email view
      if (scrollViewRef.current && buildingNumberContainerRef.current) {
        buildingNumberContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidBuildingNumber(false);
      setInvalidBuildingNumberMessage('');
    }

    if (place.trim() == '') {
      setInvalidPlace(true);
      setInvalidPlaceMessage('Enter a valid place/landmark');
      //Scroll to email view
      if (scrollViewRef.current && placeContainerRef.current) {
        placeContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidPlace(false);
      setInvalidPlaceMessage('');
    }

    if (number.trim() == '') {
      setInvalidNumber(true);
      setInvalidNumberMessage('Enter a valid phone number');
      //Scroll to email view
      if (scrollViewRef.current && phoneContainerRef.current) {
        phoneContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidNumber(false);
      setInvalidNumberMessage('');
    }

    if (city.trim() == '') {
      setInvalidCity(true);
      setInvalidCityMessage('Enter a valid city');
      //Scroll to email view
      if (scrollViewRef.current && cityContainerRef.current) {
        cityContainerRef.current.measureInWindow((x, y) => {
          scrollViewRef.current?.scrollTo({y, animated: true});
        });
      }
      return;
    } else {
      setInvalidCity(false);
      setInvalidCityMessage('');
    }

    const dataToPass = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      buildingNumber: buildingNumber,
      place: place,
      city: city,
      number: number,
    };
    navigation.navigate(screens.orderSummeryShipping, dataToPass);
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
      <ScrollView style={{paddingBottom: getHeight(2)}} ref={scrollViewRef}>
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
              source={icons.check_circle_gray}
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
            {` ${t('contact_info')} `}
          </Text>
          <Text
            style={{
              fontSize: getHeight(55),
              color: Colors.placeholderColor,
              marginBottom: 10,
            }}>
            Already have an account ?
            <Text style={{color: Colors.primary}}> Log in</Text>
          </Text>
          <View ref={emailContainerRef}>
            <TextInputBox
              placeHolder="Email"
              value={email}
              onChange={(text: any) => setEmail(text)}
              isInvalid={isInvalidEmail}
              invalidMessage={invalidEmailMessage}
              inputMode={'email'}
              keyboardType={Platform.OS == 'android' ? 'email-address' : ''}
            />
          </View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginTop: 10,
              marginBottom: 10,
            }}>
            {` ${t('delivery_method')} `}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setDeliveryMethoid(DeliveryMethod.SHIP)}
              style={{
                flex: 1,
                margin: 6,
                borderWidth: 0.5,
                borderColor: Colors.primary,
                height: getHeight(15),
                borderRadius: getHeight(60),
                backgroundColor:
                  deliveryMethod == DeliveryMethod.SHIP
                    ? Colors.accent
                    : Colors.white,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: getHeight(40),
                  height: getHeight(40),
                  alignSelf: 'center',
                }}>
                <SvgIcon.ShipIcon
                  width={getHeight(10)}
                  height={getHeight(10)}
                />
              </View>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: getHeight(50),
                  marginTop: 10,
                  marginBottom: 10,
                  color: Colors.primary,
                  alignSelf: 'center',
                  marginLeft: 10,
                }}>
                Ship
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDeliveryMethoid(DeliveryMethod.PICKUP)}
              style={{
                flex: 1,
                margin: 6,
                borderWidth: 0.5,
                borderColor: Colors.primary,
                height: getHeight(15),
                borderRadius: getHeight(60),
                backgroundColor:
                  deliveryMethod == DeliveryMethod.PICKUP
                    ? Colors.accent
                    : Colors.white,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: getHeight(40),
                  height: getHeight(40),
                  alignSelf: 'center',
                }}>
                <SvgIcon.PickupIcon
                  width={getHeight(10)}
                  height={getHeight(10)}
                />
              </View>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: getHeight(50),
                  marginTop: 10,
                  marginBottom: 10,
                  color: Colors.primary,
                  alignSelf: 'center',
                  marginLeft: 10,
                }}>
                Pick Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontWeight: '500',
              fontSize: getHeight(50),
              marginTop: 10,
              marginBottom: 10,
            }}>
            Shopping address
          </Text>
          <View ref={firstNameContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              First Name
            </Text>
            <TextInputBox
              placeHolder="First name"
              value={firstName}
              onChange={text => setFirstName(text)}
              isInvalid={isInvalidFirstName}
              invalidMessage={invalidFirstNameMessage}
            />
          </View>
          <View ref={lastNameContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              Last Name
            </Text>
            <TextInputBox
              placeHolder="Last name"
              value={lastName}
              onChange={text => setLastName(text)}
              isInvalid={isInvalidLastName}
              invalidMessage={invalidLastNameMessage}
            />
          </View>
          <View ref={buildingNumberContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              Address 1
            </Text>
            <TextInputBox
              placeHolder="Building number/ street number/ zone number"
              value={buildingNumber}
              onChange={text => setBuildingNumber(text)}
              isInvalid={isInvalidBuildingNumber}
              invalidMessage={invalidBuildingNumberMessage}
            />
          </View>
          <View ref={placeContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              Address 2
            </Text>
            <TextInputBox
              placeHolder="Place / Nearest landmark"
              value={place}
              onChange={text => setPlace(text)}
              isInvalid={isInvalidPlace}
              invalidMessage={invalidPlaceMessage}
            />
          </View>
          <View ref={cityContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              City
            </Text>
            <TextInputBox
              placeHolder="City"
              value={city}
              onChange={text => setCity(text)}
              isInvalid={isInvalidCity}
              invalidMessage={invalidCityMessage}
            />
          </View>
          <View ref={phoneContainerRef}>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              Phone
            </Text>
            <TextInputBox
              placeHolder="Phone"
              value={number}
              onChange={text => setNumber(text)}
              isInvalid={isInvalidNumber}
              invalidMessage={invalidNumberMessage}
              keyboardType={Platform.OS == 'android' ? 'phone-pad' : ''}
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: getHeight(60),
                left: '2%',
                bottom: '2%',
                color: Colors.black,
              }}>
              Country
            </Text>
            <TextInputBox
              placeHolder="Country"
              value={'Qatar'}
              editable={false}
            />
          </View>
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
          {/* {priceCard('Tax', `${priceDetails?.node?.totalTaxV2?.currencyCode} ${priceDetails?.node?.totalTaxV2?.amount}`)} */}
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
              {`${priceDetails?.node?.totalPriceV2?.currencyCode} ${priceDetails?.node?.totalPriceV2?.amount}`}
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
              Continue to shipping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OrderSummery;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: getHeight(2),
  },
});
