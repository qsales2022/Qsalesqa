/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetLogIn = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const user = async (
    token: any
  ) => {
    dispatch(toggleLoader(true));
    try {
        const response = await graphqlClient.post("", {
          query: `query {
            customer(customerAccessToken: "${token}") {
              id
              firstName
              lastName
              acceptsMarketing
              email
              phone
            }
          }                             
          `,
        });
        const { data } = response;
        console.log('GETLOGIN ', JSON.stringify(data));
        setData(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { data, user };
};

export default useGetLogIn;
