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
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import Colors from "../../../Theme/Colors";
import { getHeight, getWidth } from "../../../Theme/Constants";
import Translation from "../../../assets/i18n/Translation";
import icons from "../../../assets/icons";
import strings from "../../../assets/i18n/strings";
import i18next, { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage } from "../../../redux/reducers/AuthReducer";
import { RootState } from "../../../redux/store";
import SvgIcon from "../../../assets/SvgIcon";
import useSearch from "../../../Api/hooks/useSearch";
import SectionItem from "../../../components/SectionItem/SectionItem";
import { useNavigation } from "@react-navigation/native";
import screens from "../../../Navigation/screens";
import { Header } from "../../../components";
import useGetNotifications from "../../../Api/hooks/useGetNotifications";
import { AppEventsLogger } from "react-native-fbsdk-next";

const Notifications = ({ route, navigation }: any) => {
  const { data, fetchNotifications }: any = useGetNotifications();
  
  useEffect(() => {

    fetchNotifications();

  }, []);
  useEffect(() => {
    const screenName =
      navigation.getState().routes[navigation.getState().index]?.name;
    AppEventsLogger.logEvent('fb_mobile_content_view', {
      content_name: screenName,
      content_type: 'screen',
    });
  }, []);

  const formattedDate = (timestamp: any) => {

    const date = new Date(timestamp);

    const formattedDate = date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return formattedDate;
  }
  return (
    <View
      style={styles.container}
    >
      <Header
        title={`${t("notification")}`}
        hideSearch={true}
        hideCart={true}
      />
      <FlatList
        data={data}
        contentContainerStyle={{ marginTop: 24 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={{ padding: 16 }} onPress={() => {
              if (item?.action_to == "PRODUCT") {
                navigation.navigate(screens.productDetails, {
                  handle: item?.action_handle,
                });
              } else if (item?.action_to == "COLLECTION") {
                navigation.navigate(screens.productList, {
                  title: item?.action_handle.replace("-", " "),
                  category: item?.action_handle,
                });
              }
            }}>
              <Image source={{uri:'https://qsales.hexwhale.com/api/notifications/42d7a8c5-3755-4276-b5be-8deb20d90204.jpeg'}} width={30} height={30}  />
              <Text style={{ fontSize: 12, color: Colors.iconGray, alignSelf: 'flex-end', marginBottom: 6 }}>{formattedDate(item?.created_at)}</Text>
              <Text style={{ fontSize: 16, color: Colors.primary, fontWeight: 'bold' }}>{item?.title}</Text>
              <Text style={{ fontSize: 13, color: Colors.black, marginBottom: 16 }}>{item?.body}</Text>
              <View style={{ height: 2, backgroundColor: Colors.borderGray }} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Notifications;
