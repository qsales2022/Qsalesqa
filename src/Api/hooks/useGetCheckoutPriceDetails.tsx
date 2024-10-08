/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { updateCount } from "../../redux/reducers/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetCheckoutPriceDetails = () => {
  const [priceDetails, setPriceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const getPriceDetails = async () => {
    console.log("========REACH======");
    dispatch(toggleLoader(true));
    try {
      const value = await AsyncStorage.getItem("checkoutId");
      if (value !== null) {
        const response = await graphqlClient.post("", {
          query: `query GetCheckoutPriceDetails($checkoutId: ID!) {
            node(id: $checkoutId) {
              ... on Checkout {
                totalPriceV2 {
                  amount
                  currencyCode
                }
                subtotalPriceV2 {
                  amount
                  currencyCode
                }
                totalTaxV2 {
                  amount
                  currencyCode
                }
                  shippingLine {
                  handle
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          `,
          variables: {
            checkoutId: value,
          },
        });

        const { data } = response;
        setPriceDetails(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    } catch (e) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { priceDetails, getPriceDetails };
};

export default useGetCheckoutPriceDetails;
