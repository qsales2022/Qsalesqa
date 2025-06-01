// import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {FC, useEffect, useState} from 'react';
// import {getHeight, getWidth} from '../../Theme/Constants';
// import Colors from '../../Theme/Colors';
// import {formatPrice} from '../../Utils';
// import FastImage from 'react-native-fast-image';
// import {AppEventsLogger} from 'react-native-fbsdk-next';

// interface ItemInterface {
//   name: string;
//   price: string;
//   image: any;
//   onPress?: any;
//   marginLeft?: number;
//   page: string;
//   offerPrice: string;
// }
// const SectionItem: FC<ItemInterface> = ({
//   name = '',
//   price = '',
//   image = '',
//   onPress,
//   page,
//   offerPrice = '',
// }) => {
//   const dynamicContainerStyle = {
//     height: page === 'home' ? getHeight(6) : getHeight(4.5),
//     width: page === 'home' ? getHeight(6) : '100%',
//     marginTop: page === 'home' ? getWidth(80) : undefined,
//   };
//   const Price = formatPrice(Number(price));
//   const [result, setResult] = useState<any>(null);

//   useEffect(() => {
//     const result =
//       typeof page === 'string' && page.includes('|') ? page.split?.('|') : '';
//     setResult(result);
//   }, [page]);

//   return (
//     <TouchableOpacity
//       onPress={() => {
//         if (onPress) {
//           onPress();
//           if (result[1] === 'search') {
//             console.log(result,'doen bro here awhaw');
//             AppEventsLogger.logEvent('search', {
//               search_query: result[0],
//               search_category: result[2],
//             });
//           }
//         }
//       }}
//       style={{
//         width: page === 'home' ? getWidth(2.5) : getWidth(2.2),
//         marginLeft: page === 'home' ? getHeight(86) : getHeight(86),
//         paddingBottom: page === 'home' ? getHeight(45) : getHeight(45),
//         // backgroundColor:'red',
//         marginTop: getHeight(80),
//         display: 'flex',
//         alignItems: 'center',
//         borderWidth: 2,
//         borderColor: '#F0F2F5',
//         borderRadius: 8,
//         height: page === 'home' ? getHeight(3) : getHeight(2.6),
//       }}>
//       <View style={dynamicContainerStyle}>
//         <View style={[styles.imageContainer]}>
//           <FastImage
//             style={styles.image}
//             resizeMode={FastImage.resizeMode.cover}
//             source={image}
//           />
//         </View>
//         <Text
//           numberOfLines={2}
//           ellipsizeMode={'tail'}
//           style={[styles.nameText]}>
//           {name}
//         </Text>
//         <View style={{display: 'flex', flexDirection: 'row', gap: 3}}>
//           <Text style={styles.priceTextQar}>QAR</Text>
//           <Text style={[styles.priceText, {color: 'black'}]}>
//             {formatPrice(Number(price))}
//           </Text>
//           {offerPrice !== '' && (
//             <Text style={styles.offerQar}>
//               QAR {formatPrice(Number(offerPrice))}
//             </Text>
//           )}
//         </View>
//         {Number(Price) >= 35 ? (
//           <View
//             style={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: 6,
//               marginTop: getHeight(90),
//               height: getHeight(20),
//             }}>
//             <Image
//               source={require('../../assets/Images/van.png')}
//               style={{width: page == 'home' ? '15%' : '11%', height: '25%'}}
//             />
//             <Text style={{color: 'black', fontSize: 10}}>FREE DELIVERY</Text>
//           </View>
//         ) : (
//           ''
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default SectionItem;

// const styles = StyleSheet.create({
//   imageContainer: {
//     // height: getHeight(6),
//     // width: getHeight(6),
//     borderWidth: 1,
//     borderColor: Colors.lightPink,
//     borderRadius: 8,
//     // marginTop:getWidth(80)
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 8,
//   },
//   nameText: {
//     fontSize: 15,
//     marginTop: getHeight(85),
//     fontWeight: '400',
//     color: Colors.black,
//     fontFamily: 'Helvetica',
//     letterSpacing: 0.5,
//   },
//   priceText: {
//     fontSize: getHeight(48),
//     marginTop: getHeight(200),
//     fontWeight: '700',
//     color: Colors.black,
//     fontFamily: 'Helvetica',
//   },
//   priceTextQar: {
//     fontSize: getHeight(50),
//     marginTop: getHeight(200),
//     fontWeight: '400',
//     color: Colors.black,
//   },
//   offerPrice: {
//     fontSize: getHeight(80),
//     marginTop: getHeight(80),
//     fontWeight: 'bold',
//     color: Colors.primary,
//     textDecorationLine: 'line-through', // Strikethrough line
//   },
//   offerQar: {
//     fontSize: getHeight(80),
//     marginTop: getHeight(80),
//     fontWeight: 'bold',
//     color: Colors.primary,
//     textDecorationLine: 'line-through', // Strikethrough line
//   },
// });



import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {getHeight, getWidth} from '../../Theme/Constants';
import Colors from '../../Theme/Colors';
import {formatPrice} from '../../Utils';
import FastImage from 'react-native-fast-image';
import {AppEventsLogger} from 'react-native-fbsdk-next';

interface ItemInterface {
  name: string;
  price: string;
  image: any;
  onPress?: () => void;
  page: string;
  offerPrice: string;
  offerList?: {
    offerType?: string;
    hasVisible?: boolean;
    offerColor?: string;
    textColor?: string;
  };
}

const SectionItem: FC<ItemInterface> = ({
  name = '',
  price = '',
  image = '',
  onPress,
  page,
  offerPrice = '',
  offerList = {},
}) => {
  const [searchInfo, setSearchInfo] = useState<string[]>([]);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(
    null,
  );

  const formattedPrice = formatPrice(Number(price));
  const formattedOfferPrice = formatPrice(Number(offerPrice));
  const isFreeDelivery = Number(formattedPrice) >= 35;
  const isHomePage = page === 'home';

  useMemo(() => {
    // Changed condition to check for valid price and offerPrice

    if (price && offerPrice) {
      const originalPrice = Number(price);
      const discountedPrice = Number(offerPrice);
      if (originalPrice < discountedPrice) {
        const discount =
          ((discountedPrice - originalPrice) / discountedPrice) * 100;
        setDiscountPercentage(Math.round(discount));
      } else {
        setDiscountPercentage(null);
      }
    }
  }, [price, offerPrice]);

  useEffect(() => {
    if (typeof page === 'string' && page.includes('|')) {
      setSearchInfo(page.split('|'));
    }
  }, [page]);

  const handlePress = () => {
    if (!onPress) return;

    onPress();

    if (searchInfo[1] === 'search') {
      AppEventsLogger.logEvent('search', {
        search_query: searchInfo[0],
        search_category: searchInfo[2],
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        {
          width: isHomePage ? getWidth(2.5) : getWidth(2.2),
          marginLeft: getHeight(86),
          paddingBottom: getHeight(45),
          marginTop: getHeight(80),
          height: isHomePage ? getHeight(3) : getHeight(2.6),
        },
      ]}>
      <View
        style={[
          styles.contentContainer,
          {
            height: isHomePage ? getHeight(6) : getHeight(4.5),
            width: isHomePage ? getHeight(6) : '100%',
            marginTop: isHomePage ? getWidth(80) : undefined,
          },
        ]}>
        <View style={styles.imageContainer}>
          {/* Changed condition to explicitly check for non-null discountPercentage */}
          {offerPrice !== '' && (
            <View
              style={[
                styles.discountBadge,
                {
                  backgroundColor:
                    offerList?.offerColor == '' ? 'red' : offerList?.offerColor,
                },
              ]}>
              {offerList?.offerType == 'diff' ? (
                <Text
                  style={[
                    styles.discountText,
                    {
                      color:
                        offerList?.textColor === ''
                          ? 'white'
                          : offerList?.textColor,
                    },
                  ]}>
                  Save {discountPercentage}%
                </Text>
              ) : (
                <Text
                  style={[
                    styles.discountText,
                    {
                      color:
                        offerList?.textColor === ''
                          ? 'white'
                          : offerList?.textColor,
                    },
                  ]}>
                  Save {Number(offerPrice) - Number(price)}
                </Text>
              )}
            </View>
          )}
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={image}
          />
        </View>

        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.nameText}>
          {name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.priceTextQar}>QAR</Text>
          <Text style={styles.priceText}>{formattedPrice}</Text>
          {offerPrice !== '' && (
            <Text style={styles.offerPrice}>QAR {formattedOfferPrice}</Text>
          )}
        </View>

        {isFreeDelivery && (
          <View style={styles.deliveryContainer}>
            <Image
              source={require('../../assets/Images/van.png')}
              style={[styles.deliveryIcon, {width: isHomePage ? '15%' : '11%'}]}
            />
            <Text style={styles.deliveryText}>FREE DELIVERY</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F2F5',
    borderRadius: 8,
  },
  contentContainer: {
    width: '100%',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 8,
    position: 'relative',
    overflow: 'visible', // Added to ensure badge is visible
    height: '100%', // Added to ensure proper image container height
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    zIndex: 999, // Increased to ensure visibility
    top: 0,
    left: 0,
    backgroundColor: 'red',
    paddingHorizontal: getWidth(30),
    borderBottomRightRadius: 10,
  },
  discountText: {
    color: 'white',
    fontSize: 12, // Added explicit font size
    fontWeight: '600', // Added font weight
  },
  nameText: {
    fontSize: 15,
    marginTop: getHeight(85),
    fontWeight: '400',
    color: Colors.black,
    fontFamily: 'Helvetica',
    letterSpacing: 0.5,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'baseline',
  },
  priceText: {
    fontSize: getHeight(48),
    marginTop: getHeight(200),
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'Helvetica',
  },
  priceTextQar: {
    fontSize: getHeight(50),
    marginTop: getHeight(200),
    fontWeight: '400',
    color: Colors.black,
  },
  offerPrice: {
    fontSize: getHeight(80),
    marginTop: getHeight(80),
    fontWeight: 'bold',
    color: Colors.primary,
    textDecorationLine: 'line-through',
  },
  deliveryContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: getHeight(90),
    height: getHeight(20),
    alignItems: 'center',
  },
  deliveryIcon: {
    height: '25%',
  },
  deliveryText: {
    color: 'black',
    fontSize: 10,
  },
});

export default SectionItem;

