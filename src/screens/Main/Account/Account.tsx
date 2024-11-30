import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Alert,
  Image,
  Linking,
} from 'react-native';
import Colors from '../../../Theme/Colors';
import CommonStyles from '../../../Theme/CommonStyles';
import {getHeight, getWidth} from '../../../Theme/Constants';
import SvgIcon from '../../../assets/SvgIcon';
import BottomSheetLogin from '../../../components/BottomSheet/BottomSheetLogin';
import BottomSheetSignup from '../../../components/BottomSheet/BottomSheetSignup';
import {getLogin, setLogin} from '../../../AsyncStorage/StorageUtil';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import screens from '../../../Navigation/screens';
import {useGetLogIn} from '../../../Api/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LanguageModel} from '../../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import RefundPolicy from '../../../assets/HtmlContent/RefundPolicy';
import ShippingPolicy from '../../../assets/HtmlContent/ShippingPolicy';
import PrivacyPolicy from '../../../assets/HtmlContent/PrivacyPolicy';
import TermsOfUse from '../../../assets/HtmlContent/TermsOfUse';
import AboutUs from '../../../assets/HtmlContent/AboutUs';
import {t} from 'i18next';
import BottomSheetForgotPassword from '../../../components/BottomSheet/BottomSheetForgotPassword';

const Account = ({navigation}: any) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const {data, user}: any = useGetLogIn();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(null);
  useEffect(() => {
    getLogin().then(value => {
      console.log('TOKEN123', value);
      setToken(value);
    });
  }, [isFocused]);

  useEffect(() => {
    if (token) {
      user(token);
    }
  }, [token]);

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('login');

  //       console.log(value, 'fcm token getting code here');
  //       if (value !== null) {
  //         const parsedData = JSON.parse(value);
  //         if (parsedData && parsedData.accessToken) {
  //           console.log(parsedData.accessToken,'fcm token getting code')
  //           return parsedData.accessToken;
  //         }
  //       }
  //       return null; // Return null if no valid token found
  //     } catch (error) {
  //       console.error('Error getting data:', error);
  //       return null;
  //     }
  //   };

  //   getToken();
  // }, []);

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
            }}>
            {t('account')}
          </Text>
        </View>
        {token && data && (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#F6F6F6',
              paddingTop: 16,
              paddingBottom: 16,
              paddingLeft: 6,
              paddingRight: 6,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#DEA7BA',
                marginRight: 16,
                justifyContent: 'center',
              }}>
              <View style={{alignSelf: 'center'}}>
                <SvgIcon.PersonIcon />
              </View>
            </View>
            <View style={{}}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 18}}>
                {data.customer?.firstName} {data.customer?.lastName}
              </Text>
              <Text style={{color: 'grey', fontWeight: '400', fontSize: 14}}>
                {data.customer?.email}
              </Text>
              {data.customer?.phone && (
                <Text style={{color: 'grey', fontWeight: '400', fontSize: 14}}>
                  {data.customer?.phone}
                </Text>
              )}
            </View>
          </View>
        )}
        {!token && (
          <View style={{marginTop: 16, marginBottom: 24}}>
            <SvgIcon.QsalesIcon width={getWidth(12)} height={getWidth(12)} />
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 18,
                marginBottom: 6,
              }}>
              {t('exploreBestShopping')}
            </Text>
            <Text style={{color: 'black', marginBottom: 16}}>
              {t('loginToAccount')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setLoginModalVisible(true)}
                style={{
                  backgroundColor: Colors.primary,
                  width: 100,
                  justifyContent: 'center',
                  height: 40,
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: '500',
                  }}>
                  {t('login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSignupModalVisible(true)}
                style={{
                  borderColor: Colors.primary,
                  borderWidth: 0.5,
                  width: 100,
                  justifyContent: 'center',
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 6,
                }}>
                <Text
                  style={{
                    color: Colors.primary,
                    alignSelf: 'center',
                    fontWeight: '500',
                  }}>
                  {t('signup')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView style={{marginTop: 24}}>
          <View>
            {token && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.myOrder);
                }}
                style={{flexDirection: 'row', marginTop: 16}}>
                <SvgIcon.OrderIcon width={getWidth(11)} height={getWidth(11)} />
                <View style={{marginLeft: 10, flex: 1}}>
                  <Text
                    style={{fontWeight: '600', color: 'black', fontSize: 16}}>
                    {t('orders')}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{color: 'grey'}}>
                    {t('orderSub')}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {/* {token && (
              <TouchableOpacity style={{ flexDirection: "row", marginTop: 24 }}>
                <SvgIcon.CoupenIcon
                  width={getWidth(11)}
                  height={getWidth(11)}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text
                    style={{ fontWeight: "600", color: "black", fontSize: 16 }}
                  >
                    Coupons
                  </Text>
                  <Text numberOfLines={1} ellipsizeMode={"tail"}>
                    Check exiting coupons for you
                  </Text>
                </View>
              </TouchableOpacity>
            )} */}

            <TouchableOpacity
              onPress={() => setLanguageVisible(true)}
              style={{flexDirection: 'row', marginTop: 24}}>
              <SvgIcon.SelectLanguageIcon
                width={getWidth(11)}
                height={getWidth(11)}
              />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: '600', color: 'black', fontSize: 16}}>
                  {t('language')}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{color: 'grey'}}>
                  {t('languageSub')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(screens.helpCenter)}
              style={{flexDirection: 'row', marginTop: 24}}>
              <SvgIcon.HelpCenterIcon
                width={getWidth(11)}
                height={getWidth(11)}
              />
              <View style={{marginLeft: 10, flex: 1}}>
                <Text style={{fontWeight: '600', color: 'black', fontSize: 16}}>
                  {t('helpCenter')}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{color: 'grey'}}>
                  {t('helpCenterSub')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.webView, {
                  html_: AboutUs(),
                  title: `${t('aboutUs')}`,
                })
              }
              style={{marginTop: 24}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                {t('aboutUs')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.webView, {
                  html_: TermsOfUse(),
                  title: 'Terms of service',
                })
              }
              style={{marginTop: 24}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                {t('termsService')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.webView, {
                  html_: PrivacyPolicy(),
                  title: `${t('privacyPolicy')}`,
                })
              }
              style={{marginTop: 24}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                {t('privacyPolicy')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.webView, {
                  html_: ShippingPolicy(),
                  title: `${t('shippingPolicy')}`,
                })
              }
              style={{marginTop: 24}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                {t('shippingPolicy')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screens.webView, {
                  html_: RefundPolicy(),
                  title: `${t('refundPolicy')}`,
                })
              }
              style={{marginTop: 24}}>
              <Text
                style={{
                  fontWeight: '500',
                  color: 'grey',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                {t('refundPolicy')}
              </Text>
            </TouchableOpacity>
            {token && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    `${t('deleteAccount')}`,
                    `${t('deleteAccountTitle')}`,
                    [
                      {
                        text: `${t('cancel')}`,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: `${t('yes')}`,
                        onPress: () => {
                          Linking.openURL(
                            'https://qsales.qa/pages/delete-my-qsales-account',
                          ).catch(err =>
                            console.error('Error opening URL: ', err),
                          );
                        },
                      },
                    ],
                  );
                }}
                style={{marginTop: 24}}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: 'grey',
                    fontSize: 16,
                    marginLeft: 10,
                    textDecorationLine: 'underline',
                  }}>
                  {t('deleteAccount')}
                </Text>
              </TouchableOpacity>
            )}
            {token && (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(`${t('logout')}`, `${t('logoutSub')}`, [
                    {
                      text: `${t('cancel')}`,
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: `${t('yes')}`,
                      onPress: () => {
                        AsyncStorage.clear().then(value => {
                          navigation.replace(screens.main);
                        });
                      },
                    },
                  ]);
                }}
                style={{marginTop: 24, marginBottom: 24}}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: Colors.primary,
                    fontSize: 16,
                    marginLeft: 10,
                    textDecorationLine: 'underline',
                  }}>
                  {t('logout')}
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                marginTop: 16,
                justifyContent: 'center',
                marginBottom: 16,
              }}>
              <Image
                source={require('../../../assets/Images/badgeSuccess.png')}
                style={{
                  height: getWidth(3) / 5,
                  width: getWidth(3.5),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: 'grey',
                  alignSelf: 'center',
                  marginTop: 6,
                  fontSize: 9,
                }}>
                Made with ❤️ in Qatar
              </Text>
              <Image
                source={require('../../../assets/Images/footerPayment.webp')}
                style={{
                  height: getWidth(3) / 6,
                  width: getWidth(1.4),
                  alignSelf: 'center',
                  marginTop: 6,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomSheetLogin
        isVisible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
        onForgotPassword={async () => {
          await setLoginModalVisible(false);
          setForgotModalVisible(true);
        }}
        onSignup={async () => {
          await setLoginModalVisible(false);
          setSignupModalVisible(true);
        }}
        onApply={data => {
          console.log('applyData', JSON.stringify(data));
          if (data.customerAccessTokenCreate) {
            console.log('applyData enter', JSON.stringify(data));
            if (
              data.customerAccessTokenCreate.customerUserErrors &&
              data.customerAccessTokenCreate.customerUserErrors.length > 0
            ) {
              Alert.alert(
                '',
                data.customerAccessTokenCreate.customerUserErrors[0]?.message,
                [
                  {
                    text: `${t('cancel')}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: `${t('ok')}`,
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
              );
            } else {
              if (data.customerAccessTokenCreate.customerAccessToken) {
                setLogin(
                  data.customerAccessTokenCreate.customerAccessToken
                    ?.accessToken,
                )
                  .then(async value => {
                    await setLoginModalVisible(false);
                    navigation.replace(screens.main);
                    console.log(
                      'applyData enter233 entered',
                      JSON.stringify(
                        data?.customerAccessTokenCreate?.customerAccessToken
                          ?.accessToken,
                      ),
                    );
                    // data?.customerAccessTokenCreate?.customerAccessToken?.accessToken
                  })
                  .catch(error => {
                    console.log(JSON.stringify(error));

                    Alert.alert('', `${t('loginFailed')}`, [
                      {
                        text: `${t('cancel')}`,
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: `${t('ok')}`,
                        onPress: () => console.log('OK Pressed'),
                      },
                    ]);
                  });
              }
            }
          } else {
            Alert.alert('', `${t('signupFailed')}`, [
              {
                text: `${t('cancel')}`,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: `${t('ok')}`, onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}
      />
      <BottomSheetForgotPassword
        isVisible={forgotModalVisible}
        onClose={() => setForgotModalVisible(false)}
        onApply={data => {
          console.log('customerRecover', JSON.stringify(data));

          if (data.customerRecover) {
            if (data?.customerRecover?.customerUserErrors.length > 0) {
              Alert.alert(
                '',
                data?.customerRecover?.customerUserErrors[0]?.message,
                [
                  {
                    text: `${t('cancel')}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: `${t('ok')}`,
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
              );
            } else {
              Alert.alert('', `${t('recoverMessage')}`, [
                {
                  text: `${t('cancel')}`,
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: `${t('ok')}`,
                  onPress: () => console.log('OK Pressed'),
                },
              ]);
            }
          } else {
            Alert.alert('', `${t('recoverFailed')}`, [
              {
                text: `${t('cancel')}`,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: `${t('ok')}`, onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}
      />
      <BottomSheetSignup
        isVisible={signupModalVisible}
        onClose={() => setSignupModalVisible(false)}
        onLogin={async () => {
          await setSignupModalVisible(false);
          setLoginModalVisible(true);
        }}
        onApply={data => {
          if (data.customerCreate) {
            if (
              data.customerCreate.customerUserErrors &&
              data.customerCreate.customerUserErrors.length > 0
            ) {
              Alert.alert(
                '',
                data.customerCreate.customerUserErrors[0]?.message,
                [
                  {
                    text: `${t('cancel')}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: `${t('ok')}`,
                    onPress: () => console.log('OK Pressed'),
                  },
                ],
              );
            } else {
              if (data.customerCreate.customer) {
                // Alert.alert("", `${t("pleaseLogin")}`, [
                //   {
                //     text: `${t("cancel")}`,
                //     onPress: () => console.log("Cancel Pressed"),
                //     style: "cancel",
                //   },
                //   {
                //     text: `${t("ok")}`,
                //     onPress: () => console.log("OK Pressed"),
                //   },
                // ]);
                setSignupModalVisible(false);
                setLoginModalVisible(true);
              }
            }
          } else {
            Alert.alert('', `${t('signupFailed')}`, [
              {
                text: `${t('cancel')}`,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: `${t('ok')}`, onPress: () => console.log('OK Pressed')},
            ]);
          }
        }}
      />
      <LanguageModel
        onClose={() => {
          setLanguageVisible(false);
          navigation.navigate(screens.splash);
        }}
        visible={languageVisible}
      />
    </View>
  );
};

export default Account;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});
