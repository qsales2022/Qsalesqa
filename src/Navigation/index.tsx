import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Cart, Home, LogoSplash, ProductDetails, ProductList} from '../screens';
import OnBoardingNavigation from './OnBoarding';
import MainNavigation from './MainNavigation';

import Test from '../components/TestUI/Test';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {getFirstUserLaunch} from '../AsyncStorage/StorageUtil';
import {updateLaunch} from '../redux/reducers/GlobalReducer';
import Loading from './loading/Loading';

const Navigation = () => {
  const {launch} = useSelector((state: RootState) => state.globalReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const Stack = createNativeStackNavigator();
  const linking = {
    prefixes: ['https://qsales-online-shopping.vercel.app', 'qsales://'],
    config: {
      screens: {
        Cheking: 'Cheking/:id',
        SPLASH: 'SPLASH',
        ON_BOARDING: 'ON_BOARDING',
        MAIN: {
          path: 'MAIN',
          screens: {
            HOME_TABS: {
              path: 'HOME_TABS',
              screens: {
                HOME: 'HOME',
              },
            },
            PRODUCT_DETAILS: 'PRODUCT_DETAILS/:handle',
            PRODUCT_LIST: 'PRODUCT_LIST/:title/:category',
          },
        },
      },
      // SPLASH:"SPLASH",
      // SPLASH:"SPLASH"
    },
  };
  React.useEffect(() => {
    const checkLaunchStatus = async () => {
      const launchStatus = await getFirstUserLaunch('launchStatus');
      if (launchStatus === 'true') {
        dispatch(updateLaunch(true));
      }
      setLoading(false);
    };

    checkLaunchStatus();
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName={launch ? 'MAIN' : 'SPLASH'}
        screenOptions={{
          animation: 'flip',
          headerShown: false,
        }}>
        <Stack.Screen name="SPLASH" component={LogoSplash} />

        <Stack.Screen name="MAIN" component={MainNavigation} />

        <Stack.Screen name="ON_BOARDING" component={OnBoardingNavigation} />
        <Stack.Screen name="Cheking" component={Test} />
        <Stack.Screen name="CART" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
