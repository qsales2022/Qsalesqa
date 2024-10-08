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
  SafeAreaView,
} from "react-native";
import { getHeight, getWidth } from "../../Theme/Constants";
import icons from "../../assets/icons";
import Colors from "../../Theme/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useRegister } from "../../Api/hooks";
import { t } from "i18next";

interface BottomSheetInterFace {
  isVisible: boolean;
  onClose(): any;
  onApply(data: any): any;
  onLogin(): any;
}

const BottomSheetSignup: FC<BottomSheetInterFace> = ({
  isVisible,
  onClose,
  onApply,
  onLogin,
}) => {
  const translateY = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const [name, setName] = useState("");
  const [namelast, setNamelast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isNameLastValid, setIsNameLastValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPhonedValid, setIsPhoneValid] = useState(true);
  const { data, register }: any = useRegister();

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

  const validateLogin = () => {
    if (
      validateEmail() &&
      password != "" &&
      name != "" &&
      namelast != ""
      //  &&
      // phone != ""
    ) {
      register(name, namelast, email, password);
    } else {
      if (!validateEmail()) {
        setIsEmailValid(false);
      }
      if (password.trim() == "") {
        setIsPasswordValid(false);
      }
      if (name.trim() == "") {
        setIsNameValid(false);
      }
      if (namelast.trim() == "") {
        setIsNameLastValid(false);
      }
      // if (phone.trim() == "") {
      //   setIsPhoneValid(false);
      // }
    }
  };

  useEffect(() => {
    if (email) {
      setIsEmailValid(true);
    }
    if (password) {
      setIsPasswordValid(true);
    }
    if (name) {
      setIsNameValid(true);
    }
    if (namelast) {
      setIsNameLastValid(true);
    }
    // if (phone) {
    //   setIsPhoneValid(true);
    // }
  }, [name, namelast, email, password, phone]);

  useEffect(() => {
    if (data) {
      onApply(data);
    }
  }, [data]);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <SafeAreaView style={{ flex: 1 }}>
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
              {t("signup")}
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
                  placeholder={`${t("firstName")}`}
                  placeholderTextColor={"grey"}
                  onChangeText={setName}
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    height: 50,
                    color: Colors.black,
                  }}
                ></TextInput>
                {!isNameValid && (
                  <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                    {t("enterFirstName")}
                  </Text>
                )}
                <TextInput
                  placeholder={`${t("lastName")}`}
                  placeholderTextColor={"grey"}
                  onChangeText={setNamelast}
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 16,
                    height: 50,
                    color: Colors.black,
                  }}
                ></TextInput>
                {!isNameLastValid && (
                  <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                    {t("enterLastName")}
                  </Text>
                )}
                <TextInput
                  placeholder={`${t("email")}`}
                  placeholderTextColor={"grey"}
                  onChangeText={setEmail}
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 16,
                    height: 50,
                    color: Colors.black,
                  }}
                ></TextInput>
                {!isEmailValid && (
                  <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                    {t("enterEmail")}
                  </Text>
                )}

                {/* <TextInput
                  placeholder={`${t("phone")}`}
                  placeholderTextColor={"grey"}
                  onChangeText={setPhone}
                  keyboardType={"phone-pad"}
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 16,
                    height: 50,
                    color: Colors.black,
                  }}
                ></TextInput>
                {!isPhonedValid && (
                  <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                    {t("enterPhone")}
                  </Text>
                )} */}

                <TextInput
                  placeholder={`${t("password")}`}
                  placeholderTextColor={"grey"}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  style={{
                    borderWidth: 0.5,
                    borderColor: "grey",
                    borderRadius: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    height: 50,
                    marginTop: 16,
                    color: Colors.black,
                  }}
                ></TextInput>
                {!isPasswordValid && (
                  <Text style={{ color: "red", fontSize: 12, left: 6 }}>
                    {t("enterPassword")}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => validateLogin()}
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
                    {t("signup")}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 16,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black,

                      marginTop: 8,
                      fontWeight: "400",
                    }}
                  >
                    {t("alreadyHaveAccount")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      onLogin();
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.primary,
                        marginLeft: 6,
                        marginTop: 8,
                        fontWeight: "500",
                        textDecorationLine: "underline",
                      }}
                    >
                      {t("loginHere")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BottomSheetSignup;
