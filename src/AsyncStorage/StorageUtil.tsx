import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLogin = async (value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem('login', JSON.stringify(value));
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getLogin = async () => {
  try {
    const value = await AsyncStorage.getItem('login');
    console.log(value, 'fcm token getting code storage');
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};
export const setReview = (review: string, bool: string) => {
  try {
    AsyncStorage.setItem(review, bool);
  } catch (error: any) {
    return null;
  }
};
export const getReview = async (data: string) => {
  try {
    const hasReviewed = await AsyncStorage.getItem(data);
    return hasReviewed;
  } catch (error) {
    return null;
  }
};
export const firstUser = async (user: string, status: string) => {
  try {
    await AsyncStorage.setItem(user, status);
  } catch (error) {
    return null;
  }
};
export const getFirstUser = async (user: string) => {
  try {
    const userStatus = await AsyncStorage.getItem(user);
    return userStatus;
  } catch (error) {
    return null;
  }
};
export const firstUserLaunch = async (user: string, status: string) => {
  try {
    await AsyncStorage.setItem(user, status);
  } catch (error) {
    return null;
  }
};
export const getFirstUserLaunch = async (user: string) => {
  try {
    const userStatus = await AsyncStorage.getItem(user);
    return userStatus;
  } catch (error) {
    return null;
  }
};


// export const getLogin = async () => {
//   try {
//     const value = await AsyncStorage.getItem('login');

//     console.log(value, 'fcm token getting code here');
//     if (value !== null) {
//       const parsedData = JSON.parse(value);
//       if (parsedData && parsedData.accessToken) {
//         return parsedData.accessToken;
//       }
//     }
//     return null; // Return null if no valid token found
//   } catch (error) {
//     console.error('Error getting data:', error);
//     return null;
//   }
// };
