import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {getHeight, getWidth} from '../../Theme/Constants';
import Colors from '../../Theme/Colors';
import images from '../../assets/Images';
interface ItemInterface {
  name: string;
  image: any;
  onPress: any;
}
const CategoryItem: FC<ItemInterface> = ({name = '', image = '', onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        width: getWidth(2.2),
        marginLeft: getHeight(86),
        paddingBottom: getHeight(45),
      }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode={image ? 'cover' : 'contain'}
          source={image ? {uri: image} : images.splash_logo}
        />
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  imageContainer: {
    height: getHeight(4),
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.lightPink,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: getHeight(65),
    marginTop: getHeight(85),
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.black,
  },
});
