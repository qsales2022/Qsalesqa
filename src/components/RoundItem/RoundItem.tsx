import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { getHeight, getWidth } from "../../Theme/Constants";
import Colors from "../../Theme/Colors";
interface RoundItemInterface {
  label: string;
  icon: any;
  onPress: any;
}
const RoundItem: FC<RoundItemInterface> = ({
  label = "",
  icon = "",
  onPress,
}) => {
  return (
    <View >
      <TouchableOpacity onPress={() => onPress()} style={styles.mainContainer}>
        <View style={styles.container}>
          <Image resizeMode={"cover"} style={styles.icon} source={icon} />
        </View>
      </TouchableOpacity>
      <Text style={styles.labelTxt}>{label}</Text>
    </View>
  );
};

export default RoundItem;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    paddingTop: getHeight(40),
    display: "flex",
    // backgroundColor: "red",
  },
  container: {
    // borderWidth: 1,
    // backgroundColor:'red',
    borderColor: "#E2CEDD",
    borderRadius: 100,
    marginLeft: 20,
    // marginRight:20,
    height: getHeight(14),
    // backgroundColor: '#FDF5FF',
    width: getHeight(14),
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: getHeight(8.5),
    width: getHeight(8.5),
    borderRadius: getHeight(8.5) / 2,
  },
  labelTxt: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "600",
    width: getWidth(3.5),
    fontSize: getWidth(29),
    marginTop:getHeight(35)
  },
});
