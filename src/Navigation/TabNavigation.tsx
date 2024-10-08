import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StatusBar, ToastAndroid } from "react-native";
import { Account, Cart, Explore, Home } from "../screens";
import CustomTab from "./CustomTab";
import CommonStyles from "../Theme/CommonStyles";
import { HomeHeader } from "../components";
import Colors from "../Theme/Colors";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCreateCart, useGetCart } from "../Api/hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { updateCount } from "../redux/reducers/CartReducer";

const HomeTabs = () => {
  const isFocused = useIsFocused();
  const Tab = createBottomTabNavigator();
  const { cartDetails, getCartData }: any = useGetCart();
  const { cart, createCart }: any = useCreateCart();
  //const [count, setCount] = useState<any>(0);
  const { count } = useSelector((state: RootState) => state.CartReducer);
  const customTabMenu = (props: any) => {
    return <CustomTab cartCount={count} />;
  };
  const setHomeHeader = (props: any) => {
    return <HomeHeader {...props} />;
  };

  useEffect(() => {
    if (isFocused) {
      getCheckoutId();
    }
  }, [isFocused]);

  const storeCheckoutId = async (value: any) => {
    try {
      await AsyncStorage.setItem("checkoutId", value);
    } catch (e) {
      // saving error
    }
  };

  const getCheckoutId = async () => {
    try {
      const value = await AsyncStorage.getItem("checkoutId");
      if (value !== null) {
        getCartData();
      } else {
        //create cart if no checkoutId present
        createCart();
      }
    } catch (e) {
      // error reading value
    }
  };

  // get cartId (checkoutId) after creating cart and store to local storage
  useEffect(() => {
    if (cart) {
      storeCheckoutId(cart?.checkoutCreate?.checkout?.id);
    }
  }, [cart]);

  return (
    <>
      {/* <SafeAreaView style={CommonStyles.containerFlex1}> */}
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.backgroundGray}
      />
      <Tab.Navigator
        // screenOptions={{headerShown: false}}
        screenOptions={{ header: () => null }}
        tabBar={customTabMenu}
      >
        <Tab.Screen
          options={{ header: (props) => setHomeHeader(props) }}
          name="HOME"
          component={Home}
        />

        <Tab.Screen name="EXPLORE" component={Explore} />
        {/* <Tab.Screen name="Message" component={Explore} /> */}
        <Tab.Screen name="CART" component={Cart} />
        <Tab.Screen name="ACCOUNT" component={Account} /> 
      </Tab.Navigator>
      {/* </SafeAreaView> */}
    </>
  );
};
export default HomeTabs;
