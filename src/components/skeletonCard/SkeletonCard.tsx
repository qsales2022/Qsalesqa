import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { getHeight, getWidth } from "../../Theme/Constants";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

type SkeletonExploreProps = {
  chaildVieWidth: number;
  childViewHeight: number;
  data: number[];
  containerMarginTop:number
  ContainerHeight:number
};

const SkeletonCard: React.FC<SkeletonExploreProps> = ({
  data,
  chaildVieWidth,
  childViewHeight,
  containerMarginTop,
  ContainerHeight
}) => {
  return (
    <>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, i }: any) => {
          return (
            <View
              style={{
                // width: getWidth(4),
                marginTop: getHeight(containerMarginTop),
                height: getHeight(ContainerHeight),
                marginLeft: 10,
              }}
            >
              <ShimmerPlaceholder
                style={{
                  width: getWidth(chaildVieWidth),
                  height: getHeight(childViewHeight),
                  backgroundColor: "gray",
                  borderRadius: 10,
                }}
              ></ShimmerPlaceholder>
            </View>
          );
        }}
      />
    </>
  );
};

export default SkeletonCard;


