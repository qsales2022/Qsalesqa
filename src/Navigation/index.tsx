import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart, Home, LogoSplash, ProductDetails, ProductList } from "../screens";
import OnBoardingNavigation from "./OnBoarding";
import MainNavigation from "./MainNavigation";
import Test from "../components/TestUI/Test";
import { Linking } from "react-native";
const Navigation = () => {
  // React.useEffect(() => {
  //   const handleDeepLink = ({url}:any) => {
  //     console.log('Received deep link:', url);
  //     // You can add your navigation logic here if needed
  //   };
  //   Linking.addEventListener('url', handleDeepLink);
    
  //   // Check for any initial URL
  //   Linking.getInitialURL().then(url => {
  //     console.log('no url');
      
  //     if (url) {
  //       console.log('Initial URL:', url);
  //       // Handle initial deep link if needed
  //     }
  //   });

  //   return () => {
  //     // Linking.removeAllListeners('url', handleDeepLink);
  //   };
  // }, []);
  const Stack = createNativeStackNavigator();
  const linking = {
    prefixes: ['https://qsales-online-shopping.vercel.app',"qsales://"],
    config: {
      screens: {
        Cheking: "Cheking/:id",
        SPLASH: "SPLASH",
        ON_BOARDING: "ON_BOARDING",
        MAIN: {
          path: "MAIN",
          screens: {
            HOME_TABS: {
              path: "HOME_TABS",
              screens: {
                HOME: "HOME",

              },
            },
            PRODUCT_DETAILS: "PRODUCT_DETAILS/:handle",
            PRODUCT_LIST:"PRODUCT_LIST/:title/:category"
          },
        },
      },
      // SPLASH:"SPLASH",
      // SPLASH:"SPLASH"
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          animation: "flip",
          headerShown: false,
        }}
      >
        <Stack.Screen name="SPLASH" component={LogoSplash} />
        <Stack.Screen name="ON_BOARDING" component={OnBoardingNavigation} />
        <Stack.Screen name="MAIN" component={MainNavigation} />

        <Stack.Screen name="Cheking" component={Test} />
        <Stack.Screen name="CART" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
