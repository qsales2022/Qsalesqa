/* eslint-disable react-hooks/exhaustive-deps */
import {
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import images from '../../../assets/Images';
import {getHeight, getWidth} from '../../../Theme/Constants';
import Colors from '../../../Theme/Colors';
import CategoryList from './CategoryList/CategoryList';
import {BannerStrip, OfferView, SectionView} from '../../../components';
import strings from '../../../assets/i18n/strings';
import {
  useGetProducts,
  useGetCollections,
  useGetHomeBannerList,
  useGetHomeSectionsFirst,
  useGetHomeSectionsTwo,
} from '../../../Api/hooks';
import screens from '../../../Navigation/screens';
import Swiper from 'react-native-swiper';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import {
  toggleLoader,
  updateSelectedTab,
} from '../../../redux/reducers/GlobalReducer';
import useToken from '../../../Api/hooks/useToken';
import {View} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {t} from 'i18next';
import i18n from 'i18next';
import {requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import useGetHomeSectionsThree from '../../../Api/hooks/useGetHomeSectionThree';
import SkeletonCard from '../../../components/skeletonCard/SkeletonCard';
import useGetCategoryProducts from '../../../Api/hooks/useGetCategoryProducts';
import useGetHomeSection from '../../../Api/hooks/useGetHomeSection';
import {homePush} from '../../../helpers/HomePush';
import Translation from '../../../assets/i18n/Translation';
import {RootState} from '../../../redux/store';
import axios from 'axios';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const mountingCategory = [
  {
    category: 'new-arrivals',
    title: strings.newArrivals,
    item: [],
    id: 0,
  },
  {
    category: 'camping-goods-supplies',
    title: strings.campinggoods,
    item: [],
    id: 1,
    metaView: [],
    metaId: '15876423969',
  },
  {category: 'add-more-save-more', title: 'comboDeals', item: [], id: 2},
  {
    category: 'qr-1-qr-29-deals',
    title: 'under30',
    item: [],
    id: 3,
    metaView: [],
    metaId: '15876522273',
  },
  {
    category: 'kitchen-improvement',
    title: strings.kitchenImprovement,
    item: [],

    id: 4,
  },
  {
    category: 'home-organization',
    title: strings.Homeorganization,
    item: [],
    id: 5,
    metaView: [],
    metaId: '44402147617',
  },
  {category: 'home-care', title: 'Home Care', item: [], id: 6},
  {
    category: 'home-cleaning',
    title: strings.HomeCleaning,
    item: [],
    id: 7,
    metaView: [],
    metaId: '44902088993',
  },
  {category: 'racks-storage', title: strings.RacksStorage, item: [], id: 8},
  {
    category: 'cooking-appliances',
    title: strings.CookingAppliances,
    item: [],
    metaView: [],
    metaId: '44902220065',
    id: 9,
  },
  {category: 'bags-pouches', title: strings.Bags, item: [], id: 10},
  {
    category: 'bathroom-laundry-supplies',
    title: strings.BathCare,
    item: [],
    id: 11,
    metaView: [],
    metaId: '44902252833',
  },
  {
    category: 'fitness-personal-care',
    title: strings.BeautyFitness,
    item: [],
    id: 12,
  },
  {
    category: 'car-accessories',
    title: strings.CarAccessories,
    item: [],
    id: 13,
  },
];
const collectionHandle1 = [
  'new-arrivals',
  'qsales-choice',
  'qr-1-qr-29-deals',
  'add-more-save-more',
  'travel-bags-organization',
  'camping-outdoor',
  'wardrobe-organization',
  'electronics-smart-home',
];
const collectionHandle2 = [
  'kitchen-organization',
  'bathroom-laundry-supplies',
  'home-care',
  'home-decor',
  'racks-storage',
  'baby-care',
  'car-accessories',
  'tech-gadgets',
];
const Home = ({navigation}: any) => {
  // const { collections } = useGetCollections(14,collectionHandle);
  const {collections} = useGetCollections(100);
  // const { products } = useGetProducts("best-sellers", 5);
  const {bannerImagesEN, bannerImagesAR}: any = useGetHomeBannerList();
  const newArrivals = useGetProducts('new-arrivals', 12, '');
  const newArrivalsProducts = newArrivals.products;
  const {getProducts} = useGetCategoryProducts();
  const [categories, setCategories] = useState(mountingCategory);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryList1, setCategoryList1] = useState([]);
  const [bestList, setBestList] = useState<any>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [swiperData, setSwiperData] = useState<any>('en');
  const getSectionData = useGetHomeSection();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  // const [currentVersion, setCurrentVersion] = useState("");
  const [testVersion, setTestVersion] = useState('2.0.1'); // A very low version number for testing
  // const [updateStatus, setUpdateStatus] = useState("");
  // const [appInfo, setAppInfo] = useState({});

  const {language} = useSelector((state: RootState) => state.AuthReducer);
  useEffect(() => {
    if (isFocused) {
      requestNotificationPermission();
      subscribeToMyTopic();
      dispatch(updateSelectedTab(0));
    }
  }, [isFocused]);

  useEffect(() => {
    checkForUpdates();
  }, []);
  const checkForUpdates = async (useTestVersion = false) => {
    const inAppUpdates = new SpInAppUpdates(false);

    try {
      // setUpdateStatus("Checking for updates...");

      const currentVersion = useTestVersion
        ? testVersion
        : DeviceInfo.getVersion();

      // Log the parameters being sent to checkNeedsUpdate

      const result = await inAppUpdates.checkNeedsUpdate({
        curVersion: currentVersion,
      });
      if (result.shouldUpdate) {
        let updateOptions = {};
        if (Platform.OS === 'android') {
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }

        await inAppUpdates.startUpdate(updateOptions);
      } else {
        console.log('No update needed.');
      }
    } catch (error) {
      console.error('Error during update check:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationNavigation(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // Handle notification when the app is launched from a cold state

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage);
        }
      });
  }, []);

  const handleNotificationNavigation = (remoteMessage: any) => {
    const {data} = remoteMessage;
    if (data && data.action_to === 'PRODUCT') {
      navigation.navigate(screens.productDetails, {
        handle: data.action_handle,
      });
    } else if (data && data.action_to === 'COLLECTION') {
      navigation.navigate(screens.productList, {
        title: data.action_handle.toString().replace('-', ' '),
        category: data.action_handle,
      });
    }
  };

  const subscribeToMyTopic = () => {
    messaging()
      .subscribeToTopic('promotions')
      .then(() => console.log('Subscribed to topic!'))
      .catch(error => console.error('Error subscribing to promotions:', error));
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.check(
          'android.permission.POST_NOTIFICATIONS',
        );
        if (!granted) {
          await PermissionsAndroid.request(
            'android.permission.POST_NOTIFICATIONS',
            {
              title: t('notification'),
              message: `${t('notifMessage1')} ${t('notifMessage2')}`,
              buttonNeutral: `${t('askMeLater')} `,
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        }
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    } else if (Platform.OS === 'ios') {
      const {status} = await requestNotifications(['alert', 'sound']);
    }
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    setSwiperData(currentLanguage);
  }, []);
  //Language change listner
  useEffect(() => {
    const handleLanguageChange = (newLang: any) => {
      setSwiperData(newLang);
      navigation.navigate(screens.splash);
    };
    setTimeout(() => {
      dispatch(toggleLoader(false));
    }, 5000);
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const processCollections = useCallback(
    (collectionHandle: any) => {
      if (collections) {
        const catFiltter = collections?.filter((val: any, index: number) => {
          return collectionHandle.includes(val.node.handle);
        });

        const sortedArray = catFiltter.sort((a: any, b: any) => {
          return (
            collectionHandle.indexOf(a?.node?.handle) -
            collectionHandle.indexOf(b?.node?.handle)
          );
        });

        return sortedArray;
      }
      return [];
    },
    [collections],
  );

  const updateNewList = useCallback(() => {
    if (newArrivalsProducts.length && categories.length) {
      setCategories((prev): any => {
        if (prev.length && prev[categoryIndex]?.item.length <= 0) {
          prev[categoryIndex].item = newArrivalsProducts;
          setCategoryIndex(prev => prev + 1);
        }
        return prev;
      });
      setLoading(false);
      setCategoriesLoading(false);
    }
  }, [newArrivalsProducts]);
  useEffect(() => {
    updateNewList();
  }, [newArrivalsProducts]);

  useEffect(() => {
    const catFiltter = processCollections(collectionHandle1);
    const catFiltter2 = processCollections(collectionHandle2);
    setCategoryList(catFiltter);
    setCategoryList1(catFiltter2);
  }, [processCollections]);

  const getItem = async () => {
    setCategoriesLoading(true);

    const products = await getProducts(
      mountingCategory[categoryIndex]?.category,
      12,
    );
    // console.log(products,'this is profucts oen');

    let updatedCategories: any = [...categories];
    const findCategoryIndex = updatedCategories.findIndex(
      (category: any) =>
        category?.category === mountingCategory[categoryIndex]?.category,
    );
    if (findCategoryIndex !== -1) {
      try {
        await homePush(updatedCategories, findCategoryIndex, products);
      } catch (error: any) {
        console.log(error.message, 'home push errr');
      }
      //  updatedCategories[findCategoryIndex].item.push(...products);
      if (updatedCategories[findCategoryIndex]?.metaId) {
        try {
          const sectionList = await getSectionData(
            updatedCategories[findCategoryIndex].metaId,
          );
          updatedCategories[findCategoryIndex].metaView = sectionList;
        } catch (error: any) {
          // console.log(error.message, "this is error");
        }
      }

      setCategories(updatedCategories);

      setCategoryIndex(prev => prev + 1);

      setCategoriesLoading(false);
    }
  };
  // console.log(categories, "this is section");
  const loadMoreCategory = useCallback(() => {
    if (!categoriesLoading) getItem();
  }, [categoriesLoading]);
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  const renderItem = ({item, index}: any) => {
    return (
      <View key={item.id.toString()}>
        <SectionView
          viewAllPress={() =>
            navigation.navigate(screens.productList, {
              title: item.title,
              category: item.category,
            })
          }
          items={[...item.item]}
          title={item.title}
          page={'home'}
        />
        {item?.metaView && item?.metaView.length > 0 && (
          <OfferView data={item?.metaView} />
        )}
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={{
        minHeight: getHeight(1.5),
        backgroundColor: Colors.white,
      }}>
      {(bannerImagesEN || bannerImagesAR) && (
        <View>
          <Swiper
            key={
              swiperData == 'en' ? bannerImagesEN.length : bannerImagesAR.length
            }
            autoplay
            autoplayTimeout={6}
            style={styles.swiperContainer}
            dotColor={Colors.white}
            activeDotColor={Colors.black}
            //  height={getHeight(2)}
          >
            {(swiperData == 'en' ? bannerImagesEN : bannerImagesAR).map(
              (item: any, index: number) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (item.type == 'collection') {
                        if (item.target_handle == 'all') {
                          navigation.navigate(screens.explore);
                        } else {
                          navigation.navigate(screens.productList, {
                            title: item?.target_handle.replace('-', ' '),
                            category: item?.target_handle,
                          });
                        }
                      }
                      if (item.type == 'product') {
                        navigation.navigate(screens.productDetails, {
                          handle: item?.target_handle,
                        });
                      }
                    }}>
                    <Image
                      key={item}
                      resizeMode="stretch"
                      style={styles.swiperContainer}
                      source={{uri: item?.image_url}}
                    />
                  </TouchableWithoutFeedback>
                );
              },
            )}
          </Swiper>
        </View>
      )}

      <FastImage
        source={
          language === 'en'
            ? require('../../../assets/Images/carDelivery.gif')
            : require('../../../assets/Images/carDeliveryAr.gif')
        }
        style={{
          width: getWidth(1),
          height: 20,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <FastImage
        source={require('../../../assets/Images/bannerTenPerc.gif')}
        style={{
          width: getWidth(1),
          height: 20,
          alignSelf: 'flex-start',
          justifyContent: 'flex-start',
          // marginTop:3
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            // paddingHorizontal: getWidth(70),
            // backgroundColor: "red",
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: getWidth(3),
              display: 'flex',
              alignItems: 'flex-end',
              alignSelf: 'flex-start',
            }}>
            <Text
              style={[
                styles.title,
                language === 'en'
                  ? {marginRight: getWidth(16)}
                  : {marginRight: getWidth(5)},
              ]}>
              <Translation textKey={strings.categories} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewAll}
            onPress={() => {
              navigation.navigate(screens.explore);
            }}>
            <Text style={styles.viewTxt}>
              <Translation textKey={'viewAll'} />
            </Text>
            <Text style={styles.viewTxt}>{' >>'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryList data={categoryList} data1={categoryList1} />
          {/* <CategoryList data={categoryList} /> */}
        </ScrollView>
        <BannerStrip />
      </View>

      {/* Category name */}
      {/* FlatList for each category */}
      {!loading ? (
        <>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreCategory}
            onEndReachedThreshold={0.5}
          />
        </>
      ) : (
        <SkeletonCard
          data={[12, 34]}
          chaildVieWidth={2}
          childViewHeight={3}
          containerMarginTop={10}
          ContainerHeight={3}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  swiperContainer: {
    // width: '100%',
    height: getHeight(5),
    backgroundColor: Colors.placeholderColor,
  },
  swiperImage: {
    height: '100%',
    width: '100%',
  },
  dotContainer: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: getHeight(4.5),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dotStyle: {
    height: getHeight(95),
    width: getHeight(95),
    borderRadius: 100,
    marginRight: 20,
  },
  wrapper: {},
  slide1: {
    height: getHeight(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    minHeight: getHeight(8),
  },
  title: {
    fontWeight: '600',
    fontSize: getHeight(45),
    marginTop: getHeight(70),
    // width: "90%",
    // alignSelf: "flex-end",
    marginBottom: getHeight(55),
    color: Colors.black,
  },
  viewAll: {
    width: getWidth(3),
    // backgroundColor:"green",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: getWidth(10),
  },
  viewTxt: {
    color: Colors.primary,
    fontSize: getHeight(55),
    fontWeight: '500',
  },
});
export default Home;
