import React, { useEffect } from "react";
import "./src/assets/i18n/i18n";

import Navigation from "./src/Navigation";
import { store, persistor } from "./src/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Toast, { ToastConfig } from "react-native-toast-message";
import { Text, View, TouchableOpacity } from "react-native";
import { getHeight, getWidth } from "./src/Theme/Constants";
import Colors from "./src/Theme/Colors";
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import screens from "./src/Navigation/screens";




const App = ({navigation}:any) => {
  const toastConfig: ToastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          padding: 16,
          borderRadius: 8,
          marginHorizontal: 16,
          marginVertical: 8,
          elevation: 3,
          borderWidth: 5,
          borderColor: '#4CAF50'
        }}
        {...rest}
      >
        <Text style={{ color: Colors.black, fontWeight: "bold" }}>{text1}</Text>
      </TouchableOpacity>
    ),
    error: ({ text1, text2, ...rest }) => (
      <View style={{ backgroundColor: "red", padding: 16 }}>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    ),
    info: ({ text1, text2, ...rest }) => (
      <View style={{ backgroundColor: "blue", padding: 16 }}>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
      </View>
    ),
    warning: ({ text1, text2, ...rest }) => (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.appYellow,
          padding: 16,
          borderRadius: 8,
          marginHorizontal: 16,
          marginVertical: 8,
          elevation: 3,
          borderWidth: 5,
          borderColor: '#4CAF50'
        }}
        {...rest}
      >
        <Text style={{ color: Colors.black, fontWeight: "bold" }}>{text1}</Text>
      </TouchableOpacity>
    ),
  };
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
      <Toast config={toastConfig} />
    </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
