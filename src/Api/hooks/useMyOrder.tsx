/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";
import { RootState } from "../../redux/store";

const useMyOrder = () => {
  const { language = "EN" } = useSelector(
    (state: RootState) => state.AuthReducer
  );
  const [orderList, setOrderList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getMyOrder = async (token: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query:
          `query GetCustomerOrders($customerAccessToken: String!)
                  @inContext(language: ` +
          language.toUpperCase() +
          `) {
                    customer(customerAccessToken: $customerAccessToken) {
                      orders(first: 10) {
                        edges {
                          node {
                            id
                            name
                            orderNumber
                            fulfillmentStatus
                            financialStatus
                            statusUrl
                            totalPrice {
                              amount
                              currencyCode
                            }
                            processedAt
                            lineItems(first: 100) {
                              nodes {
                                title
                                quantity
                                variant {
                                  id
                                  image {
                                    url
                                  }
                                }
                                originalTotalPrice {
                                  amount
                                  currencyCode
                                }
                                discountedTotalPrice {
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
        `,
        variables: {
          customerAccessToken: token,
        },
      });
      console.log(response, "ORDER RESPONCE===");
      const { data } = response;
      if (data.customer) {
        setOrderList(data?.customer?.orders?.edges);
      }
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  useEffect(() => {}, []);

  return { orderList, getMyOrder,loading };
};

export default useMyOrder;
