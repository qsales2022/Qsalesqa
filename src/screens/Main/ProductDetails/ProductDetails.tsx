import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  FlatList,
  useWindowDimensions,
  Modal,
  Linking,
  Platform,
  Share,
  Alert,
} from 'react-native';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Header, SectionItem, SectionView} from '../../../components';
import Colors from '../../../Theme/Colors';
import {
  useGetProductDetails,
  useGetProductImages,
  useCreateCart,
  useAddToCart,
  useGetCart,
  useNotifiyMe,
  useFetchFrequenltyBroughtItem,
  useDealBlock,
  useGetProducts,
  useGetRelatedProducts,
  useGetProductVideo,
} from '../../../Api/hooks';
import {getHeight, getWidth} from '../../../Theme/Constants';
import PagerView from 'react-native-pager-view';
import CommonStyles from '../../../Theme/CommonStyles';
import images from '../../../assets/Images';
import QuantityModal from './QuantityModal';
import screens from '../../../Navigation/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import RenderHtml from 'react-native-render-html';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import NotifyMeModal from './NotifyMeModal';
import {useTranslation} from 'react-i18next';
import {formatPrice} from '../../../Utils';
import SvgIcon from '../../../assets/SvgIcon';
import icons from '../../../assets/icons';
import RNPickerSelect from 'react-native-picker-select';
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from 'react-native-webview';
import productHasVariantSize from '../../../helpers/productHasVariantSize';
import filterUniqueColors from '../../../helpers/filterUniqueColors';
import filterUniqueSize from '../../../helpers/filterUniqueSize';
import YoutubePlayer from 'react-native-youtube-iframe';
import getYouTubeVideoId from '../../../helpers/getYoutubeId';
import DeatailsSkeleton from './DeatailsSkeleton';
import BottomSheet from './BottomSheet';
import {VELOCITY_EPS} from 'react-native-reanimated/lib/typescript/reanimated2/animation/decay/utils';
import AnimatedLottieView from 'lottie-react-native';
import Animations from '../../../assets/Animations';
import Translation from '../../../assets/i18n/Translation';
import {Dropdown} from 'react-native-element-dropdown';
import strings from '../../../assets/i18n/strings';
import {AppEventsLogger} from 'react-native-fbsdk-next';
import {ImageZoom} from '@likashefqet/react-native-image-zoom';

const ProductDetails = ({route, navigation}: any) => {
  const tabRef = useRef<any>();
  const {
    handle = '',
    selectedVariantId = null,
    pageNavigation = '',
  } = route?.params ? route?.params : {};

  const {productImages}: any = useGetProductImages(handle);
  const {productDetails, loading}: any = useGetProductDetails(handle);
  const {productVideo}: any = useGetProductVideo(productDetails?.id);
  const {frequentlyBroughtItem, getFrequentlyBroughtItem}: any =
    useFetchFrequenltyBroughtItem();
  const {response, notify}: any = useNotifiyMe();
  const {dealLoading, deals, getDeals, setDeals}: any = useDealBlock();
  const {addCartData, addToCart, addToCartFrequentlyBought}: any =
    useAddToCart();
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const [quantityModal, setModalOpen] = useState(false);
  const [quantityAddOnModal, setAddOnModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [quantityAddOn, setQuantityAddOn] = useState(1);
  const [variantList, setVariantList] = useState<any>([]);
  const [variantToShow, setVariantShow] = useState<any>([]);
  const [sizeToShow, setSizeShow] = useState<any>([]);
  const [variant, setVariant] = useState<any>(null);
  const [checkoutId, setCheckoutId] = useState<any>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notifyModalOpen, setNotifyModalOpen] = useState<any>(false);
  const [freqItemVariantModalOpen, setFreqItemVariantModalOpen] =
    useState<any>(false);
  const [freqItems, setFreqItems] = useState<any>([]);
  const [addOnList, setAddOnList] = useState<any>([]);
  const {cartDetails, getCartData}: any = useGetCart();
  const {count} = useSelector((state: RootState) => state.CartReducer);
  const {t} = useTranslation();
  const flatListRef0 = useRef(null);
  const flatListRef = useRef(null);
  const [webViewHeight, setWebViewHeight] = useState(300);
  const [freqIndex, setFreqIndex] = useState<any>(0);
  const [freqItem, setFreqItem] = useState<any>(null);
  const [variantColor, setVariantColor] = useState('');
  const [variantSize, setVariantSize] = useState('');
  const [handleId, setHandleId] = useState<string>('');
  const {relatedProducts, getRelatedProducts}: any = useGetRelatedProducts();
  const [isPlaying, setIsPlaying] = useState(true);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  let mode = 'test';
  const handleMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data) {
      const contentHeight = parseInt(event.nativeEvent.data);
      if (
        contentHeight != null &&
        !isNaN(contentHeight) &&
        typeof contentHeight === 'number'
      ) {
        setWebViewHeight(contentHeight);
      }
    }
  };

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
    //set 'you may also like' product
    if (productDetails) {
      getRelatedProducts(productDetails?.id);
    }

    //set frequently Brought Items
    if (frequentlyBroughtItem) {
      var freqItems_: {
        productId: any;
        handle: any;
        id: any;
        image: any;
        price: any;
        variants: any;
        name: any;
        selected: boolean;
      }[] = [];
      freqItems_.push({
        productId: getNoFromId(productDetails?.id),
        handle: handle,
        id: getNoFromId(variant?.node?.id),
        image: variant?.node?.image?.url,
        price: variant?.node?.price?.amount,
        variants: variantList,
        name: productDetails?.title,
        selected: true,
      });
      let arr = frequentlyBroughtItem?.preferences[0]?.products;

      arr.forEach((element: any) => {
        freqItems_.push({
          productId: element?.id,
          handle: element?.url,
          id: element?.variants[0]?.id,
          image: element?.variants[0]?.image_url,
          price: element?.variants[0]?.shop_currency_price,
          variants: element?.variants,
          name: element.name,
          selected: true,
        });
      });
      setFreqItems(freqItems_);
    }
  }, [frequentlyBroughtItem, variant, productDetails]);

  const handleVariantCliclFreqItem = async (variant: any, index: any) => {
    let array = [...freqItems];
    array[index].id = variant?.id;
    array[index].price = variant?.shop_currency_price;
    setFreqItems(array);
    setFreqItemVariantModalOpen(false);
  };

  const handleVariantCliclFreqItemThisItem = (variant: any, index: any) => {
    let array = [...freqItems];
    array[index].id = getNoFromId(variant?.node?.id);
    array[index].price = variant?.node?.price?.amount;
    setFreqItems(array);
    setVariant(variant);
    setFreqItemVariantModalOpen(false);
  };

  useEffect(() => {
    // console.log("CHOOSED: ", handle);
    setHandleId(handle);
  }, [variant]);

  useEffect(() => {
    if (deals) {
      const newArray = deals.dealBars.map((item: any, i: any) => {
        return {...item, selected: quantity === item.quantity};
      });

      setDeals({...deals, dealBars: newArray});
    }
  }, [quantity]);

  useEffect(() => {
    if (productDetails) {
      if (productDetails.id) {
        if (productDetails?.metafields) {
          setAddOnList(productDetails?.metafields);
        }
        getDeals(getNoFromId(productDetails?.id));
        getFrequentlyBroughtItem(
          getNoFromId(productDetails?.id),
          encodeURIComponent(variant?.node?.title),
        );
      }
    }
  }, [productDetails]);

  useEffect(() => {
    //set Variant list of product
    setVariantList(productDetails?.variants?.edges);
  }, [productImages, productDetails]);

  useEffect(() => {
    //select first variant as default

    if (variantList != undefined && variantList.length > 0) {
      if (selectedVariantId) {
        let variantIndex = variantList.findIndex(
          (item: any) => item?.node?.id === selectedVariantId,
        );
        setSelectedVariant(0);
        setTimeout(() => {
          setSelectedVariant(
            variantIndex != -1 && variantIndex ? variantIndex : 0,
          );
        }, 500);
      } else {
        setSelectedVariant(0);
      }
    }
  }, [variantList, productDetails, productImages, tabRef]);

  const getTotalPriceForFrequentlyBoughtItem = () => {
    var total_amount = 0.0;
    freqItems.forEach((element: any) => {
      if (element.selected) {
        total_amount = total_amount + Number.parseFloat(element.price);
      }
    });
    return total_amount;
  };

  useEffect(() => {
    if (response) {
      setNotifyModalOpen(false);
      Toast.show({
        type: 'success',
        text1: response?.message,
        position: 'bottom',
      });
    }
  }, [response]);

  const setSelectedVariant = (_index: number) => {
    setVariant(variantList[_index]);
    if (tabRef.current) {
      const index = productImages.findIndex(
        (item: any) =>
          item?.node?.image?.url == variantList[_index]?.node?.image?.url,
      );

      if (index != -1) {
        tabRef.current.setPage(index);
      }
    }
  };

  useEffect(() => {
    if (addCartData) {
      console.log('cart calling from product');

      // console.log("addCartData: ", JSON.stringify(addCartData));

      // Vibration.vibrate(100);
      // Toast.show({
      //   type: "success",
      //   text1: `${t("cartItemAdded")}`,
      //   position: "bottom",
      // });
      //update cart details after successfully adding item to the cart
      getCartData();
    }
  }, [addCartData]);
  useEffect(() => {}, [productImages]);
  const getNoFromId = (inputString: string) => {
    const numericPart = inputString.match(/\d+/);
    const result = numericPart ? numericPart[0] : '';
    return result;
  };

  function isValidEmail(email: string) {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  function isPhoneValid(phone: string) {
    // Regular expression for Qatar phone number validation without country code
    const qatarPhoneRegex = /^(\d{3}|\(\d{3}\))[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return qatarPhoneRegex.test(phone);
  }

  function isEitherEmailOrPhoneFilled(email: string, phone: string) {
    return email || phone;
  }

  function isDataValid(email: string, phone: string) {
    const isEmailEmpty = !email || email.trim() === '';
    const isPhoneEmpty = !phone || phone.trim() === '';

    if (!isEitherEmailOrPhoneFilled(email, phone)) {
      return false; // Both email and phone are empty
    }
    if (!isEmailEmpty && !isValidEmail(email)) {
      return false; // Invalid email format
    }

    if (!isPhoneEmpty) {
      return false; // Invalid phone format
    }
    return true; // Either email or phone is valid and filled
  }

  async function addSelectedItemsToCart() {
    // Prepare line items as an array of objects
    const lineItems = freqItems
      .filter((element: any) => element.selected) // Filter selected items
      .map((element: any) => ({
        merchandiseId: `gid://shopify/ProductVariant/${element.id}`, // Correct GID format
        quantity: 1, // Set quantity
      }));

    // Call the function to add to cart
    await addToCartFrequentlyBought(checkoutId, lineItems);
  }

  const handleAddOnClick = (index: number) => {
    console.log('listed one thing');

    let list = [...addOnList];

    list[index].selected == undefined
      ? (list[index].selected = true)
      : (list[index].selected = !list[index].selected);

    setAddOnList(list);
  };

  const addToCartWithAddOn = async () => {
    // Initialize lineItems as an array
    const lineItems: {merchandiseId: string; quantity: number}[] = [];

    // Add the main product to lineItems
    lineItems.push({
      merchandiseId: `gid://shopify/ProductVariant/${getNoFromId(
        variant?.node?.id,
      )}`,
      quantity: quantity,
    });

    // Process add-ons and add them to lineItems
    const addToCartPromises = addOnList.map(async (element: any) => {
      if (element.selected) {
        const addOnData = JSON.parse(element?.value)?.data?.ymq1?.options?.[
          '1_1'
        ];

        if (addOnData?.variant_id && addOnData?.variant_id !== 0) {
          lineItems.push({
            merchandiseId: `gid://shopify/ProductVariant/${addOnData?.variant_id}`,
            quantity: quantityAddOn,
          });
        } else {
          console.log('Product installation');
          console.log('YMQ', JSON.parse(element?.value)?.data?.ymq1?.options);
        }
      }
    });

    // Wait for all promises to complete
    await Promise.all(addToCartPromises);

    // Call the function with the array of objects
    addToCartFrequentlyBought(checkoutId, lineItems);
  };
  const getItemWidth = (contentLength: any) => {
    console.log('LEN: ', contentLength);

    if (contentLength < 10 && contentLength > 5) {
      return 150;
    }
    if (contentLength <= 5) {
      return 100;
    } else {
      return contentLength * 10;
    }
  };
  const orderByWhatsapp = async (url: string) => {
    const phoneNumber = '+97470119277';
    const message = 'Hai, ' + url;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phoneNumber,
    )}&text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappLink).catch(err =>
      console.error('An error occurred', err),
    );
  };
  const onShare = async () => {
    // console.log(handleId, "this is id");

    let url;

    if (Platform.OS === 'android') {
      url = 'https://qsales-online-shopping.vercel.app/MAIN/PRODUCT_DETAILS';
    } else if ((Platform.OS = 'ios')) {
      url = 'https://qsales-online-shopping.vercel.app/MAIN/PRODUCT_DETAILS';
      // url = "https://qsales-online-shopping.vercel.app/MAIN/PRODUCT_DETAILS";
    }
    try {
      const result = await Share.share({
        message: `${url}/${handleId}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const picker = async (index: any, item: any) => {
    await setFreqIndex(index);
    await setFreqItem(item);
    await setFreqItemVariantModalOpen(true);
  };
  useEffect(() => {
    // console.log('YOUO', JSON.stringify(variantList));
    // console.log('IWNSN', JSON.stringify(productHasVariantSize(variantList)));
    const colorList = filterUniqueColors(variantList);

    const sizeList = filterUniqueSize(variantList);
    setVariantShow(
      productHasVariantSize(variantList) ? colorList : variantList,
    );
    setSizeShow(productHasVariantSize(variantList) ? sizeList : variantList);
  }, [variantList]);
  const selectVariantItem = ({
    value = null,
    name = 'Color',
    selected = [],
  }: any) => {
    let options = [...selected?.node?.selectedOptions];

    let variantOptionIndex = selected?.node?.selectedOptions.findIndex(
      (option: any) => option?.name == name,
    );

    if (variantOptionIndex !== -1) {
      options[variantOptionIndex] = {name: name, value: value};
    }
    // Find the index of the object you want to replace

    // Check if the object was found

    let variantIndex = variantList.findIndex(
      (variantItem: any, index: number) =>
        variantItem?.node?.selectedOptions &&
        JSON.stringify(variantItem.node.selectedOptions) ===
          JSON.stringify(options),
    );
    setSelectedVariant(variantIndex);
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '30%'], []);

  // callbacks
  const handlePresentModalPress = useCallback((productTittile: any) => {
    Vibration.vibrate();
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    setIsPlaying(true);
  }, []);
  const handleContinueShopping = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  useEffect(() => {
    if (productDetails?.onlineStoreUrl !== undefined) {
      AppEventsLogger.logEvent('ViewContent', {
        content_type: 'product',
        content_id: productDetails?.onlineStoreUrl,
        value: variant?.node?.price?.amount,
        currency: variant?.node?.price?.currencyCode,
        variant: variant?.node?.title,
      });
    }
  }, [productDetails, variant]);

  return (
    <BottomSheetModalProvider>
      <View
        style={[CommonStyles.containerFlex1, {backgroundColor: Colors.white}]}>
        <View style={styles.container}>
          <Header
            title={productDetails?.title}
            cartCount={count}
            hideSearch={true}
            page="details"
            pageNavigation={pageNavigation}
          />
          {(variant != undefined || variant != null) && (
            <>
              {!loading ? (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                  contentContainerStyle={{paddingBottom: getHeight(7)}}>
                  <PagerView
                    style={styles.imageContainer}
                    onPageSelected={e => {
                      setSelectedIndex(e.nativeEvent.position);
                    }}
                    ref={tabRef}>
                    {productImages &&
                      productImages.map((item: any, index: number) => {
                        if (item?.node?.mediaContentType === 'IMAGE') {
                          return (
                            <View
                              style={{
                                position: 'relative',
                                height: '100%',
                              }}>
                              <ImageZoom
                                uri={item?.node?.image?.url}
                                key={index}
                                resizeMode="stretch"
                                style={CommonStyles.containerFlex1}
                                isDoubleTapEnabled
                              />
                              {/* 
                              <Image
                                key={index}
                                resizeMode="stretch"
                                style={CommonStyles.containerFlex1}
                                source={{
                                  uri: item?.node?.image?.url,
                                }}
                              /> */}
                              <View
                                style={{
                                  // backgroundColor: "green",
                                  width: getWidth(2),
                                  height: getHeight(6),
                                  position: 'absolute',
                                  right: 0,
                                  display: 'flex',
                                  alignItems: 'flex-end',
                                }}>
                                <TouchableOpacity
                                  style={{
                                    marginTop: getWidth(35),
                                    marginRight: getWidth(35),
                                    padding: getWidth(90),
                                    borderRadius: 8,
                                    backgroundColor: '#FCFBFA',
                                  }}
                                  onPress={() => onShare()}>
                                  <Image
                                    source={images?.share3}
                                    style={{width: 25, height: 25}}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          );
                        }
                      })}
                  </PagerView>
                  <View style={styles.dotContainer}>
                    {productImages &&
                      productImages.map((item: any, index: number) => {
                        return (
                          <View
                            key={index}
                            style={[
                              styles.dotStyle,
                              {
                                backgroundColor:
                                  index !== selectedIndex
                                    ? Colors.placeholderColor
                                    : Colors.black,
                              },
                            ]}
                          />
                        );
                      })}
                  </View>
                  <Text style={styles.titleTxt}>{productDetails?.title}</Text>
                  <View style={[{marginTop: 16}]}>
                    {variant?.node?.selectedOptions.map((item: any) => (
                      <>
                        {item?.name !== 'Size' ? (
                          <View style={{flexDirection: 'row', marginRight: 6}}>
                            <Text
                              style={[
                                styles.variantTitle,
                                {fontWeight: '500'},
                              ]}>
                              {item?.name != 'Title' ? item?.name : ''}{' '}
                            </Text>
                            <Text
                              style={[
                                styles.variantValue,
                                {fontWeight: '500'},
                              ]}>
                              {item?.value != 'Default Title'
                                ? item?.value
                                : ''}
                            </Text>
                          </View>
                        ) : null}
                      </>
                    ))}
                  </View>
                  {/* {variantList && variantList.length > 1 && mode === 'test' ? (
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      // placeholder={!isFocus ? 'Select item' : '...'}
                      // value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={(item:any) => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <View>
                          <Text>naseeb</Text>
                        </View>
                      )}
                    />
                  ) : (
                    <FlatList
                      data={variantToShow}
                      renderItem={({item, index}) => {
                        let color = item?.node?.selectedOptions.find(
                          (variantOptions: any) =>
                            variantOptions.name === 'Color',
                        )?.value;

                        let selectedColor = variant?.node?.selectedOptions.find(
                          (variantOptions: any) =>
                            variantOptions.name === 'Color',
                        )?.value;
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              productHasVariantSize(variantList)
                                ? selectVariantItem({
                                    name: 'Color',
                                    value: color,
                                    selected: variant,
                                  })
                                : setSelectedVariant(index)
                            }>
                            <View
                              style={{
                                borderWidth:
                                  (!productHasVariantSize(variantList) &&
                                    item?.node?.title ==
                                      variant?.node?.title) ||
                                  color == selectedColor
                                    ? 2
                                    : 0,
                                borderColor: Colors.primary,
                                margin: getWidth(50),
                                opacity:
                                  item?.node?.quantityAvailable > 0 ? 1 : 0.5,
                              }}>
                              <Image
                                resizeMode="stretch"
                                style={styles.varientImage}
                                source={{
                                  uri: item?.node?.image?.url,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )} */}
                  {variantList && variantList.length > 1 && (
                    <FlatList
                      horizontal
                      data={variantToShow}
                      renderItem={({item, index}) => {
                        let color = item?.node?.selectedOptions.find(
                          (variantOptions: any) =>
                            variantOptions.name === 'Color',
                        )?.value;

                        let selectedColor = variant?.node?.selectedOptions.find(
                          (variantOptions: any) =>
                            variantOptions.name === 'Color',
                        )?.value;
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              productHasVariantSize(variantList)
                                ? selectVariantItem({
                                    name: 'Color',
                                    value: color,
                                    selected: variant,
                                  })
                                : setSelectedVariant(index)
                            }>
                            <View
                              style={{
                                borderWidth:
                                  (!productHasVariantSize(variantList) &&
                                    item?.node?.title ==
                                      variant?.node?.title) ||
                                  color == selectedColor
                                    ? 2
                                    : 0,
                                borderColor: Colors.primary,
                                margin: getWidth(50),
                                opacity:
                                  item?.node?.quantityAvailable > 0 ? 1 : 0.5,
                              }}>
                              <Image
                                resizeMode="stretch"
                                style={styles.varientImage}
                                source={{
                                  uri: item?.node?.image?.url,
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  )}
                  {variantList &&
                    variantList.length > 1 &&
                    sizeToShow.length >= 0 &&
                    productHasVariantSize(variantList) && (
                      <>
                        <View style={[{marginTop: 16}]}>
                          {variant?.node?.selectedOptions.map((item: any) => (
                            <>
                              {item?.name === 'Size' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginRight: 6,
                                  }}>
                                  <Text
                                    style={[
                                      styles.variantTitle,
                                      {fontWeight: '500'},
                                    ]}>
                                    {item?.name != 'Title' ? item?.name : ''}
                                    {''}
                                  </Text>
                                  <Text
                                    style={[
                                      styles.variantValue,
                                      {fontWeight: '500'},
                                    ]}>
                                    {item?.value != 'Default Title'
                                      ? item?.value
                                      : ''}
                                  </Text>
                                </View>
                              ) : null}
                            </>
                          ))}
                        </View>

                        <FlatList
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          data={sizeToShow}
                          renderItem={({item, index}) => {
                            let size = item?.node?.selectedOptions.find(
                              (variantOptions: any) =>
                                variantOptions.name === 'Size',
                            )?.value;
                            let selectedSize =
                              variant?.node?.selectedOptions.find(
                                (variantOptions: any) =>
                                  variantOptions.name === 'Size',
                              )?.value;
                            return (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  selectVariantItem({
                                    value: size,
                                    name: 'Size',
                                    selected: variant,
                                  });
                                }}>
                                <View
                                  style={{
                                    borderWidth: 2,
                                    borderColor:
                                      selectedSize === size
                                        ? Colors.primary
                                        : Colors.lightPink,
                                    margin: getWidth(50),
                                    minWidth: 65,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    height: 30,
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity:
                                      item?.node?.quantityAvailable > 0
                                        ? 1
                                        : 0.5,
                                  }}>
                                  <Text style={{color: Colors.black}}>
                                    {size}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            );
                          }}
                        />
                      </>
                    )}

                  <Text style={styles.priceTxt}>
                    {variant?.node?.price?.currencyCode}{' '}
                    <Text
                      style={{
                        fontWeight: '600',
                        paddingLeft: 5,
                        fontSize: 18,
                      }}>
                      {formatPrice(Number(variant?.node?.price?.amount))}{' '}
                    </Text>
                    {!Number.isNaN(
                      Number(variant?.node?.compareAtPrice?.amount),
                    ) && (
                      <Text
                        style={{
                          fontWeight: '600',
                          paddingLeft: 99,
                          fontSize: 14,
                          color: 'black',
                          textDecorationLine: 'line-through',
                        }}>
                        QAR{' '}
                        {formatPrice(
                          Number(variant?.node?.compareAtPrice?.amount),
                        )}{' '}
                      </Text>
                    )}
                  </Text>

                  <View style={styles.rowContainer}>
                    <View
                      style={
                        variant?.node?.quantityAvailable > 0
                          ? styles.inStock
                          : styles.outOfStock
                      }
                    />
                    <Text style={styles.variantValue}>
                      {variant?.node?.quantityAvailable > 0
                        ? ` ${t('inSTock')} `
                        : ` ${t('outOfStock')} `}
                    </Text>
                  </View>

                  {addOnList && addOnList.length > 0 && (
                    <FlatList
                      data={addOnList}
                      style={{padding: 6}}
                      renderItem={({item, index}) => {
                        console.log(item, 'YMQ-ITEM=======');
                        return (
                          <>
                            {item && (
                              <TouchableOpacity
                                onPress={() => {
                                  console.log(
                                    JSON.parse(item?.value)?.data?.ymq1,
                                    '==YMQ-ITEM==',
                                  );
                                  // JSON.parse(item?.value)?.data?.ymq1
                                  //       ?.options?.["1_1"]?.variant_id == 0 ?
                                  //       handleInstallationClick()
                                  //       :
                                  handleAddOnClick(index);
                                }}
                                style={{
                                  borderWidth: 0.5,
                                  padding: 6,
                                  marginTop: index == 0 ? 16 : 0,
                                  marginBottom:
                                    index == addOnList.length - 1 ? 16 : 0,
                                }}>
                                <Text
                                  style={{
                                    fontWeight: '500',
                                    color: Colors.black,
                                  }}>
                                  {JSON.parse(item?.value)?.data?.ymq1?.label}
                                </Text>
                                <View
                                  style={{flexDirection: 'row', marginTop: 6}}>
                                  <View
                                    style={{
                                      borderWidth: 0.5,
                                      width: 20,
                                      height: 20,
                                      justifyContent: 'center',
                                    }}>
                                    {item.selected && (
                                      <Image
                                        style={{
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                          width: 20,
                                          height: 20,
                                        }}
                                        source={icons.check_box}
                                      />
                                    )}
                                  </View>
                                  <Text
                                    style={{
                                      fontWeight: '400',
                                      color: Colors.black,
                                      fontSize: 12,
                                      marginLeft: 6,
                                      flex: 1,
                                    }}>
                                    Yes + QAR{' '}
                                    {JSON.parse(item?.value)?.data?.ymq1
                                      ?.options?.['1_1']?.variant_id == 0
                                      ? JSON.parse(item?.value)?.data?.ymq1
                                          ?.options?.['1_1']?.price
                                      : JSON.parse(item?.value)?.data?.ymq1
                                          ?.options?.['1_1']?.variant_price}
                                  </Text>
                                </View>
                                {JSON.parse(item?.value)?.data?.ymq1?.options?.[
                                  '1_1'
                                ]?.variant_id != 0 &&
                                  item.selected && (
                                    <TouchableOpacity
                                      onPress={() => setAddOnModalOpen(true)}
                                      style={styles.quantitySelectorAddOn}>
                                      <Text
                                        style={{
                                          fontSize: getHeight(55),
                                          flex: 2,
                                          color: Colors.black,
                                        }}>
                                        {' '}
                                        {quantityAddOn}
                                      </Text>
                                      <Image
                                        style={{height: '50%', width: '50%'}}
                                        source={images.arrowDown}
                                      />
                                    </TouchableOpacity>
                                  )}
                              </TouchableOpacity>
                            )}
                          </>
                        );
                      }}
                      keyExtractor={item => item?.id}
                    />
                  )}

                  {variant?.node?.quantityAvailable > 0 && (
                    <View style={styles.quantityContainer}>
                      <Text style={styles.quantityTxt}>{t('quantity')}</Text>
                      <TouchableOpacity
                        onPress={() => setModalOpen(true)}
                        style={styles.quantitySelector}>
                        <Text
                          style={{
                            fontSize: getHeight(55),
                            flex: 2,
                            color: Colors.black,
                          }}>
                          {' '}
                          {quantity}
                        </Text>
                        <Image
                          style={{height: '50%', width: '50%'}}
                          source={images.arrowDown}
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                  {deals && variant?.node?.quantityAvailable > 0 && (
                    <View
                      style={{
                        flexDirection: 'column',
                        borderTopWidth: 0.5,
                        marginTop: 24,
                        borderColor: 'grey',
                      }}>
                      <Text style={[styles.subTitle]}>{deals?.blockTitle}</Text>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: Colors.primary,
                          padding: 6,
                          marginTop: 24,
                        }}>
                        <FlatList
                          data={deals?.dealBars}
                          renderItem={({item, index}) => (
                            <TouchableOpacity
                              onPress={() => {
                                const newArray = deals.dealBars.map(
                                  (item: any, i: any) => {
                                    return {...item, selected: i === index}; // Toggle 'selected' for the selected item
                                  },
                                );

                                setDeals({...deals, dealBars: newArray});
                                setQuantity(item.quantity);
                              }}
                              style={{
                                flexDirection: 'row',
                                borderTopWidth: index == 0 ? 0 : 0.5,
                                paddingTop: 10,
                                paddingBottom: 10,
                              }}
                              key={index}>
                              {item.selected ? (
                                <View
                                  style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    height: 24,
                                    width: 24,
                                    borderWidth: 0.5,
                                    borderColor: Colors.primary,
                                    marginRight: 16,
                                    borderRadius: 12,
                                  }}>
                                  <View
                                    style={{
                                      alignSelf: 'center',
                                      justifyContent: 'center',
                                      height: 20,
                                      width: 20,
                                      borderWidth: 0.5,
                                      backgroundColor: Colors.primary,

                                      borderRadius: 10,
                                    }}></View>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    height: 24,
                                    width: 24,
                                    borderWidth: 0.5,
                                    borderColor: Colors.primary,
                                    marginRight: 16,
                                    borderRadius: 12,
                                  }}></View>
                              )}

                              <View style={{flex: 1}}>
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      fontWeight: '600',
                                      color: Colors.primary,
                                    }}>
                                    {item?.title}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: '400',
                                      color: Colors.black,
                                      marginLeft: 6,
                                      fontSize: 9,
                                      alignSelf: 'center',
                                    }}>
                                    {item?.label && `(${item?.label})`}
                                  </Text>
                                </View>

                                <Text
                                  style={{
                                    fontWeight: '400',
                                    color: Colors.black,
                                  }}>
                                  {item?.subtitle}
                                </Text>
                              </View>
                              <View style={{justifyContent: 'center'}}>
                                {deals?.mostPopularDealBarId &&
                                  deals?.mostPopularDealBarId == item?.id && (
                                    <Text
                                      style={{
                                        color: 'white',
                                        backgroundColor: 'red',
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                        fontSize: 10,
                                        paddingTop: 3,
                                        paddingBottom: 3,
                                        borderRadius: 6,
                                        fontWeight: '500',
                                      }}>
                                      {t('most_Popular')}
                                    </Text>
                                  )}
                                <Text
                                  style={{
                                    fontWeight: '600',
                                    color: Colors.black,
                                    fontSize: 16,
                                    alignSelf: 'center',
                                  }}>
                                  {variant?.node?.price?.currencyCode}{' '}
                                  {item.discountValue
                                    ? formatPrice(Number(item.discountValue))
                                    : formatPrice(
                                        Number(variant?.node?.price?.amount),
                                      )}{' '}
                                </Text>
                                {item.discountValue &&
                                  variant?.node?.price?.amount *
                                    item?.quantity !=
                                    item.discountValue && (
                                    <Text
                                      style={{
                                        fontWeight: '400',
                                        color: 'grey',
                                        fontSize: 12,
                                        alignSelf: 'center',
                                        textDecorationLine: 'line-through',
                                      }}>
                                      {variant?.node?.price?.currencyCode}{' '}
                                      {formatPrice(
                                        Number(
                                          variant?.node?.price?.amount *
                                            item?.quantity,
                                        ),
                                      )}
                                    </Text>
                                  )}
                              </View>
                            </TouchableOpacity>
                          )}
                          keyExtractor={item => item.id}
                        />
                      </View>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.subTitle,
                      {marginTop: 16, marginBottom: 16},
                    ]}>
                    {t('description')}
                  </Text>

                  {/* {productImages && (
                <Image
                  resizeMode="stretch"
                  style={styles.imageContainer}
                  source={{
                    uri: productImages[productImages.length - 1]?.node?.image
                      ?.url,
                  }}
                />
              )} */}

                  {/* <Text style={styles.titleTxt}>{productDetails?.description}</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.webView, {
                    html_: productDetails?.descriptionHtml,
                    title: `${productDetails?.title}`,
                  });
                }}
              >
                <Text
                  style={[
                    {
                      alignSelf: "flex-end",
                      color: Colors.primary,
                      fontWeight: "500",
                      marginTop: 6,
                    },
                  ]}
                >
                  More
                </Text>
              </TouchableOpacity> */}
                  {productDetails?.descriptionHtml ? (
                    <View
                      style={{
                        minHeight: 150,
                        width: '95%',
                        alignSelf: 'center',
                        marginBottom: 10,
                      }}>
                      <RenderHtml
                        contentWidth={getWidth(1)}
                        source={{html: productDetails?.descriptionHtml}}
                        baseStyle={{color: 'black', fontSize: getWidth(25)}}
                      />
                    </View>
                  ) : null}

                  {productVideo?.value ? (
                    <YoutubePlayer
                      height={200}
                      webViewStyle={{opacity: 0.99, backgroundColor: 'red'}}
                      // play={playing}

                      videoId={getYouTubeVideoId(productVideo?.value)}
                      // onChangeState={onStateChange}
                    />
                  ) : null}
                  {/* <Text>Hello {JSON.stringify(productVideo?.value)}</Text> */}
                  {frequentlyBroughtItem &&
                    variant?.node?.quantityAvailable > 0 && (
                      <View
                        style={{
                          flexDirection: 'column',
                          borderTopWidth: 0.5,
                          marginTop: 24,
                          borderColor: 'grey',
                        }}>
                        <Text style={[styles.subTitle, {marginTop: 16}]}>
                          {t('freq')}
                        </Text>
                        <View
                          style={{
                            borderWidth: 0.5,
                            borderColor: Colors.primary,
                            padding: 6,
                            marginTop: 24,
                          }}>
                          <FlatList
                            style={{marginTop: 24}}
                            horizontal
                            nestedScrollEnabled
                            data={freqItems}
                            renderItem={({item, index}) => (
                              <View style={{flexDirection: 'row'}} key={index}>
                                <TouchableOpacity
                                  onPress={() => {
                                    console.log(
                                      'ID : ',
                                      `gid://shopify/Product/${item.productId}`,
                                    );
                                    console.log('Handle : ', item.handle);

                                    navigation.replace(screens.productDetails, {
                                      id: `gid://shopify/Product/${item.productId}`,
                                      handle: item.handle,
                                    });
                                  }}>
                                  <View
                                    style={{
                                      height: 100,
                                      width: 100,
                                      borderWidth: 1,
                                      borderColor: Colors.lightPink,
                                      borderRadius: 8,
                                      marginLeft: 8,
                                      marginRight: 8,
                                    }}>
                                    <Image
                                      style={styles.image}
                                      resizeMode="cover"
                                      source={{uri: item?.image}}
                                    />
                                  </View>
                                </TouchableOpacity>
                                {index != freqItems?.length - 1 && (
                                  <Text
                                    style={{
                                      color: 'grey',
                                      alignSelf: 'center',
                                      fontSize: 16,
                                      fontWeight: '600',
                                    }}>
                                    +
                                  </Text>
                                )}
                              </View>
                            )}
                            keyExtractor={item => item.id}
                          />
                          <FlatList
                            style={{marginTop: 24}}
                            data={freqItems}
                            renderItem={({item, index}) => (
                              <View
                                key={index}
                                style={{
                                  marginLeft: getHeight(86),
                                  paddingBottom: getHeight(45),
                                  borderBottomWidth: 0.5,
                                  borderColor: 'grey',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      let array = [...freqItems];
                                      array[index].selected =
                                        !array[index].selected;
                                      setFreqItems(array);
                                    }}
                                    style={{justifyContent: 'center'}}>
                                    {item.selected ? (
                                      <Image
                                        style={{
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                          height: 24,
                                          width: 24,
                                          marginRight: 16,
                                        }}
                                        source={icons.check_box}
                                      />
                                    ) : (
                                      <View
                                        style={{
                                          alignSelf: 'center',
                                          justifyContent: 'center',
                                          height: 24,
                                          width: 24,
                                          borderWidth: 0.5,
                                          borderColor: Colors.primary,
                                          marginRight: 16,
                                          borderRadius: 3,
                                        }}></View>
                                    )}
                                  </TouchableOpacity>
                                  <View style={{flex: 1}}>
                                    <Text
                                      numberOfLines={2}
                                      style={[
                                        styles.nameText,
                                        {fontWeight: '400'},
                                      ]}>
                                      {index == 0 && `${t('thisItem')}: `}
                                      {item?.name}
                                    </Text>

                                    <>
                                      {index == 0 ? (
                                        <>
                                          {variant?.node?.selectedOptions[0]
                                            ?.value ===
                                          'Default Title' ? null : (
                                            <TouchableOpacity
                                              onPress={() =>
                                                item?.variants.length > 1 &&
                                                picker(index, item)
                                              }
                                              style={{
                                                flexDirection: 'row',
                                                maxWidth:
                                                  item?.variants.length > 1
                                                    ? '30%'
                                                    : '50%',
                                                height: 30,
                                                borderWidth:
                                                  item?.variants.length > 1
                                                    ? 0.5
                                                    : 0.0,
                                                marginTop: 3,
                                              }}>
                                              <Text
                                                numberOfLines={1}
                                                ellipsizeMode={'tail'}
                                                style={{
                                                  color: 'black',
                                                  flex: 1,
                                                  paddingLeft: 6,
                                                  paddingRight: 6,
                                                  paddingTop: 3,
                                                  paddingBottom: 3,
                                                  fontSize: 12,
                                                  fontWeight: '500',
                                                  alignSelf: 'center',
                                                }}>
                                                {variant?.node?.selectedOptions.map(
                                                  (item: any) => (
                                                    <Text
                                                      style={{
                                                        color: 'black',
                                                        flex: 1,
                                                        paddingLeft: 6,
                                                        paddingRight: 6,
                                                        paddingTop: 3,
                                                        paddingBottom: 3,
                                                        fontSize: 12,
                                                        fontWeight: '500',
                                                        alignSelf: 'center',
                                                      }}>
                                                      {item?.value}
                                                    </Text>
                                                  ),
                                                )}
                                              </Text>

                                              {item?.variants.length > 1 && (
                                                <Text
                                                  ellipsizeMode={'tail'}
                                                  style={{
                                                    color: 'black',
                                                    paddingTop: 3,
                                                    paddingBottom: 3,
                                                    fontSize: 12,
                                                    paddingRight: 6,
                                                  }}>
                                                  ▼
                                                </Text>
                                              )}
                                            </TouchableOpacity>
                                          )}
                                        </>
                                      ) : (
                                        <TouchableOpacity
                                          onPress={() =>
                                            item?.variants.length > 1 &&
                                            picker(index, item)
                                          }
                                          style={{
                                            flexDirection: 'row',
                                            maxWidth:
                                              item?.variants.length > 1
                                                ? '30%'
                                                : '100%',
                                            height: 30,
                                            borderWidth:
                                              item?.variants.length > 1
                                                ? 0.5
                                                : 0,
                                            marginTop: 3,
                                          }}>
                                          <Text
                                            numberOfLines={1}
                                            ellipsizeMode={'tail'}
                                            style={{
                                              color: 'black',
                                              flex: 1,
                                              paddingLeft:
                                                item?.variants.length > 1
                                                  ? 6
                                                  : 0,
                                              paddingRight: 6,
                                              paddingTop: 3,
                                              paddingBottom: 3,
                                              fontSize: 12,
                                              fontWeight: '500',
                                              alignSelf: 'center',
                                            }}>
                                            {
                                              item?.variants.filter(
                                                (item: any) =>
                                                  item?.id ==
                                                  freqItems[index]?.id,
                                              )[0]?.label
                                            }
                                          </Text>
                                          {item?.variants.filter(
                                            (item: any) =>
                                              item?.id == freqItems[index]?.id,
                                          )[0]?.label &&
                                            item?.variants.length > 1 && (
                                              <Text
                                                ellipsizeMode={'tail'}
                                                style={{
                                                  color: 'black',
                                                  paddingTop: 3,
                                                  paddingBottom: 3,
                                                  fontSize: 12,
                                                  paddingRight: 6,
                                                }}>
                                                ▼
                                              </Text>
                                            )}
                                        </TouchableOpacity>
                                      )}
                                    </>
                                    <Text style={styles.priceText}>
                                      {index == 0
                                        ? `QAR ${formatPrice(
                                            Number(
                                              variant?.node?.price?.amount,
                                            ),
                                          )}`
                                        : `QAR ${formatPrice(
                                            Number(item?.price),
                                          )}`}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            )}
                            keyExtractor={item => item.id}
                          />

                          {
                            <View>
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  fontWeight: '800',
                                  padding: 8,
                                  color: 'grey',
                                }}>
                                {t('totalPrice')} :{' '}
                                <Text
                                  style={{
                                    color: Colors.primary,
                                    fontWeight: '800',
                                  }}>
                                  QAR{' '}
                                  {formatPrice(
                                    Number(
                                      getTotalPriceForFrequentlyBoughtItem(),
                                    ),
                                  )}
                                </Text>
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  if (
                                    freqItems.filter(
                                      (item: any) => item.selected == true,
                                    ).length > 0
                                  ) {
                                    addSelectedItemsToCart();
                                  } else {
                                    Toast.show({
                                      type: 'warning',
                                      text1: `${t('cartEmptyWarning')}`,
                                      position: 'bottom',
                                    });
                                  }
                                }}>
                                <Text
                                  style={{
                                    alignSelf: 'center',
                                    backgroundColor: Colors.primary,
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    color: 'white',
                                    fontWeight: '600',
                                    borderRadius: 100,
                                  }}>
                                  {t('addSelectedToCart')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          }
                        </View>
                        <View>
                          <SectionView
                            viewAllPress={() => {}}
                            items={relatedProducts}
                            title={t('youMayAlosLike')}
                          />
                        </View>
                      </View>
                    )}
                </ScrollView>
              ) : (
                <DeatailsSkeleton />
              )}

              {variant?.node?.quantityAvailable > 0 ? (
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(encodeURIComponent(productDetails?.title));
                      console.log(
                        encodeURIComponent(productDetails?.onlineStoreUrl),
                        'URL=======',
                      );
                      orderByWhatsapp(
                        `I want to buy ✨:\n\n${productDetails?.title}\n${productDetails?.onlineStoreUrl}`,
                      );
                    }}
                    style={[
                      styles.btnStyle,
                      {backgroundColor: Colors.green, flexDirection: 'row'},
                    ]}>
                    <Image
                      style={{height: 22, width: 22}}
                      source={images.whatsapp}></Image>
                    <Text style={styles.btnText}>
                      {' '}
                      {t('orderBy')}
                      {/* <Text style={{ fontSize: getHeight(75) }}> </Text> */}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handlePresentModalPress(productDetails?.title);

                      addOnList.length > 0 && addOnList[0] != null
                        ? addToCartWithAddOn()
                        : addToCart(variant?.node?.id, checkoutId, quantity);
                    }}
                    style={[
                      styles.btnStyle,
                      {backgroundColor: Colors.primary, flexDirection: 'row'},
                    ]}>
                    <SvgIcon.CartIcon
                      height={25}
                      width={25}
                      fill={Colors.white.toString()}
                    />

                    <Text style={styles.btnText}>{` ${t('addToCart')}`}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.btnContainer, {justifyContent: 'center'}]}>
                  <TouchableOpacity
                    onPress={() => setNotifyModalOpen(true)}
                    style={[
                      styles.btnStyle,
                      {backgroundColor: Colors.primary, alignSelf: 'center'},
                    ]}>
                    <Text style={styles.btnText}>{t('notify')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>

        <QuantityModal
          maxValue={variant?.node?.quantityAvailable}
          onSubmit={(value: any) => {
            setQuantity(value);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
          isOpen={quantityModal}
          value={quantity}
        />
        <QuantityModal
          maxValue={100}
          onSubmit={(value: any) => {
            setQuantityAddOn(value);
            setAddOnModalOpen(false);
          }}
          onClose={() => setAddOnModalOpen(false)}
          isOpen={quantityAddOnModal}
          value={quantityAddOn}
        />
        <NotifyMeModal
          isOpen={notifyModalOpen}
          onClose={() => setNotifyModalOpen(false)}
          onSubmit={() => {
            if (phone.trim() != '') {
              const currentDate = new Date();
              const utcOffsetInSeconds = currentDate.getTimezoneOffset() * 60;
              notify(
                email,
                phone,
                getNoFromId(productDetails?.id),
                utcOffsetInSeconds,
                encodeURIComponent(productDetails?.title),
                handle,
                variant?.node?.id,
                encodeURIComponent(variant?.node?.title),
                variant?.node?.sku,
              );
            } else {
              Vibration.vibrate(100);
              Toast.show({
                type: 'warning',
                text1: `${t('notifyWarning')}`,
                position: 'bottom',
              });
            }
          }}
          onEmailChanged={(text: string) => setEmail(text)}
          email={email}
          phone={phone}
          onPhoneChanged={(text: string) => setPhone(text)}
        />
        <Modal
          visible={freqItemVariantModalOpen}
          transparent
          onRequestClose={() => setFreqItemVariantModalOpen(false)}>
          <View
            style={{
              backgroundColor: Colors.transparentBlack,
              flex: 1,
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                width: getWidth(1.5),
                maxHeight: getHeight(1.5),
                alignSelf: 'center',
                borderRadius: 10,
                paddingBottom: 16,
              }}>
              <TouchableOpacity
                onPress={() => setFreqItemVariantModalOpen(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  padding: 16,
                }}>
                <Image
                  style={{
                    height: getHeight(55),
                    width: getHeight(55),
                  }}
                  source={icons.close}
                />
              </TouchableOpacity>
              {freqIndex == 0
                ? freqItem?.variants &&
                  freqItem?.variants.length >= 1 && (
                    <FlatList
                      ref={flatListRef0}
                      style={{marginTop: 6}}
                      data={freqItem?.variants}
                      renderItem={({item}) => (
                        <>
                          {item && (
                            <TouchableOpacity
                              onPress={() => {
                                handleVariantCliclFreqItemThisItem(
                                  item,
                                  freqIndex,
                                );
                              }}
                              style={{
                                borderColor: Colors.primary,
                                backgroundColor:
                                  freqItems[freqIndex].id ==
                                  getNoFromId(item?.node?.id)
                                    ? Colors.accent
                                    : Colors.white,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 6,
                                paddingBottom: 6,
                                borderWidth: 0.5,
                                width: getWidth(1.5),
                                alignSelf: 'center',
                              }}>
                              {item?.node?.selectedOptions.map((item: any) => (
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color: Colors.black,
                                    fontWeight: '500',
                                  }}>
                                  {item?.value}
                                </Text>
                              ))}
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                      keyExtractor={item => item.toString()}
                    />
                  )
                : freqItem?.variants &&
                  freqItem?.variants.length >= 1 && (
                    <FlatList
                      ref={flatListRef}
                      style={{marginTop: 6}}
                      data={freqItem?.variants}
                      renderItem={({item}) => (
                        <>
                          {item && (
                            <TouchableOpacity
                              onPress={async () => {
                                await handleVariantCliclFreqItem(
                                  item,
                                  freqIndex,
                                );
                              }}
                              style={{
                                borderColor: Colors.primary,
                                backgroundColor:
                                  freqItems[freqIndex].id == item.id
                                    ? Colors.accent
                                    : Colors.white,
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 6,
                                paddingBottom: 6,
                                borderWidth: 0.5,
                                justifyContent: 'center',
                                width: getWidth(1.5),
                                alignSelf: 'center',

                                //width: getItemWidth(item.label.length),
                              }}>
                              <Text
                                style={{
                                  color: Colors.black,
                                  fontWeight: '500',
                                  alignSelf: 'center',
                                  textAlign: 'left',
                                }}>
                                {item?.label}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </>
                      )}
                      keyExtractor={item => item.toString()}
                    />
                  )}
            </View>
          </View>
        </Modal>
        {/* <BottomSheet /> */}

        {/* <View style={styles.container}> */}
        {/* <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        /> */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                // backgroundColor:"red"
              }}>
              <View
                style={{
                  flex: 1,
                  marginTop: getHeight(90),
                  // width: getWidth(90),
                  // height: getHeight(20),
                  // backgroundColor: "red",
                  // justifyContent: "flex-start",
                }}>
                <AnimatedLottieView
                  source={require('../../../assets/Animations/cartAnimation.json')}
                  style={{width: getWidth(9), marginLeft: getWidth(90)}}
                  autoPlay={isPlaying}
                  loop={false}
                  onAnimationFinish={() => setIsPlaying(false)}
                />
              </View>
              <View style={{width: getWidth(1.2)}}>
                <Text
                  style={styles.titleTxt}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {productDetails?.title}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                gap: 20,
                marginTop: getHeight(90),
              }}>
              {/* <View>
                <Text>jiu</Text>
                <Text>87</Text>
              </View> */}
              <TouchableOpacity
                style={{
                  width: getWidth(1.1),
                  // backgroundColor: "red",
                  display: 'flex',
                  alignItems: 'center',
                  height: getHeight(15),
                  justifyContent: 'center',
                  borderColor: Colors.primary,
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                onPress={handleContinueShopping}>
                <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
                  <Translation textKey={strings.CONTINUESHOPPING} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: getWidth(1.1),
                  backgroundColor: Colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  height: getHeight(15),
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate(screens.cart)}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                  <Translation textKey={strings.ViewCart} />
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>

        {/* </View> */}
      </View>
    </BottomSheetModalProvider>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '95%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    marginTop: getHeight(45),
    height: getHeight(2.41),
    backgroundColor: Colors.borderGray,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  dotContainer: {
    alignSelf: 'center',
    marginTop: getHeight(75),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dotStyle: {
    height: getHeight(95),
    width: getHeight(95),
    borderRadius: 100,
    marginRight: 8,
  },
  titleTxt: {
    width: '95%',
    alignSelf: 'center',
    fontSize: getHeight(50),
    marginTop: getHeight(50),
    color: Colors.black,
  },
  priceTxt: {
    width: '95%',
    alignSelf: 'center',
    marginTop: getHeight(80),
    fontSize: getHeight(50),
    color: Colors.primary,
  },
  quantityTxt: {
    fontSize: getHeight(50),
    color: Colors.primary,
  },
  quantityContainer: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantitySelector: {
    minWidth: getWidth(7),
    maxWidth: getWidth(2.5),
    left: getHeight(55),
    backgroundColor: '#FDF5FF',
    height: getHeight(30),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2CEDD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  quantitySelectorAddOn: {
    width: 80,
    backgroundColor: '#FFFFFF',
    height: getHeight(30),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 16,
  },
  subTitle: {
    fontSize: getHeight(45),
    color: Colors.black,
    width: '95%',
    alignSelf: 'center',
    top: getHeight(55),
    fontWeight: '500',
  },
  btnStyle: {
    width: getWidth(2.2),
    height: '65%',
    backgroundColor: 'red',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    height: getHeight(12),
    bottom: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: Platform.OS == 'android' ? getHeight(55) : getHeight(60),
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(45),
  },
  featureTick: {
    height: getHeight(28),
    width: getHeight(28),
    marginRight: 7,
  },
  featureTxt: {
    flex: 5,
    fontSize: getHeight(55),
    color: Colors.black,
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: getWidth(50),
    marginTop: getWidth(50),
  },
  variantTitle: {
    color: Colors.primary,
  },
  variantValue: {
    color: Colors.black,
  },
  inStock: {
    backgroundColor: Colors.green,
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(100),
    alignSelf: 'center',
  },
  outOfStock: {
    backgroundColor: Colors.red,
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(100),
    alignSelf: 'center',
  },
  varientImage: {
    width: getWidth(8),
    height: getWidth(8),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  nameText: {
    fontSize: getHeight(65),
    marginTop: getHeight(85),
    fontWeight: '400',
    color: Colors.black,
  },
  priceText: {
    fontSize: getHeight(55),
    marginTop: getHeight(200),
    fontWeight: '400',
    color: Colors.primary,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: "red",
  },
  // container: {
  //   backgroundColor: 'white',
  //   padding: 16,
  // },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
