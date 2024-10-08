/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Button,
  StyleSheet,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import Colors from "../../../Theme/Colors";
import { getHeight, getWidth } from "../../../Theme/Constants";
import { useIsFocused } from "@react-navigation/native";
import { t } from "i18next";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
interface NotifyMeModalInterface {
  isOpen: boolean;
  onClose(): void;
  onSubmit: any;
  onEmailChanged: any;
  email: string;
  phone: string;
  onPhoneChanged: any;
}
const NotifyMeModal: FC<NotifyMeModalInterface> = ({
  isOpen = false,
  onClose,
  onSubmit,
  onEmailChanged,
  email,
  phone,
  onPhoneChanged,
}) => {
  const [isKeyBoardOpen, setKeyBoardOpen] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      _keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      _keyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyBoardOpen(true);
  };

  const _keyboardDidHide = () => {
    setKeyBoardOpen(false);
  };

  return (
    <Modal visible={isOpen} onRequestClose={() => onClose()} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.transparentBlack,
          
        }}
      >
        <View
          style={{
            height: getHeight(3),
            width: "80%",
            borderRadius: 30,
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.white,
              borderTopLeftRadius:20,
              borderTopRightRadius:20,
              justifyContent:'center',
            }}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: getHeight(45),
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
             { ` ${t("notify_cap")} `}
             
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.backgroundGray,
              width: "85%",
              height: getHeight(15),
              alignSelf: "center",
              flexDirection: "row",
          
            }}
          >
            <TextInput
              editable={false}
              value={"+974"}
              style={{
                fontSize: 16,
                height: getHeight(15),
                padding: 5,
                alignSelf: "center",
                color:Colors.black
              }}
            />
            <TextInput
              placeholder={"Whatsapp Number"}
              placeholderTextColor={'grey'}
              onChangeText={(text) => onPhoneChanged(text)}
              value={phone}
              keyboardType={"number-pad"}
              style={{
                fontSize: 16,
                height: getHeight(15),
                padding: 5,
                alignSelf: "center",
                flex: 1,
                color:Colors.black
              }}
            />
          </View>
          <Text
            style={{
              color: Colors.black,
              fontSize: 14,
              fontWeight: "300",
              alignSelf: "center",
              marginTop: 3,
              width: "85%",
            }}
          >
           {`${t("notify_msg")}`}
          </Text>
         
          <View
            style={{
              height: getHeight(15),
              marginTop: 28,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={{
                width: "50%",
                backgroundColor: Colors.primary,
                borderBottomLeftRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: getHeight(45), color: Colors.white }}>
              { ` ${t("cancel")} `}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                width: "50%",
                backgroundColor: Colors.green,
                borderBottomRightRadius: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: getHeight(45), color: Colors.white }}>
               { ` ${t("notify_me")} `}
            
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default NotifyMeModal;
