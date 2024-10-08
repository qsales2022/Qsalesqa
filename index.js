/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { initializeApp } from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import { Settings, AppEventsLogger } from "react-native-fbsdk-next";
import appsFlyer from "react-native-appsflyer";
import analytics, { settings } from "@react-native-firebase/analytics";
import { requestTrackingPermission } from "react-native-tracking-transparency";

// Somewhere in your app's initialization

// Initialize Facebook SDK
Settings.initializeSDK();

// Enable automatic logging of basic events
Settings.setAdvertiserTrackingEnabled(true);

// Enable advertiser ID collection
Settings.setAdvertiserIDCollectionEnabled(true);

// Set data processing options (leave empty for default)
Settings.setDataProcessingOptions([]);


// Activate app events
// AppEventsLogger.activateApp();

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);

  // You can handle the received data here or perform other background tasks
});

const credentials = {
  clientId: "101638395453166446996",
  appId: "1:470593170402:android:96b41edcb6cbd586c7a7bb",
  apiKey: "AIzaSyDPq8qBH0W9_NO46tF7dRxGiM6Pbz4L0H4",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "470593170402",
  projectId: "qsales-64924",
};

const config = {
  name: "qsales",
  apiKey: credentials.apiKey,
  authDomain: `${credentials.projectId}.firebaseapp.com`,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId,
  appId: credentials.appId,
  clientId: credentials.clientId,
};

initializeApp(credentials, config);
analytics();

appsFlyer.initSdk(
  {
    devKey: "h4cSuML76RqZRtnocj5mB8",
    isDebug: false,
    appId: "id6475626485",
    onInstallConversionDataListener: false, //Optional
    onDeepLinkListener: true, //Optional
    timeToWaitForATTUserAuthorization: 10, //for iOS 14.5
    manualStart: true, //Optional
  },
  (res) => {
    console.log(res);
  },
  (err) => {
    console.error(err);
  }
);
const option = {
  isDebug: true,
  devKey: "h4cSuML76RqZRtnocj5mB8",
  appId: "id6475626485",
  onInstallConversionDataListener: true,
  onDeepLinkListener: true,
  timeToWaitForATTUserAuthorization: 5,
  manualStart: true, // <--- for manual start.
};

appsFlyer.initSdk(
  option,
  () => {
    if (!option.manualStart) {
      console.warn("AppsFlyer SDK started!");
    } else {
      console.warn("AppsFlyer SDK init, didn't send launch yet");
    }
  },
  (err) => {
    // handle error
  }
);
//...
// app flow
//...

appsFlyer.startSdk(); // <--- Here we send launch
// const requestTrackingPermission = async () => {
//   console.log('function called one time');
//   const trackingStatus = await requestTrackingAuthorization();
//   console.log(trackingStatus,'trackingStatus');
//   if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
//     // Tracking authorized or unavailable (likely on Android)
//     console.log('enabled onece');
//     appsFlyer.setAppTrackingEnabled(true);
//   } else {
//     Alert.alert('Permission Denied', 'We need your permission to track your device ID.');
//   }
// };

// // Call this function when you want to request the tracking permission
// requestTrackingPermission();

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => App);

const requestTrackingPermissions = async () => {
  console.log("Requesting tracking permission...");
  try {
    const trackingStatus = await requestTrackingPermission();
    console.log("Tracking status:", trackingStatus);

    if (trackingStatus === "authorized" || trackingStatus === "unavailable") {
      console.log("Tracking enabled");
      appsFlyer.setAppTrackingEnabled(true);
      await settings.setAdvertiserTrackingEnabled(true);
    } else {
      console.log("Tracking not authorized");
    }
  } catch (error) {
    console.error("Error requesting tracking permission:", error);
  }
};

// Call the tracking permission function
requestTrackingPermissions()
  .then(() => {
    console.log("Tracking permission request completed");

    // Start AppsFlyer SDK after requesting permission
    appsFlyer.startSdk();
    console.log("AppsFlyer SDK started");
  })
  .catch((error) => {
    console.error("Error in app initialization:", error);
  });
