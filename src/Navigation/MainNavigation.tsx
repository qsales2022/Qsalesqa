import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  OrderSummery,
  ProductDetails,
  ProductList,
  Search,
  SuccessScreen,
} from '../screens';
import CommonStyles from '../Theme/CommonStyles';
import Colors from '../Theme/Colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './TabNavigation';
import OrderSummeryShipping from '../screens/Main/OrderSummery/OrderSummeryShipping';
import PaymentWebView from '../screens/Main/OrderSummery/PaymentWebView';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import SearchModal from '../screens/Main/Home/Search';
import MyOrderList from '../screens/Main/MyOrder/MyOrderList';
import WebViewScreen from '../screens/Main/WebView/WebViewScreen';
import HelpCenter from '../screens/Main/HelpCenter/HelpCenter';
import {toggleLoader} from '../redux/reducers/GlobalReducer';
import Notifications from '../screens/Main/Home/Notifications';
import {Header} from '../components';
import Test from '../components/TestUI/Test';
const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.globalReducer);

  return (
    <>
      <SafeAreaView
        style={[CommonStyles.containerFlex1, {backgroundColor: Colors.white}]}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={Colors.successGreen}
        />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
            headerBlurEffect: 'light',
          }}>
          <Stack.Screen name="HOME_TABS" component={HomeTabs} />
          <Stack.Screen name="SEARCH" component={Search} />
          <Stack.Screen name="NOTIFICATION" component={Notifications} />
          <Stack.Screen name="PRODUCT_LIST" component={ProductList} />
          <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetails} />
          <Stack.Screen name="ORDER_SUMMERY" component={OrderSummery} />
          <Stack.Screen name="MY_ORDER_LIST" component={MyOrderList} />

          <Stack.Screen
            name="ORDER_SUMMERY_SHIPPING"
            component={OrderSummeryShipping}
          />

          <Stack.Screen name="PAYMENT" component={PaymentWebView} />
          <Stack.Screen name="WEB_VIEW" component={WebViewScreen} />
          <Stack.Screen name="SUCCESS_SCREEN" component={SuccessScreen} />
          <Stack.Screen name="HELP_CENTER" component={HelpCenter} />

        </Stack.Navigator>
        <Modal
          animationType="fade"
          transparent={true}
          // visible={isLoading}
          visible={false}
          onRequestClose={() => {
            dispatch(toggleLoader(false));
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color={Colors.primary} />
              {/* <Text style={{color:'black'}}>{isLoading== true ? 'dd': 'ssr'}</Text> */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
});

export default MainNavigation;
