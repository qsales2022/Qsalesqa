/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import Colors from '../../../Theme/Colors';
import {getHeight, getWidth} from '../../../Theme/Constants';
import Translation from '../../../assets/i18n/Translation';
import icons from '../../../assets/icons';
import strings from '../../../assets/i18n/strings';
import i18next, {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../../redux/reducers/AuthReducer';
import {RootState} from '../../../redux/store';
import SvgIcon from '../../../assets/SvgIcon';
import useSearch from '../../../Api/hooks/useSearch';
import SectionItem from '../../../components/SectionItem/SectionItem';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../Navigation/screens';
import {AppEventsLogger} from 'react-native-fbsdk-next';

const Search = ({route, navigation}: any) => {
  const {language} = useSelector((state: RootState) => state.AuthReducer);

  const dispatch = useDispatch();
  const [selectedLanguage, setLanguage] = useState(language);
  const {searchDetails, searchProduct, loading} = useSearch();
  const [sreachText, setSearchText] = useState('');
  useEffect(() => {
    if (searchDetails == null) {
      searchProduct('');
    }
    console.log(searchDetails, 'dddddd');
  }, [searchDetails]);
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.transparentBlack,

        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            height: getHeight(12),
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.primary,
            flexDirection: 'row',
          }}>
          <View
            style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
            <View
              style={{
                paddingLeft: 16,
                paddingTop: 16,
                paddingBottom: 16,
                alignSelf: 'center',
              }}>
              {loading ? (
                <ActivityIndicator size={getHeight(35)} color={Colors.black} />
              ) : (
                <SvgIcon.SearchIcon height={getHeight(35)} />
              )}
            </View>
            <TextInput
              onChangeText={text => {
                setSearchText(text);
                searchProduct(text);
              }}
              placeholder={`${t('search')}`}
              placeholderTextColor={'grey'}
              style={{
                flex: 1,
                height: '100%',
                paddingLeft: 10,
                color: Colors.black,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
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
        </View>

        <FlatList
          style={{paddingTop: 16, paddingBottom: 16}}
          data={searchDetails}
          numColumns={2}
          ListEmptyComponent={() => {
            return (
              <>
                {searchDetails != null && (
                  <View
                    style={{height: getHeight(1.2), justifyContent: 'center'}}>
                    <View
                      style={{
                        justifyContent: 'center',
                        width: getHeight(10),
                        alignSelf: 'center',
                      }}>
                      <View style={{left: getHeight(15)}}>
                        <SvgIcon.EmptyCartTwo
                          width={getHeight(10)}
                          height={getHeight(10)}
                        />
                      </View>
                      <SvgIcon.SearchEmptyIcon
                        width={getHeight(10)}
                        height={getHeight(10)}
                      />
                    </View>
                    <Text
                      style={{
                        color: Colors.black,
                        alignSelf: 'center',
                        fontSize: getHeight(40),
                        fontWeight: '600',
                        marginTop: 10,
                      }}>
                      Oops! No result found
                    </Text>
                    <Text
                      style={{
                        color: Colors.black,
                        alignSelf: 'center',
                        fontSize: getHeight(50),
                        fontWeight: '400',
                        width: getWidth(1.5),
                        marginTop: 10,
                        textAlign: 'center',
                      }}>
                      Don't worry, try searching something else
                    </Text>
                  </View>
                )}
              </>
            );
          }}
          renderItem={({item, index}: any) => {
            return (
              <SectionItem
                key={index}
                onPress={() => {
                  navigation.navigate(screens.productDetails, {
                    id: item?.node?.id,
                    handle: item?.node?.handle,
                  });
                }}
                marginLeft={25}
                price={item?.node?.priceRange?.minVariantPrice?.amount}
                image={{uri: item?.node?.images?.edges[0]?.node?.url}}
                name={item?.node?.title}
                page={`${sreachText}|search|${item?.node?.collections.edges?.[0]?.node?.title}`}
              />
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sortFilterContainer: {
    position: 'absolute',
    bottom: getHeight(6),
    minHeight: getHeight(16),
    backgroundColor: Colors.primary,
    width: getWidth(1.5),
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFilter: {
    color: Colors.white,
    fontWeight: '500',
    marginLeft: 10,
    fontSize: getHeight(55),
  },
  borderLine: {
    borderRightWidth: 1,
    height: '60%',
    borderRightColor: Colors.white,
  },
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingRight: getHeight(45),
    paddingBottom: getHeight(4),

    // alignSelf: 'center',
  },
});
export default Search;
