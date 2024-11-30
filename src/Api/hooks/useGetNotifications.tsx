/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import axios from "axios";

const useGetNotifications = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchNotifications = async (
    token: any
  ) => {
    dispatch(toggleLoader(true));
    try {
        const response = await axios.create({
          baseURL:
            'https://qsales.hexwhale.com/api',
          headers: {
            'Content-Type': 'application/json'
          },
        }).get("notifications")
        const { data } = response;
        console.log('NOTIFICATION', JSON.stringify(data));
        setData(data?.data);
        setLoading(false);
        dispatch(toggleLoader(false));
      
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { data, fetchNotifications };
};

export default useGetNotifications;
