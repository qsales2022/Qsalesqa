import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, SectionItem } from "../../../components";
import { getHeight, getWidth } from "../../../Theme/Constants";
import Colors from "../../../Theme/Colors";
import screens from "../../../Navigation/screens";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import useMyOrder from "../../../Api/hooks/useMyOrder";
import { useIsFocused } from "@react-navigation/native";
import moment from 'moment';
import { t } from "i18next";
import { getLogin } from "../../../AsyncStorage/StorageUtil";
const MyOrderList = ({ route, navigation }: any) => {
  const { count } = useSelector((state: RootState) => state.CartReducer);
  const { orderList, getMyOrder } = useMyOrder();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(null);

  useEffect(() => {

    getLogin().then((value) => {
      console.log("TOKEN123", value)
      setToken(value)
    });

  }, [isFocused]);

  useEffect(() => {
    if (token) {
      getMyOrder(token)
    }

  }, [token]);


  return (
    <View style={{ backgroundColor: Colors.white }}>
      <Header
        title={`${t("orders")}`}
        cartCount={count}
        onSearch={null}
        searchValue={null}
        hideSearch={true}
        onCloseSearch={null}
        hideCart={true}
      />
      <FlatList
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={orderList}
        numColumns={2}
        renderItem={({ item, index }: any) => {
          console.log(JSON.stringify(item));

          return (
            <TouchableOpacity onPress={() => { navigation.navigate(screens.webView, { url: item?.node?.statusUrl, title: item?.node?.name }) }} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey', marginTop: 6 }}>
              <Image style={{ width: getWidth(4), height: getWidth(4) }} source={{ uri: item?.node?.lineItems?.nodes[0]?.variant?.image?.url }} />
              <View style={{ width: getWidth(1) - getWidth(4), paddingRight: 16, paddingBottom: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.primary, fontSize: 12, fontWeight: '600', flex: 1 }}>{item?.node?.name}</Text>
                  <Text style={{ color: Colors.black, fontSize: 12 }}>{moment(item?.node?.processedAt).format("MMMM DD YYYY")}</Text>
                </View>
                <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ color: Colors.black, fontSize: 14, marginTop: 6 }}>{item?.node?.lineItems?.nodes[0]?.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                  <Text style={{ color: Colors.primary, fontSize: 12 }}>{t('paymentStatus')}</Text>
                  <Text style={{ color: Colors.black, fontSize: 12 }}>{item?.node?.financialStatus}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.primary, fontSize: 12 }}>{t('fulfillmentStatus')}</Text>
                  <Text style={{ color: Colors.black, fontSize: 12 }}>{item?.node?.fulfillmentStatus}</Text>
                </View>

              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  sortFilterContainer: {
    position: "absolute",
    bottom: getHeight(6),
    minHeight: getHeight(16),
    backgroundColor: Colors.primary,
    width: getWidth(1.5),
    alignSelf: "center",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  textFilter: {
    color: Colors.white,
    fontWeight: "500",
    marginLeft: 10,
    fontSize: getHeight(55),
  },
  borderLine: {
    borderRightWidth: 1,
    height: "60%",
    borderRightColor: Colors.white,
  },
  listContainer: {
    minHeight: getHeight(1),
    marginTop: getHeight(45),
    paddingBottom: getHeight(4),

    // alignSelf: 'center',
  },
});
export default MyOrderList;
