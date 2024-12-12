/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { updateCount } from "../../redux/reducers/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useUpdateQuantity = () => {
  const [updateQuantityData, setUpdateQuantityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const updateQuantity = async (lineItemId: any, quantity: any) => {
    dispatch(toggleLoader(true));
    try {
      const value = await AsyncStorage.getItem("checkoutId");
      if (value !== null) {
        const response = await graphqlClient.post("", {
          query: `mutation {
            cartLinesUpdate(
              cartId: "${value}"
              lines: [
                {
                  id: "${lineItemId}"
                  quantity: ${quantity}
                }
              ]
            ) {
              cart {
                id
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          title
                        }
                      }
                    }
                  }
                }
              }
              userErrors {
                message
              }
            }
          }`
        });
        

        const { data } = response;
        console.log(response,'this is response');
        
        setUpdateQuantityData(data);
        setLoading(false);
        dispatch(toggleLoader(false));
      }
    } catch (e) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { updateQuantityData, updateQuantity };
};

export default useUpdateQuantity;
