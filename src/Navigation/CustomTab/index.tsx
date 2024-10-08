import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getHeight } from "../../Theme/Constants";
import Colors from "../../Theme/Colors";
import SvgIcon from "../../assets/SvgIcon";
import screens from "../screens";
import strings from "../../assets/i18n/strings";
import Translation from "../../assets/i18n/Translation";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateSelectedTab } from "../../redux/reducers/GlobalReducer";

interface CartIconWithBadgeProps {
  cartCount: number;
}

const CustomTab: React.FC<CartIconWithBadgeProps> = ({ cartCount }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { selectedTab } = useSelector(
    (state: RootState) => state.globalReducer
  );
  const menus = [
    {
      id: 1,
      label: strings.home,
      screen: screens.home,
      icon: SvgIcon.HomeIcon,
      showBadge: false,
    },
    {
      id: 2,
      screen: screens.explore,
      label: strings.explore,
      icon: SvgIcon.ExploreIcon,
      showBadge: false,
    },
    // {
    //   id: 3,
    //   screen: "message",
    //   label: strings.message,
    //   icon: SvgIcon.MessageIcon,
    //   showBadge: false,
    // },
    {
      id: 4,
      screen: screens.cart,
      label: strings.cart,
      icon: SvgIcon.CartIcon,
      showBadge: true,
    },
    {
      id: 5,
      screen: screens.account,
      label: strings.account,
      icon: SvgIcon.AccountIcon,
      showBadge: false,
    },
  ];
  const openWhatsApp = async () => {
    const whatsappLink =
      "https://api.whatsapp.com/send?phone=+97470119277&text=Hai";

    // Check if WhatsApp is available on the device.
    const canOpenWhatsApp = await Linking.canOpenURL(whatsappLink);
    if (!canOpenWhatsApp) {
      Linking.openURL(whatsappLink)
        .then((data) => {
          console.log("WhatsApp opened: ", data);
        })
        .catch((error) => {
          console.error("Error opening WhatsApp: ", error);
        });
    } else {
      // Handle the case where WhatsApp is not available on the device.
      // console.log("WhatsApp is not available on this device.");
      // You can provide a fallback option here.
    }
  };
  useEffect(() => {
    // console.log(selectedTab, "TAb====");
  }, [selectedTab]);
  return (
    <View style={styles.container}>
      {menus.map((item: any, index: number) => {
        let Icon = item?.icon;
        console.log(
          index == selectedTab ? selectedTab : null,
          "INDEXXXXXXX",
          selectedTab
        );
        return (
          <TouchableOpacity
            onPress={() => {
              console.log(index, "INDEXx", item);

              if (item.screen) {
                if (item.screen === "message") {
                  openWhatsApp();
                } else {
                  dispatch(updateSelectedTab(index));
                  navigation.navigate(item?.screen);
                }
              }
            }}
            key={index}
            style={styles.bottomIconContainer}
          >
            {item.icon ? (
              item.showBadge ? (
                <View style={styles.container2}>
                  <Icon
                    // fill={
                    //   (index === selectedTab && index !== 2) ||
                    //   (selectedTab == 2 && index == 3)
                    //     ? Colors.primary
                    //     : Colors.iconGray
                    // }
                    fill={index === selectedTab ? Colors.primary : Colors.iconGray}
                    height={getHeight(28)}
                    width={getHeight(28)}
                  />
                  {cartCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                  )}
                </View>
              ) : (
                <Icon
                    // fill={
                    //   (index === selectedTab && index !== 2) ||
                    //   (selectedTab == 2 && index == 3)
                    //     ? Colors.primary
                    //     : Colors.iconGray
                    // }
                    fill={index === selectedTab ? Colors.primary : Colors.iconGray}
                  height={getHeight(28)}
                  width={getHeight(28)}
                />
              )
            ) : null}
            <Text
              style={[
                styles.menuTxt,
                {
                  color: index === selectedTab ? Colors.primary : Colors.iconGray
                  // (index === selectedTab && index !== 2) ||
                  // (selectedTab == 2 && index == 3)
                  //   ? Colors.primary
                  //   : Colors.black,
                },
              ]}
            >
              <Translation textKey={item.label} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: getHeight(15),
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.borderGray,
    backgroundColor: Colors.white,
  },
  bottomIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTxt: {
    fontSize: getHeight(65),
  },
  container2: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "black",
    borderRadius: 7,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 9,
  },
});
export default CustomTab;
