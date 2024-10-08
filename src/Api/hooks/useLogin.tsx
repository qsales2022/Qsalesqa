/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useLogin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const login = async (
    email: any,
    password: any
  ) => {
    dispatch(toggleLoader(true));
    try {
        const response = await graphqlClient.post("", {
          query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
               accessToken
              }
              customerUserErrors {
               message
              }
            }
          }                    
          `,
          variables: {
            input: {
              email: email,
              password: password,
            },
          },
        });
        const { data } = response;
        setData(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { data, login };
};

export default useLogin;
