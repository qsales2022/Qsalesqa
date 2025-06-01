/* eslint-disable no-catch-shadow */
// useGetBestSelling.js
import { useEffect, useState } from "react";
import graphqlClient from "../interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../redux/reducers/GlobalReducer";

const useSearch = () => {
  const [searchDetails, setSearchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const searchProduct = async (searchText: any) => {
    setLoading(true);
    try {
      const response = await graphqlClient.post("", {
        query: `
          query searchProducts($searchText: String!) {
            products(query: $searchText, first: 100) {
              edges {
                node {
                  id
                  title
                  handle
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
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                     collections(first: 5) {
                    edges {
                      node {
                        id
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          searchText: searchText
        },
      });
      const { data } = response;
      console.log('GraphQL Response Data:', JSON.stringify(data, null, 2));

      setSearchDetails(data?.products?.edges);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  return { searchDetails, searchProduct, loading };
};

export default useSearch;
