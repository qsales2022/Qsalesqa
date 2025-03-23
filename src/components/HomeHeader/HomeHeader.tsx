import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { getHeight } from '../../Theme/Constants';
import images from '../../assets/Images';
import SvgIcon from '../../assets/SvgIcon';
import Colors from '../../Theme/Colors';
import LanguageModel from '../LanguageModel/LanguageModel';
import SearchModal from '../../screens/Main/Home/Search';
import { useNavigation } from '@react-navigation/native';
import screens from '../../Navigation/screens';
import { useTranslation } from 'react-i18next';
const HomeHeader = () => {
  const [languageVisible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 2 }} 
      >
        <Image
          resizeMode="contain"
          style={styles.headerIcon}
          source={images.HeaderIcon}
        />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.navigate(screens.search)}>
          <TouchableOpacity onPress={() => navigation.navigate(screens.search)} style={styles.searchBox}>
            <SvgIcon.SearchIcon height={getHeight(35)} />
            <Text style={{ flex: 1, paddingLeft: 10, fontSize: 12, padding: 6, color: Colors.black }}>{`${t('search')}`}</Text>
            {/* <TextInput placeholderTextColor={'grey'} placeholder={`${t('search')}`} editable={false} style={{ flex: 1, paddingLeft: 10, fontSize: 12, padding: 6, color: Colors.black }} /> */}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationContainer}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.languageBtn}>
          <Text style={{ color: Colors.black }}>E/A</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(screens.notification)}>
          <SvgIcon.NotificationIcon width={getHeight(25)} height={getHeight(5)} />
        </TouchableOpacity>
      </View>
      <LanguageModel
        onClose={() => setVisible(false)}
        visible={languageVisible}
      />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: getHeight(16),
    backgroundColor: Colors.white,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5
  },
  headerIcon: { width: '100%', height: '100%' },
  notificationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageBtn: {
    width: '80%',
    height: '75%',
    backgroundColor: 'rgba(226, 206, 221, 0.3)',
    borderWidth: 1,
    borderColor: '#e2cedd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    width: '90%',
    backgroundColor: Colors.borderGray,
    borderRadius: 10,
    height: '90%',
    flexDirection: 'row',
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
