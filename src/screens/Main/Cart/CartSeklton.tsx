import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../../../Theme/Constants";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

export default function CartSeklton() {
  return (
    <FlatList
      data={[12, 45, 66,3,4,55]}
      renderItem={({ item, index }: any) => {
        return (
          <View style={{ width: "100%" }}>
            <View style={styles.container}>
              <ShimmerPlaceholder style={styles.productContainer}></ShimmerPlaceholder>
              <ShimmerPlaceholder style={styles.productName}></ShimmerPlaceholder>
            </View>
            <View style={styles.priceContainer}>
              <ShimmerPlaceholder style={styles.PriceChilders}></ShimmerPlaceholder>
              <ShimmerPlaceholder style={styles.PriceChilders}></ShimmerPlaceholder>
              <ShimmerPlaceholder style={styles.PriceChilders}></ShimmerPlaceholder>
            </View>
          </View>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: getHeight(80),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: getHeight(70),
  },
  productContainer: {
    width: getWidth(6),
    height: getHeight(10),
    backgroundColor: "gray",
    borderRadius:10
  },
  productName: {
    width: getWidth(1.6),
    height: getHeight(12),
    backgroundColor: "gray",
  },
  priceContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop:getHeight(90)
  },
  PriceChilders: {
    backgroundColor: "gray",
    height: getHeight(80),
    width: getWidth(6),
  },
});
