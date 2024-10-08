import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getHeight} from '../../Theme/Constants';
import Colors from '../../Theme/Colors';
import strings from '../../assets/i18n/strings';
import SvgIcon from '../../assets/SvgIcon';
import Translation from '../../assets/i18n/Translation';

const BannerStrip = () => {
  const bannerItems = [
    {
      id: 1,
      title: strings.bestQuality,
      sub: strings.products,
      icon: SvgIcon.BannerStar,
    },
    {
      id: 2,
      title: strings.freeShipping,
      sub: strings.forOrder,
      subPlus: ' QAR 35',
      icon: SvgIcon.BannerTruck,
    },
    {
      id: 3,
      title: strings?.easyReturns,
      sub: strings.exchanges,
      icon: SvgIcon.BannerReturn,
    },
  ];
  return (
    <View style={styles.bannerContainer}>
      {bannerItems.map((item: any, index: number) => {
        let Icon = item.icon;
        return (
          <View key={index} style={styles.bannerItem}>
            <Icon width={getHeight(30)} height={getHeight(12)} />
            <Text style={styles.bannerMainTxt}>
              <Translation textKey={item?.title} />
              <Text>{'\n'}</Text>
              <Text style={styles.bannerSubTxt}>
                <Translation textKey={item?.sub} />
                {item?.subPlus ? item?.subPlus : ''}
              </Text>
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default BannerStrip;

const styles = StyleSheet.create({
  bannerContainer: {
    height: getHeight(15),
    marginTop: getHeight(55),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.lightPink,
    flexDirection: 'row',
    paddingRight: 10,
  },
  bannerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  bannerMainTxt: {
    fontSize: getHeight(75),
    marginLeft: getHeight(96),
    fontWeight: '600',
    color: Colors.black,
  },
  bannerSubTxt: {
    fontWeight: '400',
  },
});
