import React, { useState, useRef, useEffect, FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { getHeight, getWidth } from "../../Theme/Constants";
import icons from "../../assets/icons";
import Colors from "../../Theme/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useForgotPassword, useLogin } from "../../Api/hooks";
import { t } from "i18next";

interface BottomSheetInterFace {
  isVisible: boolean;
  onClose(): any;
  onApply(data: any): any;
}

const BottomSheetForgotPassword: FC<BottomSheetInterFace> = ({
  isVisible,
  onClose,
  onApply,
}) => {
  const translateY = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const { data, recoverPassword }: any = useForgotPassword();

  useEffect(() => {
    if (isVisible) {
      showBottomSheet();
    }
  }, [isVisible]);

  const showBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideBottomSheet = () => {
    Animated.timing(translateY, {
      toValue: Dimensions.get("window").height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const validateEmail = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForgotPassword = () => {
    if (validateEmail()) {
      recoverPassword(email)
    } else {
      if (!validateEmail()) {
        setIsEmailValid(false);
      }
    }
  };

  useEffect(() => {
    if (data) {
      onApply(data);
    }
  }, [data]);

  useEffect(() => {
    if (email) {
      setIsEmailValid(true);
    }
   
  }, [email]);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View
        style={{
          height: "100%",
          backgroundColor: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View style={{ borderBottomWidth: 1, flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              alignSelf: "center",
              padding: 16,
              color: "black",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {t("forgotPassword")}
          </Text>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Image
              style={{
                height: getHeight(55),
                width: getHeight(55),
              }}
              source={icons.close}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={{}}>
          <View>
            <View style={{ padding: 16, marginBottom: 25, marginTop: 25 }}>
              <TextInput
                placeholder={`${t("email")}`}
                placeholderTextColor={'grey'}
                onChangeText={setEmail}
                style={{
                  borderWidth: 0.5,
                  borderColor: "grey",
                  borderRadius: 16,
                  paddingLeft: 16,
                  paddingRight: 16,
                  height: 50,
                  color:Colors.black
                }}
              ></TextInput>
              {!isEmailValid && (
                <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                  {t("enterEmail")}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => validateForgotPassword()}
                style={{
                  backgroundColor: Colors.primary,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 24,
                  justifyContent: "center",
                  width: getWidth(1.5),
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "600",
                    alignSelf: "center",
                    fontSize: 16,
                  }}
                >
                  {t("recover")}
                </Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default BottomSheetForgotPassword;
