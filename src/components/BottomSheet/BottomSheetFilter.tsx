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

interface BottomSheetInterFace {
  isVisible: boolean;
  onClose(): any;
  onApply(): any;
}

const BottomSheetFilter: FC<BottomSheetInterFace> = ({
  isVisible,
  onClose,
  onApply,
}) => {
  const translateY = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [inStock, setInStock] = useState(true);
  const [outOfStock, setOutOfStock] = useState(true);
  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);
  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);

  const handleValuesChange = (values) => {
    //  console.log(JSON.stringify(values));

    setMinAmount(values[0]);
    setMaxAmount(values[1]);
  };

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
              Filters
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
          <Text style={{ padding: 16, color: "black" }}>Price</Text>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: Colors.accent,
                flex: 1,
                borderColor: Colors.primary,
                borderWidth: 0.5,
                borderRadius: 6,
                marginLeft: 16,
                marginRight: 6,
                padding: 6,
              }}
            >
              <Text>Min</Text>
              <TextInput
                inputMode={"numeric"}
                value={`${minAmount}`}
                editable={false}
                selectTextOnFocus={false}
                style={{ color: "black", fontWeight: "500" }}
              />
            </View>
            <View
              style={{
                backgroundColor: Colors.accent,
                flex: 1,
                borderColor: Colors.primary,
                borderWidth: 0.5,
                borderRadius: 6,
                marginLeft: 6,
                marginRight: 16,
                padding: 6,
              }}
            >
              <Text>Max</Text>
              <TextInput
                inputMode={"numeric"}
                value={`${maxAmount}`}
                editable={false}
                selectTextOnFocus={false}
                style={{ color: "black", fontWeight: "500" }}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 16,
              marginRight: 16,
              alignSelf: "center",
              marginTop: 6,
            }}
          >
            <MultiSlider
              values={[minAmount, maxAmount]}
              onValuesChange={handleValuesChange}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChangeFinish={sliderOneValuesChangeFinish}
              min={0}
              max={1000} // Adjust the max value according to your needs
              step={1}
              sliderLength={getWidth(1.2)} // Adjust the slider length
              allowOverlap={false}
              snapped
              minMarkerOverlapDistance={30}
              selectedStyle={{
                backgroundColor: Colors.black,
              }}
              unselectedStyle={{
                backgroundColor: "silver",
              }}
              trackStyle={{
                height: 4,
              }}
              customMarker={() => {
                return (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: Colors.black,
                      borderRadius: 10,
                    }}
                  ></View>
                );
              }}
            />
          </View>
          <Text style={{ color: "black", marginLeft: 16, marginTop: 24 }}>
            Availabliity
          </Text>
          <TouchableOpacity onPress={() => setInStock(!inStock)}>
            <View
              style={{ flexDirection: "row", marginLeft: 16, marginTop: 16 }}
            >
              {!inStock ? (
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
              <Text style={{ marginLeft: 6, color: "black" }}>In stock</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOutOfStock(!outOfStock)}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
                marginTop: 16,
                marginBottom: 24,
              }}
            >
              {!outOfStock ? (
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
                Out of stock
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
              onPress={() => onApply(minAmount, maxAmount, inStock, outOfStock)}
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

export default BottomSheetFilter;
