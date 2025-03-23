import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../../Theme/Constants";
import OfferItem from "../OfferItem/OfferItem";
import { useNavigation } from "@react-navigation/native";
import screens from "../../Navigation/screens";

const OfferView = ({ data, onPress }: any) => {
  
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity style={styles.container}
    onPress={() => {
      if(data[0]?.handle_type === "product"){
        navigation.navigate(screens.productDetails, {
          handle:data[0]?.target_handle,
        });
      }else{
        navigation.navigate(screens.productList, {
          handle:data[0]?.target_handle,
          title: data[0]?.handle_name,
          category:data[0]?.target_handle,
        });
      }
      
    }}
    >
      
      <Image 
      source={{uri:data[0]?.image_url}}
      resizeMode="contain"
      style={{minWidth:getWidth(1),height:'100%',marginTop:getHeight(50)}}
      />
    </TouchableOpacity>
  );
};

export default OfferView;

const styles = StyleSheet.create({
  container: {
    height: getHeight(7),
    // backgroundColor:'red'
  },
});
