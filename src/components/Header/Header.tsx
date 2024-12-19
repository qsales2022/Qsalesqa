import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {getHeight, getWidth, lightenColor} from '../../Theme/Constants';
import CommonStyles from '../../Theme/CommonStyles';
import SvgIcon from '../../assets/SvgIcon';
import Colors from '../../Theme/Colors';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Translation from '../../assets/i18n/Translation';
import screens from '../../Navigation/screens';
import {useTranslation} from 'react-i18next';
interface HeaderInterface {
  title?: string;
  cartCount?: number;
  onSearch?: any;
  searchValue?: any;
  onCloseSearch?: any;
  hideSearch?: boolean;
  hideCart?: boolean;
  page?: string;
  pageNavigation?: string;
  track?: boolean;
  orderOpen?: () => void;
}
const Header: FC<HeaderInterface> = ({
  title = '',
  cartCount = 0,
  onSearch,
  searchValue,
  onCloseSearch,
  hideSearch,
  hideCart,
  page = '',
  pageNavigation = '',
  track = false,
  orderOpen,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isSearch, setIsSearch] = useState(false);

  const {t} = useTranslation();
  return hideSearch ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          try {
            console.log(
              'pageNavigation:',
              (page === 'details' && pageNavigation === '') || page === 'list',
            ); // Log page navigation

            if (
              (page === 'details' && pageNavigation === '') ||
              page === 'list'
            ) {
              console.log('Navigating to MAIN');
              navigation.push('MAIN');
            } else {
              console.log('Going back');
              if (navigation.canGoBack()) {
                navigation.goBack(); // Only go back if it's possible
              } else {
                console.warn('No screens to go back to.');
              }
            }
          } catch (error) {
            console.error('Error in navigation:', error); // Log any errors
          }
        }}
        style={[CommonStyles.containerFlex1, CommonStyles.centerContainer]}>
        <SvgIcon.BackArrow
          width={getWidth(12)}
          height={getWidth(12)}
          fill={Colors.black}
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {title ? (
          <>
            <Text numberOfLines={1} style={styles.title}>
              <Translation textKey={title} />
            </Text>
            {/* <SvgIcon.AwesomeStar /> */}
          </>
        ) : null}
      </View>
      {track && (
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: getHeight(80),
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 23,
              backgroundColor: lightenColor(Colors.primary, 0),
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => orderOpen?.()}>
            <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
              Track
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!hideCart && (
        <View
          style={[CommonStyles.containerFlex1, CommonStyles.centerContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate(screens.cart)}>
            <View style={styles.container2}>
              <SvgIcon.CartIcon width={getHeight(28)} height={getHeight(28)} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[CommonStyles.containerFlex1, CommonStyles.centerContainer]}>
        <SvgIcon.BackArrow
          width={getWidth(12)}
          height={getWidth(12)}
          fill={Colors.black}
        />
      </TouchableOpacity>

      {!isSearch && (
        <View style={styles.titleContainer}>
          {title ? (
            <>
              <Text numberOfLines={1} style={styles.title}>
                <Translation textKey={title} />
              </Text>
              {/* <SvgIcon.AwesomeStar /> */}
            </>
          ) : null}
        </View>
      )}
      {isSearch && (
        <View
          style={{
            flex: 6,
            flexDirection: 'row',
            backgroundColor: Colors.borderGray,

            alignSelf: 'center',
            borderRadius: 18,
            justifyContent: 'center',
          }}>
          <View style={{alignSelf: 'center', padding: 6}}>
            <SvgIcon.SearchIcon height={getHeight(35)} />
          </View>

          <TextInput
            style={{flex: 1, color: Colors.black}}
            placeholderTextColor={'grey'}
            placeholder={`${t('search')}`}
            onChangeText={text => {
              onSearch(text);
            }}
            value={searchValue}
          />

          <TouchableOpacity
            style={{alignSelf: 'center', padding: 6}}
            onPress={() => {
              setIsSearch(false);
              onCloseSearch();
            }}>
            <SvgIcon.CloseIcon height={getHeight(35)} />
          </TouchableOpacity>
        </View>
      )}

      {!isSearch && (
        <TouchableOpacity onPress={() => setIsSearch(true)}>
          <View
            style={[CommonStyles.containerFlex1, CommonStyles.centerContainer]}>
            <SvgIcon.SearchIcon height={getHeight(35)} />
          </View>
        </TouchableOpacity>
      )}
      {!hideCart && (
        <View
          style={[CommonStyles.containerFlex1, CommonStyles.centerContainer]}>
          <TouchableOpacity onPress={() => navigation.navigate(screens.cart)}>
            <View style={styles.container2}>
              <SvgIcon.CartIcon width={getHeight(28)} height={getHeight(28)} />
              {cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: getHeight(15),
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    top: '2%',
  },
  container2: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'black',
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9,
  },
  titleContainer: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  title: {
    fontSize: getHeight(45),
    fontWeight: '500',
    marginRight: getHeight(95),
    color: Colors.black,
    maxWidth: '90%',
  },
});
