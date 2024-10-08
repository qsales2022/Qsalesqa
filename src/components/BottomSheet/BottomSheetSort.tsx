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
} from "react-native";
import { getHeight, getWidth } from "../../Theme/Constants";
import icons from "../../assets/icons";
import Colors from "../../Theme/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
export const enum sortType {
  ascending,
  discending,
  lowToHigh,
  highToLow,
}

interface BottomSheetInterFace {
  isVisible: boolean;
  onClose(): any;
  onApply(): any;
}

const BottomSheetSort: FC<BottomSheetInterFace> = ({
  isVisible,
  onClose,
  onApply,
}) => {
  const translateY = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const [selectedSort, setSort] = useState(sortType.ascending);

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
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingBottom: 8,
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
              Sort
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

          <TouchableOpacity onPress={() => setSort(sortType.ascending)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              {selectedSort != sortType.ascending ? (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.5,
                      height: 15,
                      width: 15,
                      backgroundColor: Colors.primary,
                      alignSelf: "center",
                    }}
                  />
                </View>
              )}
              <Text style={{ marginLeft: 6, color: "black" }}>
                {`Alphabetically (A-Z)`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort(sortType.discending)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              {selectedSort != sortType.discending ? (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.5,
                      height: 15,
                      width: 15,
                      backgroundColor: Colors.primary,
                      alignSelf: "center",
                    }}
                  />
                </View>
              )}
              <Text style={{ marginLeft: 6, color: "black" }}>
                {`Alphabetically (Z-A)`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort(sortType.lowToHigh)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              {selectedSort != sortType.lowToHigh ? (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.5,
                      height: 15,
                      width: 15,
                      backgroundColor: Colors.primary,
                      alignSelf: "center",
                    }}
                  />
                </View>
              )}
              <Text style={{ marginLeft: 6, color: "black" }}>
                {`Price (Low to high)`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSort(sortType.highToLow)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              {selectedSort != sortType.highToLow ? (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                  }}
                />
              ) : (
                <View
                  style={{
                    borderWidth: 0.5,
                    height: 20,
                    width: 20,
                    borderColor: Colors.primary,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0.5,
                      height: 15,
                      width: 15,
                      backgroundColor: Colors.primary,
                      alignSelf: "center",
                    }}
                  />
                </View>
              )}
              <Text style={{ marginLeft: 6, color: "black" }}>
                {`Price (High to low)`}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", margin: 16 }}>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                flex: 1,
                borderRadius: 8,
                borderWidth: 0.5,
                borderColor: Colors.primary,
                marginRight: 16,
              }}
            >
              <Text
                style={{
                  color: Colors.primary,
                  alignSelf: "center",
                  padding: 8,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onApply(selectedSort)}
              style={{
                flex: 1,
                borderRadius: 8,
                backgroundColor: Colors.primary,
                marginLeft: 16,
              }}
            >
              <Text style={{ color: "white", alignSelf: "center", padding: 8 }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BottomSheetSort;
