/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { updateCount } from "../../redux/reducers/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { updateToken } from "../../redux/reducers/TokenReducer";
import { getLogin } from "../../AsyncStorage/StorageUtil";

const useToken = () => {
  const dispatch = useDispatch();
  const getToken = async () => {
    dispatch(toggleLoader(true));
    try {
      const value = await getLogin();
   
      if (value != null) {
        console.log(value,'fcm token getting code usetoken');
        const { accessToken } = value;
        // dispatch(updateToken(accessToken));
        dispatch(updateToken('test'));
        dispatch(toggleLoader(false));
      }else{
        // dispatch(updateToken(null));
        dispatch(updateToken('test 123'));
        dispatch(toggleLoader(false));
      }
    } catch (e) {
      dispatch(toggleLoader(false));
    }
  };

  return { getToken };
};

export default useToken;
