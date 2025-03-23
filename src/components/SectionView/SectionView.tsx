import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import {getHeight, getWidth} from '../../Theme/Constants';
import SvgIcon from '../../assets/SvgIcon';
import Colors from '../../Theme/Colors';
import SectionItem from '../SectionItem/SectionItem';
import Translation from '../../assets/i18n/Translation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

import screens from '../../Navigation/screens';
import {t} from 'i18next';

interface SectionViewInterface {
  title: string;
  items: any[];
  viewAllPress: any;
  page: string;
  offerList: {};
}
const SectionView: FC<SectionViewInterface> = memo(
  ({title = 'Best offers', items = [], viewAllPress, page, offerList}) => {
    const navigation =
      useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
      <>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <View style={styles.titleView}>
              <Text style={styles.title}>
                <Translation textKey={title} />
              </Text>
              <SvgIcon.AwesomeStar />
            </View>
            {title != t('youMayAlosLike') && (
              <TouchableOpacity
                onPress={() => {
                  viewAllPress();
                }}
                style={[
                  styles.viewAll,
                  {flexDirection: 'row', justifyContent: 'flex-end'},
                ]}>
                <Text style={styles.viewTxt}>
                  <Translation textKey={'viewAll'} />
                </Text>
                <Text style={styles.viewTxt}>{' >>'}</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: getHeight(45),
              // marginBottom: getHeight(45),
            }}
            data={items?.length > 0 ? items : [1, 2, 3]}
            // ListEmptyComponent={categorySkeleton}
            horizontal={true}
            removeClippedSubviews={true}
            renderItem={({item, index}: any) => {
              return (
                <>
                  {items?.length > 0 ? (
                    <SectionItem
                      key={index.toString()}
                      onPress={() =>
                        navigation.navigate(screens.productDetails, {
                          id:
                            title == t('youMayAlosLike')
                              ? item?.id
                              : item?.node?.id,
                          handle:
                            title == t('youMayAlosLike')
                              ? item?.handle
                              : item?.node?.handle,
                        })
                      }
                      price={
                        title == t('youMayAlosLike')
                          ? item?.priceRange?.minVariantPrice?.amount
                          : item?.node?.priceRange?.minVariantPrice?.amount
                      }
                      image={{
                        uri:
                          title == t('youMayAlosLike')
                            ? item?.images?.edges[0]?.node?.url
                            : item?.node?.images?.edges[0]?.node?.url,
                      }}
                      name={
                        title == t('youMayAlosLike')
                          ? item?.title
                          : item?.node?.title
                      }
                      page={page}
                      offerPrice={
                        item?.node?.variants?.edges[0].node.compareAtPrice
                          ?.amount
                      }
                      offerList={offerList}
                    />
                  ) : (
                    <ShimmerPlaceholder
                      style={{
                        backgroundColor: 'red',
                        width: getWidth(3.5),
                        height: getHeight(4),
                        marginLeft: getWidth(21),
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <ShimmerPlaceholder
                        style={{
                          backgroundColor: 'green',
                          width: getWidth(6),
                          height: getHeight(10),
                          marginTop: getHeight(80),
                        }}></ShimmerPlaceholder>

                      <ShimmerPlaceholder
                        style={{
                          width: getWidth(4),
                          backgroundColor: 'black',
                          height: getHeight(200),
                          marginTop: getHeight(40),
                        }}></ShimmerPlaceholder>
                      {/* <Text
                          style={{
                            width: getWidth(4),
                            backgroundColor: "black",
                            height: getHeight(200),
                            marginTop: getHeight(10),
                          }}
                        ></Text> */}
                    </ShimmerPlaceholder>
                  )}
                </>
              );
            }}
          />
        </View>
      </>
    );
  },
);

export default SectionView;

const styles = StyleSheet.create({
  container: {
    minHeight: getHeight(4),
    marginTop: getHeight(45),
  },
  title: {
    fontSize: getHeight(45),
    marginRight: getHeight(80),
    fontWeight: '600',
    color: Colors.black,
  },
  titleContainer: {
    minHeight: getHeight(20),
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  titleView: {
    // backgroundColor: 'green',
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    flex: 1,
    alignItems: 'flex-end',
  },
  viewTxt: {
    color: Colors.primary,
    fontSize: getHeight(55),
    fontWeight: '500',
  },
});
