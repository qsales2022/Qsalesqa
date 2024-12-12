/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { getHeight, getWidth } from "../../Theme/Constants";
import Colors from "../../Theme/Colors";
import images from "../../assets/Images";
import QuantityModal from "../../screens/Main/ProductDetails/QuantityModal";
import icons from "../../assets/icons";
import {
  useGetProductImages,
  useRemoveFromCart,
  useUpdateQuantity,
} from "../../Api/hooks";
import { useNavigation } from "@react-navigation/native";
import screens from "../../Navigation/screens";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../Utils";

interface CartItemInterFace {
  product: any;
  checkoutId: any;
  removedCallBack(): any;
  updateCallBack(): any;
}
const CartItem: FC<CartItemInterFace> = ({
  product = {},
  checkoutId,
  removedCallBack,
  updateCallBack,
}) => {
  const { id: selectedVariantId, product: productDetails } = product?.merchandise;
  const { edges: variants } = productDetails?.variants;
  let selectedVariant = variants?.find( 
    (item: any) => item?.node?.id === selectedVariantId
  );
  console.log(selectedVariant, "VARIENT_SELECTED");
  const [quantityModal, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(product?.quantity);
  const [checked, setChecked] = useState(product?.isChecked);

  const { removeCartData, removeFromCart }: any = useRemoveFromCart();
  const { updateQuantityData, updateQuantity }: any = useUpdateQuantity();
  const { t } = useTranslation();

  const navigation = useNavigation();

  useEffect(() => {
    console.log("PRODUCT:===", product?.merchandise?.product?.variants?.edges
      );
  }, []);

  useEffect(() => {
    // Update the modal value when quantity changes, to appear latest value first time
    setModalOpen((prevModalState: any) => ({
      ...prevModalState,
      value: quantity,
    }));
  }, [quantity]);

  useEffect(() => {
    updateCallBack();
  }, [updateQuantityData]);

  useEffect(() => {
    console.log(product?.merchandise?.selectedOptions, "TEST====");
    // console.log(product?.quantity,'price cart');
    
    // Update the quanty value when quantity changes, to appear latest value first time
    if (product) {
      setQuantity(product?.quantity);
    }
  }, [product]);

  useEffect(() => {
    if (removeCartData) {
      removedCallBack();
    }
  }, [removeCartData]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(screens.productDetails, {
            id: product?.merchandise?.product?.id,
            handle: product?.merchandise?.product?.handle,
            selectedVariantId: selectedVariantId,
          });
        }}
        style={{
          maxHeight: "70%",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Image
          resizeMode={"contain"}
          style={{
            height: "90%",
            width: getWidth(4),
            backgroundColor: "white",
            marginRight: 10,
          }}
          source={{
            uri: selectedVariant?.node?.image?.url,
          }}
        />

        <View>
          <Text
            style={{
              fontSize: getHeight(55),
              fontWeight: "500",
              maxWidth: getWidth(1.6),
              color: Colors.black,
              marginBottom: 6,
            }}
            numberOfLines={4}
          >
            {product?.merchandise?.product?.title}
          </Text>
          {/* <Text
            style={{
              fontSize: getHeight(60),
              maxWidth: getWidth(1.5),
              color: Colors.placeholderColor,
            }}
            numberOfLines={4}
          >
            {product?.variant?.product?.description}
          </Text> */}
          <View style={{ marginTop: 6 }}>
            <Text
              style={{
                fontSize: getHeight(60),
                color: Colors.primary,
                fontWeight: "500",
              }}
              numberOfLines={1}
            >
              {selectedVariant?.node?.title == "Default Title"
                ? ""
                : product?.merchandise?.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: getHeight(55),
              color: Colors.black,

              alignSelf: "flex-start",
              fontWeight: "400",
            }}
          >
            {product?.merchandise?.price?.currencyCode}{" "}
            {formatPrice(Number(product?.merchandise?.price?.amount))}
          </Text>
        </View>

        <Text
          style={{
            fontSize: getHeight(70),
            color: "grey",
            alignSelf: "center",
            fontWeight: "400",
            flex: 0.5,
          }}
        >
          X
        </Text>
        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={[styles.quantitySelector, { flex: 1, alignSelf: "center" }]}
        >
          <Text
            style={{
              fontSize: getHeight(55),
              flex: 2,
              color: Colors.black,
            }}
          >
            {" "}
            {quantity}
          </Text>
          <Image
            style={{ height: "50%", width: "50%" }}
            source={images.arrowDown}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => removeFromCart(checkoutId, product?.id)}
          style={{
            flexDirection: "row",
            flex: 1,
            alignSelf: "flex-end",
            justifyContent: "flex-end",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Image
            style={{ height: getHeight(30), width: getHeight(30) }}
            source={icons.trash_icon}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "#E2CEDD",
          marginTop: 16,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            flex: 1,
            alignSelf: "center",
            fontWeight: "400",
            color: "grey",
          }}
        >
          {t("totalPrice")}
        </Text>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View style={{ alignSelf: "center", marginLeft: 6, marginRight: 6 }}>
            {product?.discountAllocations?.length > 0 && (
              <Text
                style={{
                  color: "grey",
                  alignSelf: "center",
                  fontSize: 14,
                  textDecorationLine: "line-through",
                }}
              >
                {formatPrice(
                  Number(product?.merchandise?.price?.amount * product?.quantity)
                )}{" "}
                {product?.discountAllocations[0].discountedAmount?.currencyCode}
              </Text>
            )}
          </View>
          {product?.discountAllocations?.length > 0 ? (
            <Text style={{ color: Colors.black, fontWeight: "600" }}>
              {formatPrice(
                Number(
                  product?.merchandise?.price?.amount * product?.quantity -
                    product?.discountAllocations[0]?.discountedAmount?.amount
                )
              )}{" "}
              {product?.merchandise?.price?.currencyCode}
            </Text>
          ) : (
            <Text style={{ color: Colors.black, fontWeight: "600" }}>
              {formatPrice(
                Number(product?.merchandise?.price?.amount * product?.quantity)
              )}{" "}
              {product?.merchandise?.price?.currencyCode}
            </Text>
          )}
        </View>
      </View>

      {/* <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "#E2CEDD",
          marginTop: 8,
        }}
      /> */}
      <QuantityModal
        maxValue={selectedVariant?.node?.quantityAvailable}
        onSubmit={(value: any) => {
          setQuantity(value);
          setModalOpen(false);
          updateQuantity(product?.id, value);
        }}
        onClose={() => {
          setQuantity(product?.quantity);
          setModalOpen(false);
        }}
        isOpen={quantityModal}
        value={quantity}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    width: getWidth(1),
    alignSelf: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "5%",
    borderBottomWidth: 2,
    borderColor: Colors.transparentBlack,
    paddingBottom: 8,
  },
  quantitySelector: {
    // left: getHeight(55),
    backgroundColor: "#FDF5FF",
    height: getHeight(30),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2CEDD",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    alignSelf: "center",
    paddingRight: 4,
  },
  typeContainer: {
    width: getWidth(5),
    // backgroundColor: "#FDF5FF",
    height: getHeight(30),
    //  borderRadius: 10,
    //borderWidth: 1,
    // borderColor: "#E2CEDD",
    // flexDirection: "row",
    // alignItems: "center",
    // paddingLeft: 4,
    // paddingRight: 4,
    justifyContent: "center",
    marginBottom: 10,
  },
});
export default CartItem;
