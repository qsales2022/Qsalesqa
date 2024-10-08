/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useAddToCart = () => {
  const [addCartData, setAddCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const addToCart = async (variantId: any, checkoutId: any, quantity: any) => {
      console.log(variantId,'this variantId');
      
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query: `mutation {
          checkoutLineItemsAdd(
            lineItems: [
              {
                variantId: "${variantId}"
                quantity: ${quantity}
              }
            ]
            checkoutId: "${checkoutId}"
          ) {
            checkout {
              id
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                  }
                }
              }
            }
            checkoutUserErrors {
              message
            }
          }
        }`,
      });

      const { data } = response;
      setAddCartData(data);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  const addToCartFrequentlyBought = async (
    checkoutId: any,
    lineItems: any,
    ymqOptions: any
  ) => {
    // dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query: `mutation {
          checkoutLineItemsAdd(
            lineItems: [${lineItems}]
            checkoutId: "${checkoutId}"
          ) {
            checkout {
              id
              lineItems(first: 5) {
                edges {
                  node {
                    title
                    quantity
                  }
                }
              }
            }
            checkoutUserErrors {
              message
            }
          }
        }`,
      });

      const { data } = response;
      console.log("addToCartFrequentlyBought: ", JSON.stringify(response));

      setAddCartData(data);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {}, []);

  return { addCartData, addToCart, addToCartFrequentlyBought };
};

export default useAddToCart;
