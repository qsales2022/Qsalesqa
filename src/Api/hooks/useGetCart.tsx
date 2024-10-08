/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { updateCount } from "../../redux/reducers/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useGetCart = () => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [cartDetails, setcartDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const dispatch = useDispatch();
  const getCartData = async () => {
    dispatch(toggleLoader(true));
    try {
      const value = await AsyncStorage.getItem("checkoutId");
      if (value !== null) {
        const response = await graphqlClient.post("", {
          query:
            `query GetCheckoutDetails($id: ID!) @inContext(language: ` +
            language.toUpperCase() +
            `) {
                  node(id: $id) {
                    ... on Checkout {
                      id
                      webUrl
                      totalPrice {
                        amount
                        currencyCode
                      }
                      lineItemsSubtotalPrice {
                        amount
                        currencyCode
                      }
                      lineItems(first: 100) {
                        edges {
                          node {
                            id
                            title
                            quantity
                            discountAllocations {
                              allocatedAmount {
                                amount
                                currencyCode
                              }
                            }
                            variant {
                              id
                              title
                              quantityAvailable
                              selectedOptions {
                                name
                                value
                              }
                              price {
                                amount
                                currencyCode
                              }
                              product {
                                id
                                handle
                                productType
                                description
                                onlineStoreUrl
                                handle
                                variants(first: 100) {
                                  edges {
                                    node {
                                      id
                                      title
                                      sku
                                      quantityAvailable
                                      selectedOptions {
                                        name
                                        value
                                      }
                                      image {
                                        url
                                      }
                                      price {
                                        amount
                                        currencyCode
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      availableShippingRates {
                        ready
                        shippingRates {
                          handle
                          title
                          price {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                  }
                }
          `,
          variables: {
            id: value,
          },
        });
        const { data } = response;
        console.log("CART_RES===", data?.node?.lineItems?.edges?.length);

        setcartDetails(data);
        dispatch(updateCount(data?.node?.lineItems?.edges?.length));
        // setLoading(false);
        dispatch(toggleLoader(false));
      }
    } catch (e) {
      setError(error);
      // setLoading(false);
      dispatch(toggleLoader(false));
    }finally{
      setLoading(false)
    }
  };

  return { cartDetails, getCartData,loading };
};

export default useGetCart;
