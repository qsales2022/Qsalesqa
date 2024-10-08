/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useGetRelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getRelatedProducts = async (id: any) => {
    dispatch(toggleLoader(true));
    try {
      const response = await graphqlClient.post("", {
        query: `query productRecommendations($productId: ID!) {
            productRecommendations(productId: $productId) {
              id
                    title
                    handle
                    vendor
                    availableForSale
                    images(first: 1) {
                      edges {
                        node {
                          id
                          url
                          width
                          height
                          altText
                        }
                      }
                    }
                    priceRange { # Returns range of prices for a product in the shop's currency.
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                    }
            }
          }`,
        variables: {
          productId: id,
        },
      });

      const { data } = response;
      setRelatedProducts(data?.productRecommendations);
      setLoading(false);
      dispatch(toggleLoader(false));
    } catch (error: any) {
      setError(error);
      setLoading(false);
      dispatch(toggleLoader(false));
    }
  };

  return { relatedProducts, getRelatedProducts };
};

export default useGetRelatedProducts;
