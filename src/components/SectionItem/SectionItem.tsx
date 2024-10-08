import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { getHeight, getWidth } from "../../Theme/Constants";
import Colors from "../../Theme/Colors";
import { formatPrice } from "../../Utils";
import FastImage from "react-native-fast-image";

interface ItemInterface {
  name: string;
  price: string;
  image: any;
  onPress?: any;
  marginLeft?: number;
  page: string;
  offerPrice:string;

}
const SectionItem: FC<ItemInterface> = ({
  name = "",
  price = "",
  image = "",
  onPress,
  page,
  offerPrice=""

}) => {
  const dynamicContainerStyle = {
    height: page === "home" ? getHeight(6) : getHeight(4.5),
    width: page === "home" ? getHeight(6) : "100%",
    marginTop: page === "home" ? getWidth(80) : undefined,
  };
  const Price = formatPrice(Number(price));

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        width: page === "home" ? getWidth(2.5) : getWidth(2.2),
        marginLeft: page === "home" ? getHeight(86) : getHeight(86),
        paddingBottom: page === "home" ? getHeight(45) : getHeight(45),
        // backgroundColor:'red',
        marginTop: getHeight(80),
        display: "flex",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#F0F2F5",
        borderRadius: 8,
        height: page === "home" ? getHeight(3) : getHeight(2.6),
      }}
    >
      <View style={dynamicContainerStyle}>
        <View style={[styles.imageContainer]}>
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={image}
          />
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={[styles.nameText]}
        >
          {name}
        </Text>
        <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Text style={styles.priceTextQar}>QAR</Text>
          <Text style={[styles.priceText, { color: "black" }]}>
            {formatPrice(Number(price))}
          </Text>
          {offerPrice !=="" && <Text style={styles.offerQar}>QAR {formatPrice(Number(offerPrice))}</Text>}

        </View>
        {Number(Price) >= 35 ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 6,
              marginTop: getHeight(90),
              height: getHeight(20),
            }}
          >
            <Image
              source={require("../../assets/Images/van.png")}
              style={{ width: page == "home" ? "15%" : "11%", height: "25%" }}
            />
            <Text style={{ color: "black", fontSize: 10 }}>FREE DELIVERY</Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SectionItem;

const styles = StyleSheet.create({
  imageContainer: {
    // height: getHeight(6),
    // width: getHeight(6),
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 8,
    // marginTop:getWidth(80)
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  nameText: {
    fontSize: 15,
    marginTop: getHeight(85),
    fontWeight: "400",
    color: Colors.black,
    fontFamily: "Helvetica",
    letterSpacing: 0.5,
  },
  priceText: {
    fontSize: getHeight(48),
    marginTop: getHeight(200),
    fontWeight: "700",
    color: Colors.black,
    fontFamily: "Helvetica",
  },
  priceTextQar: {
    fontSize: getHeight(50),
    marginTop: getHeight(200),
    fontWeight: "400",
    color: Colors.black,
  },
  offerPrice: {
    fontSize: getHeight(80),
    marginTop: getHeight(80),
    fontWeight:"bold",
    color: Colors.primary,
    textDecorationLine: 'line-through', // Strikethrough line

  },
  offerQar: {
    fontSize: getHeight(80),
    marginTop: getHeight(80),
    fontWeight:"bold",
    color: Colors.primary,
    textDecorationLine: 'line-through', // Strikethrough line

  },
});
