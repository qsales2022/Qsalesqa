/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const register = async (
    firstName: any,
    lastName: any,
    email: any,
    password: any,
    phone: any
  ) => {
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query: `mutation customerCreate($input: CustomerCreateInput!) {
          customerCreate(input: $input) {
            customer {
              id
              firstName
              lastName
              email
            }
            customerUserErrors {
              message
            }
          }
        }          
        `,
        variables: {
          input: {
            acceptsMarketing: false,
            email: email,
            firstName: firstName,
            lastName: lastName,
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

  return { data, register };
};

export default useRegister;
