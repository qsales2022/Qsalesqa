/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import Colors from "../../Theme/Colors";
import LinearGradient from "react-native-linear-gradient";
import { getHeight, getWidth } from "../../Theme/Constants";
import images from "../../assets/Images";
import SvgIcon from "../../assets/SvgIcon";
interface OfferInterface {
  name: string;
  image: any;
  price: string;
  star?: number;
  onPress: any;
}
const OfferItem: FC<OfferInterface> = ({
  name = "",
  price = "",
  star = null,
  image = "",
  onPress,
}) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <LinearGradient
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.5 }}
        colors={["#B22E76", "#832253"]}
        style={styles.container}
      >
        <View style={{ flex: 1, borderRadius: 8 }}>
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 8,
            }}
            source={image}
          />
        </View>
        <View style={{ flex: 4, padding: 5 }}>
          <Text numberOfLines={1} style={styles.nameTxt}>
            {name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ImageBackground
              resizeMode="contain"
              style={{
                // width: getHeight(12),
                height: getHeight(20),
                justifyContent: "center",
                alignItems: "center",
              }}
              source={images.PriceTag}
            >
              <Text numberOfLines={1} style={{ fontSize: getHeight(75) }}>
                QAR {Math.floor(Number(price))}
              </Text>
            </ImageBackground>
            <View
              style={{
                height: getHeight(22),
                width: getWidth(5),
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {/* {stars ? (
              <>
                {stars.map((item, index) => {
                  console.log(item);
                  return (
                    <SvgIcon.Star
                      key={item.toString()}
                      fill={star && star > index ? '#EBD98A' : '#E276B1'}
                      width={getWidth(25)}
                      height={getHeight(65)}
                    />
                  );
                })}
              </>
            ) : null} */}
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default OfferItem;

const styles = StyleSheet.create({
  container: {
    width: 312,
    backgroundColor: Colors.primary,
    height: "100%",
    marginLeft: 10,
    borderRadius: 14,
    padding: 6,
    flexDirection: "row",
  },
  nameTxt: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: getHeight(65),
  },
});
